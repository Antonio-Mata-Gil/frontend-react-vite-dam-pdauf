import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersList from '../../components/UsersList';

// Mock del useCase
jest.mock('../../useCases/users.useCases', () => ({
  getUsersUseCases: jest.fn(),
  deleteUserUseCases: jest.fn(),
}));

import { getUsersUseCases, deleteUserUseCases } from '../../useCases/users.useCases';

describe('UsersList Component', () => {
  const mockCredentials = { token: 'test-token' };
  const mockUsers = [
    { id: 1, nombre: 'John Doe', email: 'john@example.com', creado_en: '2024-01-01' },
    { id: 2, nombre: 'Jane Doe', email: 'jane@example.com', creado_en: '2024-01-02' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getUsersUseCases.mockResolvedValue(mockUsers);
  });

  test('Must render the users list', async () => {
    render(<UsersList credentials={mockCredentials} />);

    await waitFor(() => {
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });
  });

  test('Must call getUsersUseCases on mount', async () => {
    render(<UsersList credentials={mockCredentials} />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalledWith(mockCredentials);
    });
  });

  test('Must fetch users again when credentials change', async () => {
    const { rerender } = render(<UsersList credentials={mockCredentials} />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalledTimes(1);
    });

    const newCredentials = { token: 'new-token' };
    rerender(<UsersList credentials={newCredentials} />);

    await waitFor(() => {
      expect(getUsersUseCases).toHaveBeenCalledWith(newCredentials);
    });
  });

  test('Must delete user when confirmed', async () => {
    const user = userEvent.setup();
    deleteUserUseCases.mockResolvedValue({});
    window.confirm = jest.fn(() => true);

    render(<UsersList credentials={mockCredentials} />);

    await waitFor(() => {
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i });
    if (deleteButtons.length > 0) {
      await user.click(deleteButtons[0]);

      await waitFor(() => {
        expect(deleteUserUseCases).toHaveBeenCalled();
      });
    }
  });

  test('Must not delete user when not confirmed', async () => {
    const user = userEvent.setup();
    window.confirm = jest.fn(() => false);

    render(<UsersList credentials={mockCredentials} />);

    await waitFor(() => {
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i });
    if (deleteButtons.length > 0) {
      await user.click(deleteButtons[0]);
      expect(deleteUserUseCases).not.toHaveBeenCalled();
    }
  });

  test('Must handle errors when fetching users', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    getUsersUseCases.mockRejectedValue(new Error('API Error'));

    render(<UsersList credentials={mockCredentials} />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al obtener los usuarios:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });
});
