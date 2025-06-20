import express from 'express'
import { createNewElement, deleteElement, getAllElements, updateElementProperties } from '../controllers/workspaceElementsController.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

// get all element
router.get('/get-all', authenticate, async (req, res) => {
    const { slug } = req.query
    const elements = await getAllElements(slug)
    if (elements) {
        res.status(200).json(elements)
    } else {
        res.status(500).json({ message: "Internal server error" })
    }
})

// create new element
router.put('/create-new', authenticate, async (req, res) => {
    const { workspaceId, elementType, properties } = req.body

    const newElement = await createNewElement(workspaceId, elementType, properties)
    if (newElement) {
        res.status(200).json(newElement)
    } else (
        res.status(500).json({ message: "internal server error" })
    )
})

// update element's properties
router.put('/upate-element-properties', authenticate, async (req, res) => {
    const { workspaceId, elementId, properties } = req.body
    const isUpdated = updateElementProperties(workspaceId, elementId, properties)
    if (isUpdated) {
        res.status(200).json({ message: 'updated successful' })
    } else {
        res.status(500).json({ message: 'something went wrong' })
    }
})

// delete elements
router.delete('/delete-element', authenticate, async (req, res) => {
    const { workspaceId, elementId } = req.query
    const isDeleted = await deleteElement(workspaceId, elementId)
    if (isDeleted) {
        res.status(200).json({ message: 'Element deleted Successfully', isDeleted })
    } else {
        res.status(500).json({ message: 'Something went wrong', isDeleted })
    }
})

export default router