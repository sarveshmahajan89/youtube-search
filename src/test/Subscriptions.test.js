import { render, screen } from '@testing-library/react';
import Subscription from '../components/Subscription';

test('renders Subscriptions component', () => {
    render(<Subscription />);
    const linkElement = screen.getByText(/Subscriptions/i);
    expect(linkElement).toBeInTheDocument();
});