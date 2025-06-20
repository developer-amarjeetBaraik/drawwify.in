import React, { useContext, useEffect } from 'react'
import { toast } from 'sonner'
import { workspaceElementServerContext } from '../../../store/WorkspaceElementServerStore'
import { drawCanvasContext } from '../../../store/CanvasDrowStore'

const deleteCanvasElementFns = (selectedElements) => {
    const { deleteElementOnServer } = useContext(workspaceElementServerContext)
    const { setSelectedElements } = useContext(drawCanvasContext)

    const deleteCanvasElement = (item, mouseX, mouseY) => {
        // deleting exsisting btns
        const btns = document.querySelectorAll('.elementDeleteBtn')
        btns.forEach(btn => {
            btn.remove()
        })
        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'elementDeleteBtn'
        deleteBtn.style.position = 'absolute'
        deleteBtn.style.top = `${mouseY}px`
        deleteBtn.style.left = `${mouseX}px`
        deleteBtn.style.width = '90px'
        deleteBtn.style.height = '20px'
        deleteBtn.innerText = 'Delete'
        deleteBtn.style.border = '1px solid white'
        deleteBtn.style.borderRadius = '5px'
        deleteBtn.style.backgroundColor = 'red'
        deleteBtn.style.display = 'flex'
        deleteBtn.style.justifyContent = 'center'
        deleteBtn.style.alignItems = 'center'
        deleteBtn.style.cursor = 'pointer'
        document.getElementById('root').appendChild(deleteBtn)

        const handleElementDeleteBtnClick = (event) => {
            event.stopPropagation()
            deleteElementOnServer(item, (res, error) => {
                if (res) {
                    deleteBtn.remove()
                    setSelectedElements([])
                } else if (error) {
                    deleteBtn.remove()
                    toast.error('Faild to delete', { description: error.message })
                }
            })
        }

        deleteBtn.addEventListener('click', handleElementDeleteBtnClick)
        document.addEventListener('click', () => {
            // deleting exsisting btns
            const btns = document.querySelectorAll('.elementDeleteBtn')
            btns.forEach(btn => {
                btn.remove()
            })
        })
    }
    return { deleteCanvasElement }
}

export default deleteCanvasElementFns
