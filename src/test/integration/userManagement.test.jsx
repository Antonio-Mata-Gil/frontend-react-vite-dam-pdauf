import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateUser from '../../components/CreateUser';
import UsersList from '../../components/UsersList';

// Mock del useCase
jest.mock('../../useCases/users.useCases', () => ({
  createUserUseCases: jest.fn(),
  getUsersUseCases: jest.fn(),
  deleteUserUseCases: jest.fn(),
}));

import { 
  createUserUseCases, 
  getUsersUseCases,
  deleteUserUseCases 
} from '../../useCases/users.useCases';

describe('User Management Integration - CreateUser & UsersList', () => {
  const mockCredentials = { 
    username: 'admin', 
    password: 'password123',
    role: 'administrador' 
  };

  const mockUsers = [
    { id: 1, nombre: 'John Doe', email: 'john@example.com', creado_en: '2024-01-01' },
    { id: 2, nombre: 'Jane Doe', email: 'jane@example.com', creado_en: '2024-01-02' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getUsersUseCases.mockResolvedValue(mockUsers);
    createUserUseCases.mockResolvedValue({ id: 3, nombre: 'New User' });
  });

  test('Integration: CreateUser form should validate before submission attempt', async () => {
    const user = userEvent.setup();
    render(<CreateUser credentials={mockCredentials} />);

    const submitButton = screen.getByRole('button', { name: /crear usuario/i });
    
    // Intentar enviar sin datos
    await user.click(submitButton);

    // No debe llamarse createUserUseCases
    expect(createUserUseCases).not.toHaveBeenCalled();
  });

  test('Integration: UsersList should fetch users with credentials from props', async () => {
    render(<UsersList credentials={mockCredentials} />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalledWith(mockCredentials);
    });
  });

  test('Integration: Both components should receive same credentials object', async () => {
    const { rerender } = render(<UsersList credentials={mockCredentials} />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalledWith(mockCredentials);
    });

    // Cambiar credenciales
    const newCredentials = { 
      username: 'newuser',
      password: 'newpass123',
      role: 'usuario'
    };

    rerender(<UsersList credentials={newCredentials} />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenLastCalledWith(newCredentials);
    });
  });

  test('Integration: Create and List flow consistency', async () => {
    const user = userEvent.setup();
    
    // Primero renderizar el listado
    render(<UsersList credentials={mockCredentials} />);

    // Verificar que se cargan usuarios
    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalled();
    });

    // Luego renderizar el formulario
    render(<CreateUser credentials={mockCredentials} />);

    // Completar formulario usando placeholders
    await user.type(screen.getByPlaceholderText(/nombre del usuario/i), 'New User');
    await user.type(screen.getByPlaceholderText(/email/i), 'newuser@example.com');
    await user.type(screen.getByPlaceholderText(/contraseña/i), 'password123');
    
    await user.click(screen.getByRole('button', { name: /crear usuario/i }));

    // Verificar que se intenta crear usuario
    await waitFor(() => {
      expect(createUserUseCases).toHaveBeenCalled();
    });
  });

  test('Integration: Error handling across components', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    getUsersUseCases.mockRejectedValueOnce(new Error('API Error'));

    render(<UsersList credentials={mockCredentials} />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al obtener los usuarios:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  test('Integration: Delete user should trigger refresh in UsersList', async () => {
    const user = userEvent.setup();
    deleteUserUseCases.mockResolvedValue({});
    window.confirm = jest.fn(() => true);
    window.alert = jest.fn();

    render(<UsersList credentials={mockCredentials} />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalled();
    });

    // Obtener botón de eliminar
    const deleteButtons = screen.queryAllByRole('button', { name: /eliminar/i });
    if (deleteButtons.length > 0) {
      await user.click(deleteButtons[0]);

      await waitFor(() => {
        // Debe llamarse de nuevo para refrescar
        expect(getUsersUseCases).toHaveBeenCalledTimes(2);
      });
    }
  });

  test('Integration: Components should use consistent role validation', async () => {
    const credentialsWithRole = {
      username: 'admin',
      password: 'pass123',
      role: 'administrador',
    };

    render(<UsersList credentials={credentialsWithRole} />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'administrador',
        })
      );
    });
  });

  test('Integration: Form submission should use service with credentials', async () => {
    const user = userEvent.setup();
    render(<CreateUser credentials={mockCredentials} />);

    await user.type(screen.getByPlaceholderText(/nombre del usuario/i), 'Test User');
    await user.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    await user.type(screen.getByPlaceholderText(/contraseña/i), 'password123');

    await user.click(screen.getByRole('button', { name: /crear usuario/i }));

    await waitFor(() => {
      expect(createUserUseCases).toHaveBeenCalledWith(
        expect.any(Object),
        mockCredentials
      );
    });
  });

  test('Integration: Multiple state changes should be handled correctly', async () => {
    const user = userEvent.setup();
    
    const { rerender } = render(<UsersList credentials={mockCredentials} />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalledTimes(1);
    });

    // Cambiar credenciales
    const newCredentials = { ...mockCredentials, username: 'newadmin' };
    rerender(<UsersList credentials={newCredentials} />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalledTimes(2);
    });
  });
});
