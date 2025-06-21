import express from 'express'
import 'dotenv/config'
const app = express()

export const setAuthCookie = (res, token) => {
    const isProduction = process.env.NODE_ENV === 'production'
    if (!token) {
        return res.status(400).json({ message: "Internal server error" });
    }
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000 * 15);
    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: isProduction, // Set true for production
        sameSite: isProduction ? 'none' : 'lax',
        domain: isProduction ? ".drawwify.in" : undefined,
        expires: tokenExpiry
    });
}
