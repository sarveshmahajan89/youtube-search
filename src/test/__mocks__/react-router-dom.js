const reactRouterDom = jest.requireActual('react-router-dom');

module.exports = {
    ...reactRouterDom,
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Route: ({ children }) => <div>{children}</div>,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    useParams: () => jest.fn(),
    useHistory: () => jest.fn()
};