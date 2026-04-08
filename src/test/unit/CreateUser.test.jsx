import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateUser from '../../components/CreateUser';

// Mock del useCase
jest.mock('../../useCases/users.useCases', () => ({
  createUserUseCases: jest.fn(),
}));

import { createUserUseCases } from '../../useCases/users.useCases';

describe('CreateUser Component', () => {
  const mockCredentials = { token: 'test-token' };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.alert para evitar errores en tests
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Must render the form correctly', () => {
    render(<CreateUser credentials={mockCredentials} />);

    expect(screen.getByPlaceholderText(/nombre del usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear usuario/i })).toBeInTheDocument();
  });

  test('Must have input fields for user data', async () => {
    render(<CreateUser credentials={mockCredentials} />);

    const nameInput = screen.getByPlaceholderText(/nombre del usuario/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);

    expect(nameInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('Must submit the form when all fields are valid', async () => {
    const user = userEvent.setup();
    createUserUseCases.mockResolvedValue({ id: 1, nombre: 'John Doe' });

    render(<CreateUser credentials={mockCredentials} />);

    const nameInput = screen.getByPlaceholderText(/nombre del usuario/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /crear usuario/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(createUserUseCases).toHaveBeenCalled();
    });
  });

  test('Must pass correct data to createUserUseCases', async () => {
    const user = userEvent.setup();
    createUserUseCases.mockResolvedValue({ id: 1 });

    render(<CreateUser credentials={mockCredentials} />);

    await user.type(screen.getByPlaceholderText(/nombre del usuario/i), 'Test User');
    await user.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    await user.type(screen.getByPlaceholderText(/contraseña/i), 'password123');
    
    await user.click(screen.getByRole('button', { name: /crear usuario/i }));

    await waitFor(() => {
      expect(createUserUseCases).toHaveBeenCalledWith(
        expect.objectContaining({
          nombre: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        }),
        mockCredentials
      );
    });
  });
});
