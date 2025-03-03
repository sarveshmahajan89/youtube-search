// import { render, screen } from '@testing-library/react';
// import App from '../components/App';
// import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
//
// jest.mock('react-router-dom', () => ({
//     BrowserRouter: ({ children }) => <div>{children}</div>,
//     Route: ({ children }) => <div>{children}</div>,
//     Link: ({ children, to }) => <a href={to}>{children}</a>,
//     useParams: () => jest.fn(),
//     useHistory: () => jest.fn()
// }));
// jest.mock('../context/ApplicationContext', () => ({
//     useAppContext: jest.fn(),
// }));
// const mockedUseAppContext = require('../context/ApplicationContext').useAppContext;
//
//
// test('renders App component with index route', () => {
//     window.history.pushState({}, '', '/');
//     mockedUseAppContext.mockReturnValue({ isLoading: true });
//
//     render(
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     );
//     screen.debug();
//     // const headerElement = container.querySelector('header');
//     expect(headerElement).toBeInTheDocument();
// });