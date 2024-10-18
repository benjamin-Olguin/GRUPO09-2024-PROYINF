"use client";  // Marca el componente como Client Component

import React, { useState } from 'react';

const Header = ({ handleLogin }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [idInput, setIdInput] = useState('');

  const toggleLogin = () => {
    setIsLoginVisible(!isLoginVisible);
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
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
        </div>
      </div>

      {isLoginVisible && (
        <div className="mt-3 w-full flex justify-center">
          <input
            type="text"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            placeholder="ID de Administrador o Colaborador"
            className="my-3 p-3 w-[80%] max-w-[400px] border border-gray-300 rounded"
          />
          <button
            onClick={() => handleLogin(idInput)}
            className="my-3 ml-2 p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
