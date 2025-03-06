import React, { createContext, useRef } from 'react'

export const drawCanvasContext = createContext({
  elements: [],
  mainCanvasRef: null,
  middleCanvasRef: null,
  topCanvasRef: null,
  drawOnDrawingCanvas: () => { },
  drawOnExecutionCanvas: () => { },
  drawSelectionArea: () => { }
})


const CanvasDrowStore = ({ children }) => {
  const elements = [{ type: "rectangle", x: 100, y: 100, width: 120, height: 80, color: "blue" }, { type: "circle", x: 600, y: 200, radius: 40, color: "red" }, { type: "text", x: 300, y: 150, text: "Hello Canvas!", font: "20px Arial", color: "yellow" }, { type: "arrow", startX: 400, startY: 200, endX: 500, endY: 300, color: "white", lineWidth: 3 }];

  const topCanvasRef = useRef(null)
  const middleCanvasRef = useRef(null)
  const mainCanvasRef = useRef(null)

  //code to draw on executino canvas besically draw a selected item
  const drawOnExecutionCanvas = () => {

  }

  //code to draw on drawing canvas
  const drawOnDrawingCanvas = () => {
    const ctx = middleCanvasRef.current.getContext('2d')
    console.log(elements)
    elements.forEach(item => {
      if (item.type === 'rectangle') {
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, item.width, item.height)
      }
      else if (item.type === 'circle') {
        ctx.arc(item.x, item.y, item.radius, 0, 2 * Math.PI)
        ctx.fillStyle = item.color;
        ctx.fill()
        ctx.stroke()
      }
      else if (item.type === 'text') {
        ctx.fillStyle = item.color;
        ctx.font = item.font;
        ctx.fillText(item.text, item.x, item.y)
      }
      else if(item.type === 'arrow'){
        ctx.beginPath()
        ctx.moveTo(item.startX, item.startY)
        ctx.lineTo(item.endX, item.endY)
        ctx.strokeStyle = item.color
        ctx.stroke()
      }
    })
  }

  //code to draw a selection area on canvas
  const drawSelectionArea = (startPointX, startPointY, newMouseX, newMouseY) => {
    const ctx = topCanvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, topCanvasRef.current.width, topCanvasRef.current.height)
    // ctx.globalAlpha = 0.5;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--select-area-fill-color');
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--select-area-border-color');
    ctx.lineWidth = 0.5;
    ctx.stroke()
    const rectWidth = newMouseX - startPointX
    const rectHeight = newMouseY - startPointY
    ctx.strokeRect(startPointX, startPointY, rectWidth, rectHeight);
    ctx.fillRect(startPointX, startPointY, rectWidth, rectHeight);
  }

  return (
    <>
      <drawCanvasContext.Provider value={{ elements, topCanvasRef, middleCanvasRef, mainCanvasRef, drawOnDrawingCanvas, drawOnExecutionCanvas, drawSelectionArea }}>
        {children}
      </drawCanvasContext.Provider>
    </>
  )
}

export default CanvasDrowStore
