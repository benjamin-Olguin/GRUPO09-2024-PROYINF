import { useUser } from "../app/components/UserContext";
import Link from "next/link";

export default function Perfil() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
        <p className="text-gray-500">Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  const permisosPorRol = {//editar roles en base a los usados
    admin: ["Gestionar usuarios", "Publicar boletines", "Editar contenido"],
    colab: ["Publicar boletines", "Editar contenido"],
    user: ["Ver boletines", "Suscribirse a boletines"],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
      <div className="bg-gray-100 p-4 rounded shadow">
        <p>
          <span className="font-bold">Nombre de usuario:</span> {user.username}
        </p>
        <p>
          <span className="font-bold">Rol:</span> {user.role}
        </p>
        <p className="mt-4">
          <span className="font-bold">Privilegios:</span>
        </p>
        <ul className="list-disc list-inside">
          {permisosPorRol[user.role]?.map((permiso, index) => (
            <li key={index}>{permiso}</li>
          )) || <li>Sin privilegios asignados.</li>}
        </ul>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
}
