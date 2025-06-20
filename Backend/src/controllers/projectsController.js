import { v4 as uuid } from 'uuid';
import { WorkspaceModel } from "../models/workspaceModel.js";
import user from '../models/user.js';
import mongoose from 'mongoose';

export const checkProjectOwnership = async (projectId, user_id) => {
    try {
        const projectOwnership = await WorkspaceModel.findOne({ workSpaceId: projectId }, { createdBy: 1, _id: 0 })
        if (projectOwnership?.createdBy === user_id) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getAllProjects = async (user_id) => {
    try {
        const projects = await WorkspaceModel.find({ createdBy: user_id }, { workspaceName: 1, workSpaceId: 1, createdBy: 1, _id: 0 })
        return projects
    } catch (error) {
        console.log(error)
    }
}

export const createNewProject = async (user_id) => {
    // Start the session properly
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        // Create new workspace
        const newProject = new WorkspaceModel({
            workSpaceId: uuid(),
            createdBy: user_id,
            canEdit: [user_id],
        });

        // Save workspace
        await newProject.save({ session });

        console.log(user_id)

        // Find and update user
        const userDoc = await user.findOne({ user_id: user_id }).session(session);
        if (!userDoc) throw new Error("User not found");

        userDoc.projects.push(newProject.workSpaceId);
        await userDoc.save({ session });

        await session.commitTransaction();
        return newProject;
    } catch (error) {
        await session.abortTransaction();
        console.error("Transaction failed:", error);
    } finally {
        session.endSession();
    }
};

export const deleteProject = async (workSpaceId, createrId) => {
    let isDeleted = null
    // Start the session properly
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        // delete workspace
       const deletedItem = await WorkspaceModel.findOneAndDelete({ workSpaceId: workSpaceId }, { session })

        // Find and update user
        const updatedUser = await user.findOneAndUpdate({ user_id: createrId }, { $pull: { projects: workSpaceId } }, { projection: { _id: 0, projects: 1 }, new: true }).session(session);
        if (!updatedUser) throw new Error("User not found");
        
        if(deletedItem && updatedUser){
            isDeleted = true
        }else{
            isDeleted = false
        }
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        console.error("Transaction failed:", error);
        return isDeleted = false
    } finally {
        session.endSession();
    }
    return isDeleted
};
