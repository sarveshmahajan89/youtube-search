import { render, screen } from '@testing-library/react';
import Account from '../components/Account';

test('renders Account component', () => {
    render(<Account />);
    const linkElement = screen.getByText(/Account/i);
    expect(linkElement).toBeInTheDocument();
});