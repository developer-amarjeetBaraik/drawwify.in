import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
        index:true,
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
    },
    projects: {
        type: [String],
        require: true,
        default: []
    },
    authenticated_by: {
        type: String,
        require: true,
    },
    user_created_at: {
        type: Date,
        require: true,
        default: Date.now()
    }
})
const user = mongoose.model('user', userSchema)
export default user