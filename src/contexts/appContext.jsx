import React, { createContext, useState } from 'react'


const AppContext = createContext({})


const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );

}

export { AppContextProvider, AppContext}