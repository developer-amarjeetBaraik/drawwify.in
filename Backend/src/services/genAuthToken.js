import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const genAuthToken = async (userObj) => {
    // create token for new user
    const token = jwt.sign(
        {
            id: userObj.user_id,
            first_name: userObj.first_name ?? userObj.name,
            email: userObj.email,
            picture: userObj?.picture,
            projects: userObj.projects,
        },
        process.env.JWT_SECRET
    )
    return token

}