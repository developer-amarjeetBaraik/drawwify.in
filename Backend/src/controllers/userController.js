import userModel from "../models/user.js"
export const findUserById = async (userId) => {
    try {
        const user = await userModel.findOne({ user_id: userId })
        return user
    } catch (error) {
        console.log(error)
    }

}