// app/components/UserContext.js
'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

// Crea dos contextos: uno para el estado y otro para el dispatch
const UserStateContext = createContext();
const UserDispatchContext = createContext();

// Define un reducer para gestionar las acciones de usuario
const userReducer = (state, action) => {
  console.log("Disparando acción:", action);
  switch (action.type) {
    case 'LOGIN':
      // Guardar en localStorage al hacer login
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
      console.log(`Usuario autenticado: Rol: ${action.payload.role}`); // Imprime el rol en la consola
      return { ...state, user: action.payload };
    case 'LOGOUT':
      // Limpiar localStorage al hacer logout
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      return { ...state, user: null };
    default:
      throw new Error(`Acción desconocida: ${action.type}`);
  }
};

// Proveedor unificado
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  // Recuperar usuario del localStorage al montar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        dispatch({ type: 'LOGIN', payload: JSON.parse(savedUser) });
      }
    }
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

// Hooks personalizados
export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState debe usarse dentro de un UserProvider");
  }
  return context;
};

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch debe usarse dentro de un UserProvider");
  }
  return context;
};

// Hook combinado para facilitar el uso
export const useUser = () => {
  const state = useUserState();
  const dispatch = useUserDispatch();

  return {
    user: state.user,
    login: (userData) => dispatch({ type: 'LOGIN', payload: userData }),
    logout: () => dispatch({ type: 'LOGOUT' })
  };
};
