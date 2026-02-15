import { adaptUsers } from "../adapters/users.adapter";
import { createUserServices, deleteUserServices, getUsersServices } from "../services/users.services";

export const getUsersUseCases = async (credentials) => {
    const usersList = await getUsersServices(credentials);
    const usersAdapted = adaptUsers(usersList);
    return usersAdapted;
};

export const createUserUseCases = async (userData, credentials) => {
    const newUser = await createUserServices(userData, credentials);
    return newUser;
};

export const deleteUserUseCases = async (userId, credentials) => {
    const response = await deleteUserServices(userId, credentials);
    return response;
};  