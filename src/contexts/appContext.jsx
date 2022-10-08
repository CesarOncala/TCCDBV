import React, { createContext, useState } from 'react'


const AppContext = createContext({})


const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [login,setLogin] = useState()

    return (
        <AppContext.Provider value={{ user, setUser, login, setLogin }}>
            {children}
        </AppContext.Provider>
    );

}

export { AppContextProvider, AppContext}