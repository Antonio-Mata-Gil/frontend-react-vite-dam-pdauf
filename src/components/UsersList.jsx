import { useEffect, useState } from "react";
import {
  deleteUserUseCases,
  getUsersUseCases,
} from "../useCases/users.useCases";

function UsersList({ credentials }) {
  const [usersList, setUsersList] = useState([]);

  const getUsers = async () => {
    try {
      const users = await getUsersUseCases(credentials);
      setUsersList(users);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const isConfirmed = window.confirm(
        "¿Está seguro de que desea eliminar este usuario?"
      );
      if (!isConfirmed) return;
      await deleteUserUseCases(userId, credentials);
      getUsers();
      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar el usuario");
    }
  };

  const handleRefresh = () => {
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, [credentials]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex gap-4 items-center mb-6">
        <h2 className="text-2xl font-semibold">Listado de usuarios</h2>
        <button
          onClick={handleRefresh}
          className="py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-colors"
        >
          Actualizar listado
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Nombre
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Rol
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Estado
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Fecha de Creación
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {usersList && usersList.length > 0 ? (
              usersList.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.rol}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {user.active === 1 ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Activo
                      </span>
                    ) : (
                      <span className="bg-red-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Desactivo
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatDate(user.creacion)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="py-1 px-3 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer transition-colors text-sm font-medium"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No hay usuarios disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
