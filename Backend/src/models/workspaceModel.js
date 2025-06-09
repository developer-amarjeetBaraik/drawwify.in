import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'

const canvasElementsSchema = new mongoose.Schema({
    elementId: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true,
        enum: ['rectangle', 'circle', 'line', 'arrow', 'text', 'pencil']
    },
    properties: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { _id: false })

const workspaceSchema = new mongoose.Schema({
    workSpaceId: {
        type: String,
        require: true,
        unique: true,
        index: true
    },
    workspaceName: {
        type: String,
        default: 'Untitled workspace'
    },
    createdBy: {
        type: String,
        require: true,
    },
    canEdit: {
        type: [String],
        require: true,
    },
    elements: {
        type: [canvasElementsSchema],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const WorkspaceModel = mongoose.model('workspace', workspaceSchema)
export default workspaceSchema