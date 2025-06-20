import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { v4 as uuid } from 'uuid'
export const genAuthToken = async (userObj) => {
    const newUser_id = uuid()
    // create token for new user
    const token = jwt.sign(
        {
            id: (userObj.user_id) ? userObj.user_id : newUser_id,
            first_name: userObj.given_name ?? userObj.name,
            email: userObj.email,
            picture: userObj?.picture,
            projects: userObj.projects,
        },
        process.env.JWT_SECRET
    )
    return token

}