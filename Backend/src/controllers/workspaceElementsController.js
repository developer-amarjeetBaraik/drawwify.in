import { WorkspaceModel } from "../models/workspaceModel.js";
import { v4 as uuid } from 'uuid'

// get all elements in a workspace
export const getAllElements = async (workspaceId) => {
    try {
        const elements = await WorkspaceModel.findOne({ workSpaceId: workspaceId }, { elements: 1, _id: 0 })
        return elements
    } catch (error) {
        console.log(error)
        return false
    }
}

// create new element in workspace
export const createNewElement = async (workspaceId, elementType, properties) => {
    try {
        const newObj = { elementId: uuid(), type: elementType, properties }
        const newElement = await WorkspaceModel.updateOne({ workSpaceId: workspaceId }, { $push: { elements: newObj } })
        if (newElement.acknowledged) {
            return newObj
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// update element's properties
export const updateElementProperties = async (workspaceId, elementId, properties) => {
    try {
        const updateElement = await WorkspaceModel.updateOne({ workSpaceId: workspaceId, elements: { $elemMatch: { elementId: elementId } } }, { $set: { 'elements.$.properties': properties } })
        if (updateElement.acknowledged) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// delete element
export const deleteElement = async (workspaceId, elementId) => {
    try {
        const deleteElement = await WorkspaceModel.updateOne({ workSpaceId: workspaceId }, { $pull: { elements: { elementId: elementId } } })
        if (deleteElement.acknowledged && deleteElement.modifiedCount > 0) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}