import express from 'express'
import 'dotenv/config'
const app = express()

const setAuthCookie = (token) => app.use((req, res, next) => {
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000 * 15);
    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set true for production
        sameSite: 'none',
        domain: ".drawwify.in",
        expires: tokenExpiry
    });
    next()
})

export default setAuthCookie;