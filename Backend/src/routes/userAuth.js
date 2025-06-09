import express from 'express'
import axios from 'axios'
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import authenticate from '../middlewares/authenticate.js'
import user from '../models/user.js'

const router = express.Router()

router.get('/validate-me', authenticate, (req, res) => {
    res.status(200)
    res.send({ message: 'Authenticated', user: req.user })
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
        console.log(alreadyRagistered)

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

                // create token for new user
                const token = jwt.sign(
                    {
                        id: user_id,
                        first_name: userInfo.data.given_name,
                        last_name: userInfo.data.family_name,
                        email: userInfo.data.email,
                        picture: userInfo.data.picture,
                    },
                    process.env.JWT_SECRET
                )

                const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000 * 15);

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false, // Set true for production
                    sameSite: 'Lax',
                    expires: tokenExpiry
                });

                res.redirect(`${process.env.FRONTEND_URL}`);
            } catch (error) {
                console.log(error)
                res.status(500)
                res.send({ message: 'Internal server error' })
            }
        } else if (alreadyRagistered.email === userInfo.data.email) {
            // create jwt token for exsisting user
            const token = jwt.sign(
                {
                    id: alreadyRagistered.user_id,
                    first_name: userInfo.data.given_name,
                    last_name: userInfo.data.family_name,
                    email: userInfo.data.email,
                    picture: userInfo.data.picture,
                },
                process.env.JWT_SECRET
            )

            const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000 * 15);

            res.cookie('token', token, {
                httpOnly: true,
                secure: false, // Set true for production
                sameSite: 'Lax',
                expires: tokenExpiry

            })
            res.redirect(process.env.FRONTEND_URL)
        }



    } catch (error) {
        console.error('Google auth error:', error.message);
        res.status(500).send('Authentication failed');
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect(`${process.env.FRONTEND_URL}/`)
})

export default router