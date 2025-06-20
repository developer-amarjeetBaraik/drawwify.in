import React, { useEffect } from 'react'

const manageCursorIconOnCanvas = ({sidebarSelectedBtn}) => {
    // code to manage cursor icon on canvas
    useEffect(() => {
      const canvasDiv = document.getElementById('canvasHolderDiv')
      switch (sidebarSelectedBtn) {
        default:
          canvasDiv.style.cursor = 'var(--cursor-default-arrow-icon)'
          break;
        case "squareBtn":
        case "squareDraw":
          canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
          break;
        case "circleBtn":
        case "circleDraw":
          canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
          break;
        case "arrowBtn":
        case "arrowDraw":
          canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
          break;
        case "lineBtn":
        case "lineDraw":
          canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
          break;
        case "drawBtn":
        case "pencilDraw":
          canvasDiv.style.cursor = 'var(--cursor-draw-icon)'
          break;
        case "eraserSizeX":
          canvasDiv.style.cursor = 'var(--cursor-eraser-icon-size-X)'
          break;
        case "eraserSizeM":
          canvasDiv.style.cursor = 'var(--cursor-eraser-icon-size-M)'
          break;
        case "eraserSizeL":
          canvasDiv.style.cursor = 'var(--cursor-eraser-icon-size-L)'
          break;
        case "eraserSizeXL":
          canvasDiv.style.cursor = 'var(--cursor-eraser-icon-size-XL)'
          break;
        case "textBtn":
        case "textDraw":
          canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
          break;
      }
    }, [sidebarSelectedBtn])
}

export default manageCursorIconOnCanvas
