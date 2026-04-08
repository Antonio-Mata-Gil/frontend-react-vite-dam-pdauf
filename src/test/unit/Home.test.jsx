import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';

// Mock de los componentes
jest.mock('../../components/insignia', () => {
  return function MockInsignia() {
    return <div data-testid="insignia">Mock Insignia</div>;
  };
});

jest.mock('../../components/UsersList', () => {
  return function MockUsersList() {
    return <div data-testid="users-list">Mock UsersList</div>;
  };
});

jest.mock('../../components/CreateUser', () => {
  return function MockCreateUser() {
    return <div data-testid="create-user">Mock CreateUser</div>;
  };
});

describe('Home Page Component', () => {
  test('Must render the Home page correctly', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { 
      name: /Proyecto del módulo de programación de aplicaciones utilizando frameworks/i 
    })).toBeInTheDocument();
  });

  test('Must display the credentials username and role', () => {
    render(<Home />);

    expect(screen.getByText(/Usuario: Antonio López/)).toBeInTheDocument();
    expect(screen.getByText(/Rol: administrador/)).toBeInTheDocument();
  });

  test('Must render Insignia component', () => {
    render(<Home />);

    expect(screen.getByTestId('insignia')).toBeInTheDocument();
  });

  test('Must render UsersList component', () => {
    render(<Home />);

    expect(screen.getByTestId('users-list')).toBeInTheDocument();
  });

  test('Must render CreateUser component', () => {
    render(<Home />);

    expect(screen.getByTestId('create-user')).toBeInTheDocument();
  });

  test('Must have correct initial credentials state', () => {
    render(<Home />);

    // Verificar que se muestran todos los datos de credenciales
    expect(screen.getByText(/Antonio López/)).toBeInTheDocument();
    expect(screen.getByText(/administrador/)).toBeInTheDocument();
  });

  test('Must render components in correct order', () => {
    render(<Home />);

    const heading = screen.getByRole('heading');
    const insignia = screen.getByTestId('insignia');
    const usersList = screen.getByTestId('users-list');
    const createUser = screen.getByTestId('create-user');

    // Verificar que existen todos los elementos
    expect(heading).toBeInTheDocument();
    expect(insignia).toBeInTheDocument();
    expect(usersList).toBeInTheDocument();
    expect(createUser).toBeInTheDocument();
  });

  test('Must apply correct styling classes', () => {
    const { container } = render(<Home />);

    const mainDiv = container.querySelector('.min-h-screen');
    expect(mainDiv).toBeInTheDocument();
    expect(mainDiv).toHaveClass('min-h-screen', 'w-[95%]', 'mx-auto', 'py-8', 'flex', 'flex-col');
  });

  test('Must display credential information correctly formatted', () => {
    render(<Home />);

    const credentialText = screen.getByText(/Usuario: Antonio López \| Rol: administrador/);
    expect(credentialText).toBeInTheDocument();
  });
});
