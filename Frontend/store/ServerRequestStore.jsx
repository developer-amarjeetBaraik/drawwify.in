import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const serverFunctionsContext = createContext({
    user: null,
})

const ServerRequestStore = ({ children }) => {
    const [user, setUser] = useState(null)

    return (
        <serverFunctionsContext.Provider value={user}>
            {children}
        </serverFunctionsContext.Provider>
    )
}

export default ServerRequestStore
