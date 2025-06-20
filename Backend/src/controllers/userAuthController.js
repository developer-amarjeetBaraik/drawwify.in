import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import user from '../models/user.js'

export const signupViaEmail = async (email, password) => {
    let isCreated = null
    try {
        if (email.length < 1 || password.length < 1) return
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new user({
            user_id: uuid(),
            name: email.split('@')[0],
            email: email,
            password: hashedPassword,
            authenticated_by: "manual/auth",
        })
        isCreated = await newUser.save()
    } catch (error) {
        console.log(error)
    }
    return isCreated
}

export const loginViaEmail = async (email, password) => {
    let isAuthenticUser
    try {
        if (email.length < 1 || password.length < 1) return
        const isUser = await user.findOne({ email: email })
        if (isUser) {
            const isMatched = bcrypt.compareSync(password, isUser.password)
            if (isMatched) {
                isAuthenticUser = isUser
            } else {
                isAuthenticUser = false
            }
        } else {
            isAuthenticUser = null
        }
    } catch (error) {
        console.log(error)
        isAuthenticUser = false
    }
    return isAuthenticUser
}