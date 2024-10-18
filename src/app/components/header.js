"use client";  // Marca el componente como Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importar useRouter para redireccionar

const Header = ({ handleLogin }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [idInput, setIdInput] = useState('');
  const router = useRouter();  // Instanciar el router

  const toggleLogin = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const handleRegisterRedirect = () => {
    router.push('/register');  // Redirigir a la página de registro
  };

  return (
    <header className="flex flex-col justify-between items-center bg-white bg-opacity-80 p-4">
      <div className="flex justify-between w-full items-center">
        <img
          src="https://www.fia.cl/wp-content/uploads/2021/11/logo_fia.svg"
          alt="Logo del Ministerio"
          className="max-w-[150px]"
        />
        <h1 className="flex-grow text-center text-4xl font-bold">VIGIFIA</h1>
        <div className="space-x-4">
          <button
            onClick={toggleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
          <button 
            onClick={handleRegisterRedirect}  // Redirigir al hacer clic en "Register"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
