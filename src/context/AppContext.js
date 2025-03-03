import React, {createContext, useMemo, useState} from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [videoList, setVideoList] = useState(null);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const contextValue= useMemo(
        () => ({
            videoList,
            setVideoList,
            query,
            setQuery,
            isLoading,
            setIsLoading
            }),
    [videoList, query, isLoading]
    );

    return (
        <AppContext.Provider value={ contextValue }>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };