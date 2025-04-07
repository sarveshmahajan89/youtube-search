import { render, screen } from '@testing-library/react';
import Shorts from '../components/Shorts';

test('renders Shorts component', () => {
    render(<Shorts />);
    const linkElement = screen.getByText(/Shorts/i);
    expect(linkElement).toBeInTheDocument();
});