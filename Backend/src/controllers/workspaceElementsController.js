import { WorkspaceModel } from "../models/workspaceModel.js";
import { v4 as uuid } from 'uuid'

export const getAllElements = async (workspaceId) => {
    try {
        const elements = await WorkspaceModel.findOne({ workSpaceId: workspaceId }, { elements: 1, _id: 0 })
        return elements
    } catch (error) {
        console.log(error)
        return false
    }
}

export const createNewElement = async (workspaceId, elementType, properties) => {
    try {
        const newObj = { elementId: uuid(), type: elementType, properties }
        const newElement = await WorkspaceModel.updateOne({ workSpaceId: workspaceId }, { $push: { elements: newObj } })
        if(newElement.acknowledged){
            return newObj
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}