import express from 'express'
import 'dotenv/config'
const app = express()

export const setAuthCookie = (token) => {
    return (req, res, next) => {
        if (!token) {
            return res.status(400).json({ message: "Internal server error" });
        }
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
    }
}