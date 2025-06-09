import mongoose from 'mongoose'
import workspaceSchema from './workspaceModel.js'

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true,
        unique: true
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
        type: [workspaceSchema.workSpaceId],
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