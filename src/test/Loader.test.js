import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../components/Loader';

// Mock the implementation of useAppContext
jest.mock('../context/ApplicationContext', () => ({
    useAppContext: jest.fn(),
}));

const mockedUseAppContext = require('../context/ApplicationContext').useAppContext;

describe('Loader Component', () => {
    it('should render loader when isLoading is true', () => {
        mockedUseAppContext.mockReturnValue({ isLoading: true });
        const { container } = render(<Loader />);
        expect(container.querySelector('.loader')).toBeInTheDocument();
    });

    it('should not render loader when isLoading is false', () => {
        mockedUseAppContext.mockReturnValue({ isLoading: false });
        const { container } = render(<Loader />);
        expect(container.querySelector('.loader')).not.toBeInTheDocument();
    });
});