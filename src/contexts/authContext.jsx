import React, { createContext, useState } from 'react'


const AuthContext = createContext({})


const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(!true);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );

}

export { AuthContextProvider, AuthContext}