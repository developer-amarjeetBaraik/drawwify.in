import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { fetchWrapper } from '../src/utils/fetchWrapper'

export const userAuthContext = createContext({
    user: null,
    isLoading: true,
    authenticated: false,
    login: () => { },
    logout: () => { },
})

const UserAuthStore = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    // validate user
    useEffect(() => {
        fetch('/api/auth/validate-me', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${authToken}`
            }
        })
            .then(res => {
                if (res.ok) {
                    setAuthenticated(true)
                }
                return res.json()
            })
            .then(res => {
                setIsLoading(false)
                setUser(res.user)
            })
            .catch((err) => console.log(err))
    }, [])

    // login
    const login = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    }

    // logout
    const logout = () => {
        fetch('/api/auth/logout', {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                setAuthenticated(false)
                setUser([])
            }
        })
            .catch((err) => console.log(err))
    }

    return (
        <userAuthContext.Provider value={{ user, authenticated, isLoading, login, logout }}>
            {children}
        </userAuthContext.Provider>
    )
}

export default UserAuthStore
