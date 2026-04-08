import { adaptUsers } from '../../adapters/users.adapter';

describe('users.adapter.js - adaptUsers', () => {
  test('Must adapt user data structure correctly', () => {
    const usersData = [
      {
        id: 1,
        nombre: 'John Doe',
        email: 'john@example.com',
        rol: 'administrador',
        activo: 1,
        fechaCreacion: '2024-01-01',
      },
    ];

    const result = adaptUsers(usersData);

    expect(result[0]).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      rol: 'administrador',
      active: 1,
      creacion: '2024-01-01',
    });
  });

  test('Must adapt multiple users', () => {
    const usersData = [
      {
        id: 1,
        nombre: 'John',
        email: 'john@example.com',
        rol: 'usuario',
        activo: 1,
        fechaCreacion: '2024-01-01',
      },
      {
        id: 2,
        nombre: 'Jane',
        email: 'jane@example.com',
        rol: 'usuario',
        activo: 0,
        fechaCreacion: '2024-01-02',
      },
    ];

    const result = adaptUsers(usersData);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('John');
    expect(result[1].name).toBe('Jane');
  });

  test('Must map nombre to name field', () => {
    const usersData = [
      {
        id: 1,
        nombre: 'Test User',
        email: 'test@example.com',
        rol: 'usuario',
        activo: 1,
        fechaCreacion: '2024-01-01',
      },
    ];

    const result = adaptUsers(usersData);

    expect(result[0].name).toBe('Test User');
    expect(result[0].nombre).toBeUndefined();
  });

  test('Must map activo to active field', () => {
    const usersData = [
      {
        id: 1,
        nombre: 'Test',
        email: 'test@example.com',
        rol: 'usuario',
        activo: 0,
        fechaCreacion: '2024-01-01',
      },
    ];

    const result = adaptUsers(usersData);

    expect(result[0].active).toBe(0);
    expect(result[0].activo).toBeUndefined();
  });

  test('Must map fechaCreacion to creacion field', () => {
    const usersData = [
      {
        id: 1,
        nombre: 'Test',
        email: 'test@example.com',
        rol: 'usuario',
        activo: 1,
        fechaCreacion: '2024-12-25',
      },
    ];

    const result = adaptUsers(usersData);

    expect(result[0].creacion).toBe('2024-12-25');
    expect(result[0].fechaCreacion).toBeUndefined();
  });

  test('Must return empty array for empty input', () => {
    const result = adaptUsers([]);

    expect(result).toEqual([]);
    expect(Array.isArray(result)).toBe(true);
  });

  test('Must preserve all required fields in adapted data', () => {
    const usersData = [
      {
        id: 99,
        nombre: 'Complex User',
        email: 'complex@example.com',
        rol: 'administrador',
        activo: 1,
        fechaCreacion: '2024-06-15',
      },
    ];

    const result = adaptUsers(usersData);
    const adaptedUser = result[0];

    expect(adaptedUser).toHaveProperty('id');
    expect(adaptedUser).toHaveProperty('name');
    expect(adaptedUser).toHaveProperty('email');
    expect(adaptedUser).toHaveProperty('rol');
    expect(adaptedUser).toHaveProperty('active');
    expect(adaptedUser).toHaveProperty('creacion');
  });
});
