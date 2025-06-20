import React, { useEffect } from 'react'
import { useDrawElementsFunction } from '../customHooks/useDrawElementsFunctions'

const selectedElementIndicator = ({ topCanvasRef, sidebarSelectedBtn, selectedElements,drawSelectedElementIndicator }) => {
    //draw the selected element indicator with cursor
    useEffect(() => {
        const canvas = topCanvasRef.current
        const handleMouseOver = (event) => {
            drawSelectedElementIndicator(sidebarSelectedBtn, event.offsetX, event.offsetY)
        }
        if (sidebarSelectedBtn === 'squareBtn' || sidebarSelectedBtn === 'circleBtn') {
            canvas.addEventListener('mousemove', handleMouseOver)
        }
        return () => {
            canvas.removeEventListener('mousemove', handleMouseOver)
        }
    }, [sidebarSelectedBtn, selectedElements])
}

export default selectedElementIndicator
