import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import Pencil from '../src/components/canvas toolbar supportive elements/toolbar supporter tools/Pencil';
import { toolbarComponentsValueContext } from './CanvasToolbarStore';

export const drawCanvasContext = createContext({
  elements: [],
  mainCanvasRef: null,
  middleCanvasRef: null,
  topCanvasRef: null,
  drawExistingElementsOnDrawingCanvas: () => { },
  drawOnExecutionCanvas: () => { },
  drawSelectionArea: () => { },
  drawSelectedElementIndicator: () => { },
  drawNewItemOnCanvas: () => { },
  addItemOnCanvas: () => { },
})


const CanvasDrowStore = ({ children }) => {

  //function ref to use inside and outside of useEffect hook
  const drawNewItemOnCanvasRef = useRef(() => { })
  const [drawNewItemOnCanvas, setDrawNewItemOnCanvas] = useState(() => () => { })

  const { currColor, currFontSize, currLineType, currFontStyle, currArrowHead, currDashLine, currEraserPointerSize, currPencilPointerSize } = useContext(toolbarComponentsValueContext)

  useEffect(()=>{
    console.log(`this is from testing ${currColor}`)
  },[currColor])

  const elements = [{ type: "rectangle", x: 100, y: 100, width: 120, height: 80, color: "blue" }, { type: "circle", x: 600, y: 200, radius: 40, color: "red" }, { type: "text", x: 300, y: 150, text: "Hello Canvas!", font: "20px Arial", color: "yellow" }, { type: "arrow", startX: 400, startY: 200, endX: 500, endY: 300, color: "white", lineWidth: 3 }];

  const topCanvasRef = useRef(null)
  const middleCanvasRef = useRef(null)
  const mainCanvasRef = useRef(null)

  //code to draw on executino canvas besically draw a selected item
  const drawOnExecutionCanvas = () => {

  }

  //code to draw existing elements on drawing canvas
  const drawExistingElementsOnDrawingCanvas = () => {
    const ctx = middleCanvasRef.current.getContext('2d')
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
      else if (item.type === 'arrow') {
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

  //code to draw selected element indicator with cursor
  const drawSelectedElementIndicator = (selectedBtn, mouseX, mouseY) => {
    const canvas = topCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (selectedBtn === 'squareBtn') {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'gray';
      ctx.beginPath()
      ctx.roundRect(mouseX, mouseY, 200, 100, 10)
      ctx.stroke()
    } else if (selectedBtn === 'circleBtn') {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath()
      ctx.strokeStyle = 'gray'
      ctx.arc(mouseX + 35, mouseY + 35, 40, 0, 2 * Math.PI)
      ctx.stroke()
    }
  }

  //function wraped in useEffect to access the latest state from toolbar 

  useEffect(() => {
    //add text on canvas
    const addTextOnCanvas = (startX, startY, event) => {
      console.log(event.target.innerHTML)
      const canvas = topCanvasRef.current;
      const ctx = canvas.getContext('2d')
      let font = event.target.innerHTML
      ctx.fillStyle = 'white'
      ctx.font = "20px Arial"
      ctx.fillText(font, startX, startY)
    }

    console.log(`this is from inside of fn ${currColor}`)
    //draw new item on canvas
    drawNewItemOnCanvasRef.current = (selectedItem, startX, startY, endX, endY, prevPencilX, prevPencilY, screenX, screenY) => {
      const canvas = topCanvasRef.current
      const ctx = canvas.getContext('2d')
      if (selectedItem === 'squareDraw') {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = currColor;
        const width = endX - startX
        const height = endY - startY
        ctx.beginPath()
        ctx.fillRect(startX, startY, width, height, 10)
        ctx.stroke()
      } else if (selectedItem === 'circleDraw') {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        ctx.strokeStyle = currColor
        let centerX = (startX + endX) / 2
        let centerY = (startY + endY) / 2
        let radius = Math.sqrt(Math.pow(startX - centerX, 2) + Math.pow(startY - centerY, 2))
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        ctx.stroke()
      } else if (selectedItem === 'arrowDraw') {
        const arrowSize = 10;
        const angle = Math.atan2(endY - startY, endX - startX);

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        ctx.strokeStyle = 'gray'
        ctx.moveTo(startX, startY);  // Move to starting point
        ctx.lineTo(endX, endY);      // Draw line to this point
        ctx.stroke()

        // Calculate arrowhead points (rotated ±30 degrees)
        const arrowX1 = endX - arrowSize * Math.cos(angle - Math.PI / 6);
        const arrowY1 = endY - arrowSize * Math.sin(angle - Math.PI / 6);
        const arrowX2 = endX - arrowSize * Math.cos(angle + Math.PI / 6);
        const arrowY2 = endY - arrowSize * Math.sin(angle + Math.PI / 6);

        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(arrowX1, arrowY1);
        ctx.moveTo(endX, endY);
        ctx.lineTo(arrowX2, arrowY2);
        ctx.stroke();
      } else if (selectedItem === 'lineDraw') {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        ctx.strokeStyle = 'gray'
        ctx.moveTo(startX, startY);  // Move to starting point
        ctx.lineTo(endX, endY);      // Draw line to this point
        ctx.stroke()
      } else if (selectedItem === 'pencilDraw') {
        ctx.lineWidth = 3;
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'white'
        ctx.beginPath()
        // ctx.arc(endX, endY, pencilSize, 0, 2 * Math.PI)
        ctx.moveTo(prevPencilX, prevPencilY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
        ctx.fill()
      } else if (selectedItem === 'textDraw') {
        console.log("text")
        console.log(`screenX: ${screenX} screenY: ${screenY}`)
        console.log(`startX: ${startX} startY: ${startY}`)
        const newP = document.createElement('p')
        newP.contentEditable = true
        newP.autofocus = true
        newP.className = 'textField'
        newP.style.padding = '0px 3px'
        newP.style.minHeight = 'auto'
        newP.style.minWidth = '100px'
        newP.style.maxWidth = '200px'
        newP.style.backgroundColor = 'tranceparent'
        newP.style.color = 'white'
        newP.style.position = 'absolute'
        newP.style.top = `${startY}px`
        newP.style.left = `${startX}px`
        newP.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            addTextOnCanvas(startX, startY, event)
            newP.remove()
          }
        })
        document.getElementById('root').appendChild(newP)
      }
    }
    setDrawNewItemOnCanvas(() => drawNewItemOnCanvasRef.current)
  }, [currColor])



  //code to add item on canvas
  const addItemOnCanvas = (selectedBtn, mouseX, mouseY, endX, endY) => {

  }

  return (
    <>
      <drawCanvasContext.Provider value={{ elements, topCanvasRef, middleCanvasRef, mainCanvasRef, drawExistingElementsOnDrawingCanvas, drawOnExecutionCanvas, drawSelectionArea, drawSelectedElementIndicator, drawNewItemOnCanvas, addItemOnCanvas }}>
        {children}
      </drawCanvasContext.Provider>
    </>
  )

}

export default CanvasDrowStore
