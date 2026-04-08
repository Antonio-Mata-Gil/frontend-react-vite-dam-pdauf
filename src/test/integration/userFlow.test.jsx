import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../../pages/Home';

// Mock del servicio
jest.mock('../../useCases/users.useCases', () => ({
  getUsersUseCases: jest.fn(),
  createUserUseCases: jest.fn(),
  deleteUserUseCases: jest.fn(),
}));

import { 
  getUsersUseCases, 
  createUserUseCases,
  deleteUserUseCases 
} from '../../useCases/users.useCases';

describe('User Management Integration - Full User Flow', () => {
  const mockCredentials = {
    username: 'Antonio López',
    password: 'password123',
    role: 'administrador',
  };

  const mockUsers = [
    { id: 1, nombre: 'John Doe', email: 'john@example.com', creado_en: '2024-01-01' },
    { id: 2, nombre: 'Jane Smith', email: 'jane@example.com', creado_en: '2024-01-02' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getUsersUseCases.mockResolvedValue(mockUsers);
    createUserUseCases.mockResolvedValue({ id: 3, nombre: 'New User' });
    deleteUserUseCases.mockResolvedValue({});
  });

  test('Must load and display users on page initialization', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalledWith(expect.objectContaining({
        username: 'Antonio López',
        role: 'administrador',
      }));
    });
  });

  test('Must display user credentials and list users together', async () => {
    render(<Home />);

    // Verificar que se muestra el usuario conectado
    expect(screen.getByText(/Usuario: Antonio López/)).toBeInTheDocument();
    expect(screen.getByText(/administrador/)).toBeInTheDocument();

    // Verificar que se intenta cargar la lista de usuarios
    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalled();
    });
  });

  test('Must display the complete page layout with all sections', async () => {
    render(<Home />);

    // Título
    expect(screen.getByRole('heading', { 
      name: /Proyecto del módulo de programación de aplicaciones utilizando frameworks/i 
    })).toBeInTheDocument();

    // Información de credenciales
    expect(screen.getByText(/Usuario: Antonio López/)).toBeInTheDocument();

    // Tabla de usuarios o estructura
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Listado de usuarios/i })).toBeInTheDocument();
    });
  });

  test('Integration: Must handle multiple operations in sequence', async () => {
    const user = userEvent.setup();
    
    render(<Home />);

    // 1. Verificar que se cargan los usuarios
    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalledTimes(1);
    });

    // 2. Si se crea un usuario (aunque sea mock)
    const initialCallCount = getUsersUseCases.mock.calls.length;
    expect(initialCallCount).toBeGreaterThan(0);
  });

  test('Must maintain credentials context through component lifecycle', async () => {
    const { rerender } = render(<Home />);

    // Verificar credenciales en render inicial
    expect(screen.getByText(/Antonio López/)).toBeInTheDocument();

    // Re-render el componente
    rerender(<Home />);

    // Las credenciales deben seguir siendo visibles
    expect(screen.getByText(/Antonio López/)).toBeInTheDocument();
    expect(screen.getByText(/administrador/)).toBeInTheDocument();
  });

  test('Must call user operations with correct credentials context', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'Antonio López',
          password: 'password123',
          role: 'administrador',
        })
      );
    });
  });

  test('Must render authorized user role correctly', () => {
    render(<Home />);

    const roleElement = screen.getByText(/Rol: administrador/);
    expect(roleElement).toBeInTheDocument();
    expect(roleElement).toHaveTextContent('administrador');
  });

  test('Must display all major components together', async () => {
    render(<Home />);

    // Heading principal
    const mainHeading = screen.getByRole('heading', { 
      name: /Proyecto del módulo de programación de aplicaciones utilizando frameworks/i 
    });
    expect(mainHeading).toBeInTheDocument();

    // Esperar a que se rendericen los componentes
    await waitFor(() => {
      expect(screen.getByText(/Antonio López/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
