import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});

// Validar que el usuario tenga credenciales y rol autorizado
const validateUserCredentials = (credentials) => {
  if (!credentials) {
    throw new Error("Credenciales de usuario requeridas");
  }

  const { username, password, role } = credentials;

  if (!username || !password) {
    throw new Error("Usuario y contraseña son requeridos");
  }

  const allowedRoles = ["administrador", "usuario"];
  if (!allowedRoles.includes(role)) {
    throw new Error(`Rol no autorizado. Roles permitidos: ${allowedRoles.join(", ")}`);
  }

  return true;
};

// Crear headers con credenciales de usuario
const createAuthHeaders = (credentials) => {
  validateUserCredentials(credentials);
  
  const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
  
  return {
    "Authorization": `Basic ${encodedCredentials}`,
    "x-user-role": credentials.role,
  };
};

export const getUsersServices = async (credentials) => {
  try {
    const headers = createAuthHeaders(credentials);
    const response = await axiosInstance.get("/api/usuarios", { headers });
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    throw error;
  }
};

export const createUserServices = async (userData, credentials) => {
  try {
    const headers = createAuthHeaders(credentials);
    const response = await axiosInstance.post("/api/usuarios", userData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    throw error;
  }
};

export const deleteUserServices = async (userId, credentials) => {
  try {
    const headers = createAuthHeaders(credentials);
    const response = await axiosInstance.delete(`/api/usuarios/${userId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error.message);
    throw error;
  }
};