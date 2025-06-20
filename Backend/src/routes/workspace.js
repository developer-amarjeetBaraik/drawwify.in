import express from 'express'
import authenticate from '../middlewares/authenticate.js'
import { findUserById } from '../controllers/userController.js'
import { checkProjectOwnership, createNewProject, getAllProjects, deleteProject } from '../controllers/projectsController.js'

const router = express.Router()

router.post('/check-project-ownership', authenticate, async (req, res) => {
    const { projectId } = req.body
    const projectOwnership = await checkProjectOwnership(projectId, req.user.id)
    if (projectOwnership) {
        res.status(200).json({ projectOwnership })
    } else {
        res.status(401).json({ message: "Unauthorized" })
    }
})

router.get('/all-projects', authenticate, async (req, res) => {
    const projects = await getAllProjects(req.user.id)
    if (!projects) res.status(500).json({ message: 'Internal server error' })
    res.status(200).json(projects)
})

router.post('/create-project', authenticate, async (req, res) => {
    const newProject = await createNewProject(req.user.id)
    if (!newProject) {
        res.status(500).send({ message: 'Internal Server Error' })
    } else {
        const url = `/workspace/${newProject.workSpaceId}`
        res.status(200).send({ message: "Project Created sucessfully", path: url })
    }
})

router.delete('/delete-project', authenticate, async (req, res) => {
    const workSpaceId = req.query.workspaceId
    const createrId = req.query.createrId
    const deletedSuccess = await deleteProject(workSpaceId, createrId)
    if (deletedSuccess) {
        const updatedProjectList = await getAllProjects(createrId)
        res.status(200).json({isDeleted:true,updatedProjectList})
    } else {
        res.status(500).json({ message: 'Something went wrong' }) 
    }
})

export default router