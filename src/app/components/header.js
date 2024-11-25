'use client';

import { useUser } from './UserContext';
import Link from 'next/link';

const Header = () => {
  const { user, logout } = useUser();

  const handleLogout = () => {
    const confirmLogout = confirm('¿Estás seguro de que quieres cerrar sesión?');
    if (confirmLogout) {
      logout();
    }
  };
  
  return (
    <header className="flex flex-col justify-between items-center bg-white bg-opacity-80 p-4">
      <div className="flex justify-between w-full items-center">
        <img
          src="https://www.fia.cl/wp-content/uploads/2021/11/logo_fia.svg"
          alt="Logo del Ministerio"
          className="max-w-[150px]"
        />
        <Link href="/">
          <h1 className="flex-grow text-center text-4xl font-bold cursor-pointer">
            VIGIFIA
          </h1>
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-gray-800 font-bold">
                Rol: {user.role} - {user.username}
              </span>

              <Link href="/perfil">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Mi Perfil
                </button>
              </Link>

              {user.role === 'admin' && (
                <Link href="/usuarios">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Usuarios
                  </button>
                </Link>
              )}

              <Link href="/gestionarPDFs">
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Gestionar PDFs
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/gestionarPDFs">
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Gestionar PDFs
                </button>
              </Link>
              <Link href="/login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Iniciar Sesión
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Registrarse
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
