import express from 'express'
import axios from 'axios'
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import authenticate from '../middlewares/authenticate.js'
import user from '../models/user.js'
import { loginViaEmail, signupViaEmail } from '../controllers/userAuthController.js'
import { genAuthToken } from '../services/genAuthToken.js'
import setAuthCookie from '../middlewares/setAuthCookie.js'

const router = express.Router()

const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000 * 15);

router.get('/validate-me', authenticate, (req, res) => {
    res.status(200).send({ message: 'Authenticated', user: req.user })
})

router.get('/google', (req, res) => {
    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`
    res.redirect(redirectUrl)
})

router.get('/google/callback', async (req, res) => {
    const code = req.query.code

    try {
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code'
        })

        const { id_token, access_token } = data

        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` }
        })

        const alreadyRagistered = await user.findOne({ email: userInfo.data.email })

        if (alreadyRagistered === null) {

            try {

                // create new user
                const user_id = uuidv4()
                const newUser = new user({
                    user_id,
                    email: userInfo.data.email,
                    name: userInfo.data.given_name,
                    authenticated_by: 'google/auth'
                })

                // save new user in database
                await newUser.save()

                const token = await genAuthToken(userInfo.data)

                setAuthCookie(token)

                res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
            } catch (error) {
                console.log(error)
                res.status(500)
                res.send({ message: 'Internal server error' })
            }
        } else if (alreadyRagistered.email === userInfo.data.email) {

            const token = await genAuthToken({
                id: alreadyRagistered.user_id,
                first_name: userInfo.data.given_name,
                email: userInfo.data.email,
                picture: userInfo.data.picture,
            })

            setAuthCookie(token)
            res.redirect(`${process.env.FRONTEND_URL}/dashboard`)
        }



    } catch (error) {
        console.error('Google auth error:', error.message);
        res.status(500).send('Authentication failed');
    }
})

router.post('/signup-via-email', async (req, res) => {
    const { email, password } = req.body
    const isCreated = await signupViaEmail(email, password)

    if (isCreated) {
        const token = await genAuthToken(isCreated)
        res.status(200)
        setAuthCookie(token)
        res.json({ message: 'Signup Successfully', redirect: '/dashboard', user: { id: isCreated.user_id, email: isCreated.email, first_name: isCreated.name } })
    } else {
        res.status(401).json({ message: 'User already exsist or Someing went wrong' })
    }
})

router.post('/login-via-email', async (req, res) => {
    const { email, password } = req.body
    const isAuthenticUser = await loginViaEmail(email, password)
    if (isAuthenticUser) {
        const token = await genAuthToken(isAuthenticUser)
        res.status(200)
        setAuthCookie(token)
        res.json({ message: 'Login Successfully', redirect: '/dashboard', user: { id: isAuthenticUser.user_id, email: isAuthenticUser.email, first_name: isAuthenticUser.name } })
    } else if (isAuthenticUser === null) {
        res.status(404).json({ message: 'User not found. Signup first.' })
    } else {
        res.status(401).json({ message: "Incorrect password or email" })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set true for production
        sameSite: 'none',
        domain: ".drawwify.in",
    })
    res.redirect(`${process.env.FRONTEND_URL}/`)
})

export default router