import express from 'express'
import { createNewElement, getAllElements } from '../controllers/workspaceElementsController.js'

const router = express.Router()

router.get('/get-all', async (req, res) => {
    const { slug } = req.query
    const elements = await getAllElements(slug)
    if (elements) {
        res.status(200).json(elements)
    } else {
        res.status(500).json({ message: "Internal server error" })
    }
})

router.put('/create-new', async (req, res) => {
    const { workspaceId, elementType, properties } = req.body

    const newElement = await createNewElement(workspaceId, elementType, properties)
    if (newElement) {
        res.status(200).json(newElement)
    } else (
        res.status(500).json({ message: "internal server error" })
    )
})

export default router