'use client';

import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = (userData) => {
    setUser(userData);
    // Opcionalmente, puedes guardar el usuario en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };
  
  const logout = () => {
    setUser(null);
    // Limpiar localStorage al cerrar sesión
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  // Recuperar usuario del localStorage al montar el componente
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserState debe usarse dentro de un UserProvider");
  }
  return context;
};