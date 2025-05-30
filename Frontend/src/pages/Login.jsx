import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from '../components/Navbar'

const Login = () => {
    const { loginWithRedirect,logout, isAuthenticated } = useAuth0()
    return (
        <div>
            <Navbar />
            {isAuthenticated ? <>
                <h3>Logout from yourBoard</h3>
                <button onClick={()=> logout()}>Logout</button>
            </> : <>
                <h2>Login to yourBoard</h2>
                <button onClick={() => loginWithRedirect()}>Login</button>
            </>
            }
        </div>
    )
}

export default Login
