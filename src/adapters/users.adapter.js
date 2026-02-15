export const adaptUsers = (usersData) => {
    const adaptedUsers = usersData.map(user => ({
        id: user.id,
        name: user.nombre,
        email: user.email,
        rol: user.rol,
        active: user.activo,
        creacion: user.fechaCreacion
    }));
    return adaptedUsers;
}