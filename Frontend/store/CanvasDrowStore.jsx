import React, { createContext, use, useContext, useEffect, useRef, useState } from 'react'
import Pencil from '../src/components/canvas toolbar supportive elements/toolbar supporter tools/Pencil';
import { toolbarComponentsValueContext } from './CanvasToolbarStore';

export const drawCanvasContext = createContext({
  elements: [],
  selectedElements: [],
  mainCanvasRef: null,
  middleCanvasRef: null,
  topCanvasRef: null,
  drawExistingElementsOnDrawingCanvas: () => { },
  drawSelectionArea: () => { },
  drawSelectedElementIndicator: () => { },
  drawSelectedElementsWhenIndicatorsReRendering: () => { },
  drawNewItemOnCanvas: () => { },
  addItemOnCanvas: () => { },
  addSelectedElementsInElementsArray: () => { },
})


const CanvasDrowStore = ({ children }) => {

  const topCanvasRef = useRef(null)
  const middleCanvasRef = useRef(null)
  const mainCanvasRef = useRef(null)


  // Section-1 storing the state of all elements present on canvas

  //elements to draw on middle canvas
  const [elements, setElements] = useState([])
  const [selectedElements, setSelectedElements] = useState([])


  // Section-2 maneging the states of toolbar values

  const { currPastelColor, currBoldColor, currOutlineColor, currFontSize, currLineType, currFontStyle, currArrowHead, currDashLine, currEraserPointerSize, currPencilPointerSize } = useContext(toolbarComponentsValueContext)

  //storing the state into refs so that it's latest state can be used inside the function
  const currPastelColorRef = useRef(currPastelColor)
  const currBoldColorRef = useRef(currBoldColor)
  const currOutlineColorRef = useRef(currOutlineColor)
  const currFontSizeRef = useRef(currFontSize)
  const currLineTypeRef = useRef(currLineType)
  const currFontStyleRef = useRef(currFontStyle)
  const currArrowHeadRef = useRef(currArrowHead)
  const currDashLineRef = useRef(currDashLine)
  const currEraserPointerSizeRef = useRef(currEraserPointerSize)
  const currPencilPointerSizeRef = useRef(currPencilPointerSize)

  //updateing the state on change into refs so that it's latest state can be used inside the function
  useEffect(() => {
    currPastelColorRef.current = currPastelColor
    currBoldColorRef.current = currBoldColor
    currOutlineColorRef.current = currOutlineColor
    currFontSizeRef.current = currFontSize
    currLineTypeRef.current = currLineType
    currFontStyleRef.current = currFontStyle
    currArrowHeadRef.current = currArrowHead
    currDashLineRef.current = currDashLine
    currEraserPointerSizeRef.current = currEraserPointerSize
    currPencilPointerSizeRef.current = currPencilPointerSize
  }, [currPastelColor, currBoldColor, currOutlineColor, currFontSize, currLineType, currFontStyle, currArrowHead, currDashLine, currEraserPointerSize, currPencilPointerSize])

  // Section-Managing the functions referance soo that functions can be call from every where

  // this function add selectedElement on elements array
  const addSelectedElementsInElementsArrayRef = useRef(() => { })
  const [addSelectedElementsInElementsArray, setAddSelectedElementsInElementsArray] = useState(() => () => { })

  // this function draw elements present in elements array on it's state change
  const drawExistingElementsOnDrawingCanvasRef = useRef(() => { })
  const [drawExistingElementsOnDrawingCanvas, setDrawExistingElementsOnDrawingCanvas] = useState(() => () => { })

  // this function draw selected elements present in selectedElements array on it's state change
  const drawSelectedElementOnCanvasRef = useRef(() => { })
  const [drawSelectedElementOnCanvas, setDrawSelectedElementOnCanvas] = useState(() => () => { })

  // this function draw the new element on canvas to simulate the adding of new element but just draw don't add on selectedElements or elements array
  const drawNewItemOnCanvasRef = useRef(() => { })
  const [drawNewItemOnCanvas, setDrawNewItemOnCanvas] = useState(() => () => { })

  // this function add new element on seclectedElements array or elements array
  const updateElementsAndSelctedElementsRef = useRef(() => { })
  const [updateElementsAndSelctedElements, setUpdateElementsAndSelctedElements] = useState(() => () => { })

  // Section-Additional helper functions

  // this function add selectedElemets into elements array
  useEffect(() => {
    let newArrayToPushInElements = []
    addSelectedElementsInElementsArrayRef.current = () => {
      if (selectedElements.length > 0) {
        newArrayToPushInElements = [...elements, ...selectedElements]
        setElements(newArrayToPushInElements)
        setSelectedElements([])
      }
    }
    addSelectedElementsInElementsArrayRef.current()
    setAddSelectedElementsInElementsArray(() => addSelectedElementsInElementsArrayRef.current)
  }, [])


  //  Section-3 funtions to draw the additional features on canvas

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

  // this function draw selected element on canvas when the selcted element indicators are re-rendering the canvas
  const drawSelectedElementsWhenIndicatorsReRendering = () => {
    console.log(selectedElements)
  }


  // Section-4 functions to draw elements on canvas from elements[] and selectedElements[] array only

  // function-4.1

  // this function will draw what ever objectes are present in elements[] array on elements state change
  useEffect(() => {
    drawExistingElementsOnDrawingCanvasRef.current = () => {
      const ctx = middleCanvasRef.current.getContext('2d')
      elements.forEach(item => {
        if (item.type === 'rectangle') {
          ctx.fillStyle = item.color;
          ctx.strokeStyle = item.strokeColor;
          ctx.beginPath();
          ctx.roundRect(item.x, item.y, item.width, item.height, 10)
          ctx.stroke()
          if (item.color !== null) {
            console.log(`color applied ${item.color}`)
            ctx.fill()
          }
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
    drawExistingElementsOnDrawingCanvasRef.current()
    setDrawExistingElementsOnDrawingCanvas(() => drawExistingElementsOnDrawingCanvasRef.current)
  }, [elements])

  // function-4.2

  // this function will draw what ever objectes are presnt in selectedElements[] array on selectedElements state change
  useEffect(() => {
    drawSelectedElementOnCanvasRef.current = () => {
      console.log(selectedElements)
      if (selectedElements.length > 0) {
        selectedElements.forEach(item => {
          console.log('will draw selected element here')
        })
      } else {
        console.log('no selected element')
      }
    }
    drawSelectedElementOnCanvasRef.current()
    setDrawSelectedElementOnCanvas(() => drawSelectedElementOnCanvasRef.current)
  }, [selectedElements])




  // Section-5 simulate to draw new item on canvas

  // function-5.1

  //this function simulate (draw) new element on top canvas
  useEffect(() => {
    //add text on canvas
    const addTextOnCanvas = (screenX, screenY, event) => {
      console.log(event.target.innerHTML)
      const canvas = topCanvasRef.current;
      const ctx = canvas.getContext('2d')
      let font = event.target.innerHTML
      ctx.fillStyle = 'white'
      ctx.font = "20px Arial"
      ctx.fillText(font, screenX, screenY)
    }

    //draw new item on canvas
    drawNewItemOnCanvasRef.current = (selectedItem, startX, startY, endX, endY, prevPencilX, prevPencilY, screenX, screenY) => {
      const canvas = topCanvasRef.current
      const ctx = canvas.getContext('2d')
      if (selectedItem === 'squareDraw') {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = currPastelColorRef.current || currBoldColorRef.current;
        ctx.strokeStyle = currOutlineColorRef.current;
        const width = endX - startX
        const height = endY - startY
        ctx.beginPath()
        ctx.roundRect(startX, startY, width, height, 10)
        if (currPastelColorRef.current || currBoldColorRef.current) {
          console.log('entered')
          ctx.fill()
        }
        ctx.stroke()
      } else if (selectedItem === 'circleDraw') {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        ctx.strokeStyle = currPastelColor
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
        newP.style.top = `${screenY}px`
        newP.style.left = `${screenX}px`
        newP.addEventListener('keydown', (event) => {
          console.log(event)
          if (event.key === 'Enter') {
            event.preventDefault()
            addTextOnCanvas(screenX, screenY, event)
            newP.remove()
          }
        })
        document.getElementById('root').appendChild(newP)
        console.log(newP.innerHTML.length)
        if (newP.innerHTML.length > 0) {
          console.log('entered')
          document.body.addEventListener('click', () => {
            console.log('text printed')
          })
        }
      }
    }

    setDrawNewItemOnCanvas(() => drawNewItemOnCanvasRef.current)
  }, [currPastelColor, currBoldColor, currOutlineColor])

  // Section-6 updating the elements[] and selectedElements[] array by adding or deleting elements

  // function-6.1

  // this function manage the elements[] and selectedElements[] array
  useEffect(() => {
    let newElementsArray = null
    let oldSelectedElementsArray = [...selectedElements]
    updateElementsAndSelctedElementsRef.current = (newElement) => {
      if (oldSelectedElementsArray.length > 0) {
        newElementsArray = [...elements, ...selectedElements]
        setElements(newElementsArray)
      }
      let newSelctedElementsArray = []
      newSelctedElementsArray.push(newElement)
      setSelectedElements((prev) => newSelctedElementsArray)
    }
    setUpdateElementsAndSelctedElements(() => updateElementsAndSelctedElementsRef.current)
  }, [])

  // function-6.2

  // this function get the new item data and pass the item object to updateElementsAndSelctedElements function
  const addItemOnCanvas = (selectedItem, type, startX, startY, endX, endY, prevPencilX, prevPencilY) => {
    let newElement = null
    // { type: "rectangle", x: 100, y: 100, width: 120, height: 80, color: "blue" }
    if (type === 'rectangle') {
      const width = endX - startX
      const height = endY - startY
      newElement = {
        type: type,
        x: startX,
        y: startY,
        width: width,
        height: height,
        color: currBoldColorRef.current,
        strokeColor: currOutlineColorRef.current,
      }
      updateElementsAndSelctedElements(newElement)
    }
  }

  return (
    <>
      <drawCanvasContext.Provider value={{ elements, selectedElements, topCanvasRef, middleCanvasRef, mainCanvasRef, drawExistingElementsOnDrawingCanvas,  drawSelectionArea, drawSelectedElementIndicator, drawSelectedElementsWhenIndicatorsReRendering, drawNewItemOnCanvas, addItemOnCanvas, addSelectedElementsInElementsArray }}>
        {children}
      </drawCanvasContext.Provider>
    </>
  )

}

export default CanvasDrowStore
