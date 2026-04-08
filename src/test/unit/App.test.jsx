import { render, screen } from '@testing-library/react';
import App from '../../App';

// Mock de los componentes
jest.mock('../../components/CreateUser', () => {
  return function MockCreateUser() {
    return <div>Mock CreateUser Component</div>;
  };
});

jest.mock('../../components/UsersList', () => {
  return function MockUsersList() {
    return <div>Mock UsersList Component</div>;
  };
});

jest.mock('../../components/insignia', () => {
  return function MockInsignia() {
    return <div>Mock Insignia Component</div>;
  };
});

describe('App Component', () => {
  test('Must render the main App component', () => {
    render(<App />);

    expect(screen.getByText(/Mock CreateUser Component/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock UsersList Component/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Insignia Component/i)).toBeInTheDocument();
  });
});
