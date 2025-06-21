import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { fetchWrapper } from '../src/utils/fetchWrapper'

export const userAuthContext = createContext({
    user: null,
    isLoading: true,
    authenticated: null,
    loginViaGoogle: () => { },
    signupViaEmail: () => { },
    loginViaEmail: () => { },
    logout: () => { },
})

const UserAuthStore = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState()

    // validate user
    useEffect(() => {
        fetch('/api/auth/validate-me', {
            method: 'GET',
            credentials:'include',
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${authToken}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setAuthenticated(prev => true)
                }
                return res.json()
            })
            .then(res => {
                setIsLoading(false)
                console.log(res)
                setUser(res.user)
            })
            .catch((err) => console.log(err))
    }, [])

    // login via Google
    const loginViaGoogle = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_GOOGLE_AUTH_ENDPOINT}`;
    }

    const signupViaEmail = async (email, password, callback) => {
        try {
            let res = await fetch('/api/auth/signup-via-email', {
                method: 'POST',
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            })
            if (res.status === 200) {
                res = await res.json()
                console.log(res)
                setAuthenticated(true)
                setUser(res.user)
                callback(res, null, null)
            } else if (res.status === 401) {
                res = await res.json()
                callback(null, res, null)
            }
        } catch (error) {
            callback(null, null, error)
            console.log(error)
        }
    }

    // login via email (manual login)
    const loginViaEmail = async (email, password, callback) => {
        try {
            let res = await fetch('/api/auth/login-via-email', {
                method: 'POST',
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            })
            if(res.status === 200){
                res = await res.json()
                console.log(res.user)
                setAuthenticated(true)
                setUser(res.user)
                callback(res, null, null)
            }else if(res.status === 404){
                res = await res.json()
                callback(null, res, null)
            }else if (res.status === 401){
                res = await res.json()
                callback(null, null, res)
            }
        } catch (error) {
            console.log(error)
            callback(null, null, error)
        }
    }

    // logout
    const logout = () => {
        fetch('/api/auth/logout', {
            method: 'GET',
            credentials:"include",
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
        <userAuthContext.Provider value={{ user, authenticated, isLoading, loginViaGoogle, signupViaEmail, loginViaEmail, logout }}>
            {children}
        </userAuthContext.Provider>
    )
}

export default UserAuthStore
