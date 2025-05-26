import React, { createContext, use, useContext, useEffect, useRef, useState } from 'react'
// import Pencil from '../src/components/canvas toolbar supportive mainElements/toolbar supporter tools/Pencil';
import { toolbarComponentsValueContext } from './CanvasToolbarStore';
import { sidebarSelectedBtnContext } from './CanvasSidebarStore';

export const drawCanvasContext = createContext({
  mainElements: [],
  setMainElements: () => { },
  selectedElements: [],
  setSelectedElements: () => { },
  bottomCanvasRef: null,
  middleCanvasRef: null,
  topCanvasRef: null,
  canFireStoreItemFromSelectedElementsToMainElements: false,
  isTextEditing: false,
  storeItemFromSelectedElementsToMainElements: () => { },
  drawSelectionArea: () => { },
  drawSelectedElementIndicator: () => { },
  drawNewItem: () => { },
  addNewItemInArr: () => { },
  drawMainElementsArr: () => { },
  drawSelectedElementsArr: () => { },
  tLRef: {},
  tRRef: {},
  bLRef: {},
  bRRef: {},
  lStart: {},
  lEnd: {},
  resetAllResizingPoints: () => { },
})


const CanvasDrowStore = ({ children }) => {

  const topCanvasRef = useRef(null)
  const middleCanvasRef = useRef(null)
  const bottomCanvasRef = useRef(null)

  // { elementType: 'arrow', startX: 250, startY: 300, endX: 600, endY: 150, strokeColor: null }, { elementType: 'line', startX: 280, startY: 170, endX: 480, endY: 159, strokeColor: 'blue' },

  // Section- storing the state of all mainElements present on canvas

  //mainElements array
  const [mainElements, setMainElements] = useState([{ elementType: 'rectangle', x: 500, y: 200, width: 500, height: 200, strokeColor: 'blue', fillColor: 'yellow', strokeWidth: 1.5, borderRadius: 10 }, { elementType: 'circle', x: 800, y: 190, radius: 90, strokeColor: 'pink', strokeWidth: 3 }, { elementType: 'text', text: 'Amarjeet', fontSize: 20, fontStyle: 'Arial', screenX: 1100, screenY: 250, textColor: 'white' }, { elementType: 'text', text: 'Amarjeet', fontSize: 20, fontStyle: 'Arial', screenX: 950, screenY: 160, textColor: 'white' }])

  //selectedElements array
  const [selectedElements, setSelectedElements] = useState([])


  // Section- Managing referance of functions

  // this function draw elements present in elements array on it's state change
  const drawMainElementsArrRef = useRef(() => { })
  const [drawMainElementsArr, setDrawMainElementsArr] = useState(() => () => { })

  // this function draw selected elements present in selectedElements array on it's state change
  const drawSelectedElementsArrRef = useRef(() => { })
  const [drawSelectedElementsArr, setDrawSelectedElementsArr] = useState(() => () => { })

  // this function draw the new element on canvas to simulate the adding of new element but just draw don't add on selectedElements or elements array
  const drawNewItemRef = useRef(() => { })
  const [drawNewItem, setDrawNewItem] = useState(() => () => { })

  // this function add new element on seclectedElements array or elements array
  const updateElementsAndSelctedElementsRef = useRef(() => { })
  const [updateElementsAndSelctedElements, setUpdateElementsAndSelctedElements] = useState(() => () => { })

  // section- helper states

  // this state help to know if the text in editing or not on canvas right now
  const [isTextEditing, setIsTextEditing] = useState(false)

  // re-sizing points state
  const [resizingPoints, setResizingPoints] = useState([])

  const tLRef = useRef({ name: 'topLeft', x: null, y: null })
  const tRRef = useRef({ name: 'topRight', x: null, y: null })
  const bLRef = useRef({ name: 'bottomLeft', x: null, y: null })
  const bRRef = useRef({ name: 'bottomRight', x: null, y: null })
  const lStart = useRef({ name: 'lineStart', x: null, y: null })
  const lEnd = useRef({ name: 'lineEnd', x: null, y: null })


  // Section- maneging the states of toolbar values

  const { sidebarSelectedBtn, changeSidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)

  const { currPastelColor, currBoldColor, currOutlineColor, currFontSize, currLineType, currFontStyle, currArrowHeadDir, currDashLine, currEraserPointerSize, currPencilPointerSize } = useContext(toolbarComponentsValueContext)

  //storing the state into refs so that it's latest state can be used inside the function
  const currPastelColorRef = useRef(currPastelColor)
  const currBoldColorRef = useRef(currBoldColor)
  const currOutlineColorRef = useRef(currOutlineColor)
  const currFontSizeRef = useRef(currFontSize)
  const currLineTypeRef = useRef(currLineType)
  const currFontStyleRef = useRef(currFontStyle)
  const currArrowHeadDirRef = useRef(currArrowHeadDir)
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
    currArrowHeadDirRef.current = currArrowHeadDir
    currDashLineRef.current = currDashLine
    currEraserPointerSizeRef.current = currEraserPointerSize
    currPencilPointerSizeRef.current = currPencilPointerSize
  }, [currPastelColor, currBoldColor, currOutlineColor, currFontSize, currLineType, currFontStyle, currArrowHeadDir, currDashLine, currEraserPointerSize, currPencilPointerSize])

  // Section- Helping functions

  // Fn- reset all the resizeing points points
  const resetAllResizingPoints = () => {
    tLRef.current = { name: 'topLeft', x: null, y: null }
    tRRef.current = { name: 'topRight', x: null, y: null }
    bLRef.current = { name: 'bottomLeft', x: null, y: null }
    bRRef.current = { name: 'bottomRight', x: null, y: null }
    lStart.current = { name: 'lineStart', x: null, y: null }
    lEnd.current = { name: 'lineEnd', x: null, y: null }
  }

  // Fn - draw selection boundry
  const drawSelectionBoundary = ({ type, sX, sY, sWidth, sHeight, startX, startY, endX, endY }) => {
    const ctx = topCanvasRef.current.getContext('2d')
    let radius = 5;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--select-area-border-color')
    ctx.lineWidth = getComputedStyle(document.documentElement).getPropertyValue('--selected-item-border-width')

    const drawResizingPoint = (x, y) => {
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
    }

    const drawBoundaryLine = (x1, y1, x2, y2) => {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    switch (type) {
      case 'rectangle':
      case 'circle':
      case 'text':
        tLRef.current = { name: 'topLeft', x: sX, y: sY }
        tRRef.current = { name: 'topRight', x: sX + sWidth, y: sY }
        bLRef.current = { name: 'bottomLeft', x: sX, y: sY + sHeight }
        bRRef.current = { name: 'bottomRight', x: sX + sWidth, y: sY + sHeight }

        // top line
        drawBoundaryLine(tLRef.current.x, tLRef.current.y, tRRef.current.x, tRRef.current.y)
        // right line
        drawBoundaryLine(tRRef.current.x, tRRef.current.y, bRRef.current.x, bRRef.current.y)
        // bottom line
        drawBoundaryLine(bRRef.current.x, bRRef.current.y, bLRef.current.x, bLRef.current.y)
        // left line
        drawBoundaryLine(bLRef.current.x, bLRef.current.y, tLRef.current.x, tLRef.current.y)

        // top left point
        drawResizingPoint(tLRef.current.x, tLRef.current.y)

        // top right point
        drawResizingPoint(tRRef.current.x, tRRef.current.y)

        // bottom left point
        drawResizingPoint(bLRef.current.x, bLRef.current.y)

        // bottm right point
        drawResizingPoint(bRRef.current.x, bRRef.current.y)

      case 'arrow':
      case 'line':

        lStart.current = { name: 'lineStart', x: startX, y: startY }
        lEnd.current = { name: 'lineEnd', x: endX, y: endY }

        ctx.beginPath()
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--select-area-border-color')
        ctx.moveTo(lStart.current.x, lStart.current.y);  // Move to starting point
        ctx.lineTo(lEnd.current.x, lEnd.current.y);      // Draw line to this point
        ctx.stroke()
        ctx.fill()

        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(lStart.current.x, lStart.current.y, radius, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.fill()

        ctx.beginPath()
        ctx.arc(lEnd.current.x, lEnd.current.y, radius, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.fill()

      case 'pencil':


      default:
        break;
    }
  }

  // Fn- Draw rectangle
  const drawRectangle = ({ isSelectedItem = false, isNewElement = false, canvasRef, x, y, width, height, strokeColor, fillColor = 'transparent', strokeWidth = 1.5, borderRadius = 0, }) => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.save();
    console.log('calling')

    if (isNewElement) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    if (isSelectedItem && canvasRef === topCanvasRef) {
      const boundaryDiff = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--selected-item-boundry-difference'))
      let sX = x - boundaryDiff
      let sY = y - boundaryDiff
      let sWidth = width + boundaryDiff * 2
      let sHeight = height + boundaryDiff * 2
      drawSelectionBoundary({ type: 'rectangle', sX, sY, sHeight, sWidth })
    }


    ctx.beginPath()

    ctx.fillStyle = fillColor === null ? 'transparent' : fillColor
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth

    if (borderRadius > 0) {
      ctx.roundRect(x, y, width, height, 10)
    } else {
      ctx.strokeRect(x, y, width, height);
      ctx.fillRect(x, y, width, height);
    }

    if (fillColor != 'transparent') {
      ctx.fill()
    }

    ctx.stroke()
  }

  // Fn- Draw circle
  const drawCircle = ({ isSelectedItem = false, isNewElement = false, canvasRef, x, y, radius, strokeColor = 'gray', fillColor = 'transparent', strokeWidth = 1.5 }) => {
    const ctx = canvasRef.current.getContext('2d')
    if (isNewElement) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
    if (isSelectedItem && canvasRef === topCanvasRef) {
      const boundaryDiff = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--selected-item-boundry-difference'))
      let sX = x - radius - boundaryDiff
      let sY = y - radius - boundaryDiff
      let sWidth = radius * 2 + boundaryDiff * 2
      let sHeight = radius * 2 + boundaryDiff * 2
      drawSelectionBoundary({ type: 'circle', sX, sY, sWidth, sHeight })
    }

    ctx.fillStyle = fillColor
    ctx.strokeStyle = strokeColor
    ctx.strokeWidth = strokeWidth
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    if (fillColor != 'transparent') {
      ctx.fill()
    }
    ctx.stroke()
  }

  // Fn- Draw arrow
  const drawArrow = ({ isSelectedItem = false, isNewElement = false, canvasRef, startX, startY, endX, endY, arrowSize = 10, strokeWidth = 1.5, strokeColor = 'gray' }) => {
    const ctx = canvasRef.current.getContext('2d')
    const angle = Math.atan2(endY - startY, endX - startX);

    if (isNewElement) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    ctx.beginPath()
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
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

    if (isSelectedItem && canvasRef === topCanvasRef) {
      drawSelectionBoundary({ type: 'arrow', startX, startY, endX, endY })
    }

  }

  // Fn- Draw line
  const drawLine = ({ isSelectedItem = false, isNewElement = false, canvasRef, startX, startY, endX, endY, strokeWidth = 1.5, strokeColor }) => {
    const ctx = canvasRef.current.getContext('2d')
    if (isNewElement) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    ctx.beginPath()
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.moveTo(startX, startY);  // Move to starting point
    ctx.lineTo(endX, endY);      // Draw line to this point
    ctx.stroke()

    if (isSelectedItem && canvasRef === topCanvasRef) {

      drawSelectionBoundary({ type: 'line', startX, startY, endX, endY })

    }
  }

  // Fn- Draw pencil
  const pencilDraw = ({ isSelectedItem = false, isNewElement = false, canvasRef, prevPencilX, prevPencilY, endX, endY, lineWidth, strokeColor = 'white' }) => {
    const ctx = canvasRef.current.getContext('2d')

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor === 'gray' ? 'white' : strokeColor
    ctx.beginPath()
    ctx.moveTo(prevPencilX, prevPencilY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.fill()
  }

  // Fn- Draw text
  const drawText = ({ isSelectedItem = false, isNewElement = false, canvasRef, text = null, screenX, screenY, textColor = 'white', fontSize = 20, fontStyle = 'Arial' }) => {
    const ctx = canvasRef.current.getContext('2d')
    if (text) {
      ctx.fillStyle = textColor
      ctx.font = `${fontSize}px ${fontStyle}`
      ctx.fillText(text, screenX, screenY)
    } else {
      console.log('text not found')
    }


    if (isSelectedItem) {
      const boundaryDiff = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--selected-item-boundry-difference'))
      let sX = screenX - boundaryDiff
      let sY = screenY - boundaryDiff * 2 - fontSize / 2
      let sWidth = ctx.measureText(text).width + boundaryDiff * 2
      let sHeight = fontSize + boundaryDiff
      let sStrokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--select-area-border-color')
      ctx.strokeStyle = sStrokeStyle
      ctx.lineWidth = getComputedStyle(document.documentElement).getPropertyValue('--selected-item-border-width')
      ctx.strokeRect(sX, sY, sWidth, sHeight);
      drawSelectionBoundary({ type: 'text', sX, sY, sWidth, sHeight })
    }


  }

  // section- storeing and managing the items in arrays

  const [canFireStoreItemFromSelectedElementsToMainElements, setCanFireStoreItemFromSelectedElementsToMainElements] = useState(false)

  // storeing new item in selected elements array
  const addItemInSelectedElementsArray = (arrgs) => {
    setSelectedElements([arrgs])
  }

  // parse the values and store send them to store in selcted elements array
  const addNewItemInArr = ({ selectedItem, type, text, textColor, fontSize, fontStyle, screenX, screenY, startX, startY, endX, endY, prevPencilX, prevPencilY }) => {
    let fillColor = currPastelColorRef.current || currBoldColorRef.current
    let strokeColor = currOutlineColorRef.current
    let isDashed = currDashLineRef.current
    let arrowHeadDir = currArrowHeadDirRef.current

    if (type === 'rectangle') {
      addItemInSelectedElementsArray({ elementType: type, x: startX, y: startY, height: endY - startY, width: endX - startX, strokeColor, borderRadius: 10, fillColor })
    } else if (type === 'circle') {
      let centerX = (startX + endX) / 2
      let centerY = (startY + endY) / 2
      addItemInSelectedElementsArray({ elementType: type, x: centerX, y: centerY, radius: Math.sqrt(Math.pow(startX - centerX, 2) + Math.pow(startY - centerY, 2)), fillColor, strokeColor })
    }
    else if (type === 'arrow') {
      let tolerance = 10

      // Calculate the selection area around the line
      const angle = Math.atan2(endY - startY, endX - startX);

      // Offset vectors perpendicular to the line
      const offsetX = Math.sin(angle) * tolerance;
      const offsetY = -Math.cos(angle) * tolerance;

      // Define polygon points (parallelogram around line)
      const p1 = { x: startX + offsetX, y: startY + offsetY };
      const p2 = { x: endX + offsetX, y: endY + offsetY };
      const p3 = { x: endX - offsetX, y: endY - offsetY };
      const p4 = { x: startX - offsetX, y: startY - offsetY };

      addItemInSelectedElementsArray({ polygon: [p1, p2, p3, p4], elementType: type, startX, startY, endX, endY, arrowSize: 10, arrowHeadDir, strokeColor })
    }
    else if (type === 'line') {
      let tolerance = 10

      // Calculate the selection area around the line
      const angle = Math.atan2(endY - startY, endX - startX);

      // Offset vectors perpendicular to the line
      const offsetX = Math.sin(angle) * tolerance;
      const offsetY = -Math.cos(angle) * tolerance;

      // Define polygon points (parallelogram around line)
      const p1 = { x: startX + offsetX, y: startY + offsetY };
      const p2 = { x: endX + offsetX, y: endY + offsetY };
      const p3 = { x: endX - offsetX, y: endY - offsetY };
      const p4 = { x: startX - offsetX, y: startY - offsetY };
      addItemInSelectedElementsArray({ polygon: [p1, p2, p3, p4], elementType: type, startX, startY, endX, endY, strokeColor })
    }
    else if (type === 'pencil') {
      addItemInSelectedElementsArray({ elementType: type, prevPencilX, prevPencilY, endX, endY, lineWidth: 3, pencilSize: 10, fillColor, strokeColor })
    }
    else if (type === 'text') {
      fillColor !== null ? fillColor : fillColor = 'white'
      addItemInSelectedElementsArray({ elementType: type, text, screenX, screenY, textColor, fontSize, fontStyle })
    }

  }

  // store selcted element in main element
  const storeItemFromSelectedElementsToMainElements = () => {
    if (selectedElements.length > 0) {
      selectedElements[0].canvasRef = bottomCanvasRef
      delete selectedElements[0].isSelectedItem
      setMainElements([...mainElements, ...selectedElements])
      setSelectedElements([])
      setCanFireStoreItemFromSelectedElementsToMainElements(false)
    }
  }

  // when sidebar selected button changes add selcted element into main element array if any
  useEffect(() => {
    if (sidebarSelectedBtn !== 'cursorBtn')
      storeItemFromSelectedElementsToMainElements()
  }, [sidebarSelectedBtn])

  // Section- Functions to draw on canvas

  const drawSelectionArea = (startPointX, startPointY, newMouseX, newMouseY) => {
    const rectWidth = newMouseX - startPointX
    const rectHeight = newMouseY - startPointY

    drawRectangle({ isNewElement: true, canvasRef: topCanvasRef, x: startPointX, y: startPointY, width: rectWidth, height: rectHeight, strokeColor: getComputedStyle(document.documentElement).getPropertyValue('--select-area-border-color'), fillColor: getComputedStyle(document.documentElement).getPropertyValue('--select-area-fill-color'), strokeWidth: 0.5 })
  }

  const drawSelectedElementIndicator = (selectedBtn, mouseX, mouseY) => {
    const canvas = topCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (selectedBtn === 'squareBtn') {
      drawRectangle({ isNewElement: true, canvasRef: topCanvasRef, height: 100, width: 200, strokeColor: 'gray', x: mouseX, y: mouseY, borderRadius: 10 })
    } else if (selectedBtn === 'circleBtn') {
      drawCircle({ isNewElement: true, canvasRef: topCanvasRef, x: mouseX + 35, y: mouseY + 35, radius: 40, })
    }
  }

  const functionReferance = {
    'rectangle': drawRectangle,
    'circle': drawCircle,
    'arrow': drawArrow,
    'line': drawLine,
    'handDraw': pencilDraw,
    'text': drawText,
  }

  // draw all items from mainElements
  useEffect(() => {
    drawMainElementsArrRef.current = () => {
      const ctx = bottomCanvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, bottomCanvasRef.current.width, bottomCanvasRef.current.height)
      mainElements.forEach(item => {
        if (Object.keys(functionReferance).includes(item.elementType)) {
          item.canvasRef = bottomCanvasRef
          const functions = Object.entries(functionReferance)
          const fn = functions.filter(fn => fn[0] === item.elementType)
          fn[0][1](item)
        }
      })
    }
    setDrawMainElementsArr(() => drawMainElementsArrRef.current)
    drawMainElementsArrRef.current()
  }, [mainElements])


  // draw all items from selectedElements
  useEffect(() => {
    drawSelectedElementsArrRef.current = () => {
      const ctx = topCanvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, topCanvasRef.current.width, topCanvasRef.current.height)
      selectedElements.forEach(item => {
        if (Object.keys(functionReferance).includes(item.elementType)) {
          item.canvasRef = topCanvasRef
          item.isSelectedItem = true
          const functions = Object.entries(functionReferance)
          const fn = functions.filter(fn => fn[0] === item.elementType)
          fn[0][1](item)
        }
      })
    }
    setDrawSelectedElementsArr(() => drawSelectedElementsArrRef.current)
    drawSelectedElementsArrRef.current()
    if (selectedElements.length > 0) {
      setCanFireStoreItemFromSelectedElementsToMainElements(true)
    }
  }, [selectedElements])


  //draw new item on canvas
  useEffect(() => {
    drawNewItemRef.current = (selectedItem, startX, startY, endX, endY, prevPencilX, prevPencilY, screenX, screenY) => {
      const canvas = topCanvasRef.current
      const ctx = canvas.getContext('2d')
      if (selectedItem === 'squareDraw') {

        drawRectangle({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, x: startX, y: startY, height: endY - startY, width: endX - startX, strokeColor: currOutlineColorRef.current, borderRadius: 10, fillColor: currPastelColorRef.current || currBoldColorRef.current })

      } else if (selectedItem === 'circleDraw') {
        let centerX = (startX + endX) / 2
        let centerY = (startY + endY) / 2
        let radius = Math.sqrt(Math.pow(startX - centerX, 2) + Math.pow(startY - centerY, 2))

        drawCircle({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, x: centerX, y: centerY, radius: radius, fillColor: currPastelColorRef.current || currBoldColorRef.current, strokeColor: currOutlineColorRef.current })
      } else if (selectedItem === 'arrowDraw') {

        drawArrow({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, startX, startY, endX, endY, arrowSize: 10, arrowHeadDir: currArrowHeadDirRef.current, strokeColor: currOutlineColorRef.current })
      } else if (selectedItem === 'lineDraw') {

        drawLine({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, startX, startY, endX, endY, strokeColor: currOutlineColorRef.current })
      } else if (selectedItem === 'pencilDraw') {

        pencilDraw({ isNewElement: true, canvasRef: topCanvasRef, prevPencilX, prevPencilY, endX, endY, lineWidth: 3, pencilSize: 10, fillColor: currPastelColorRef.current || currBoldColorRef.current, strokeColor: currOutlineColorRef.current })
      } else if (selectedItem === 'textDraw') {

        // there are two ways of adding text in canvas 1 press Enter after enter text 2 click on canvas outside the text box

        setIsTextEditing(true)

        let text = ''
        let fontSize = currFontSizeRef.current
        let fontStyle = currFontStyleRef.current || 'Arial'
        let textColor = currPastelColorRef.current || currBoldColorRef.current || 'white'

        const newP = document.createElement('p')
        newP.contentEditable = true
        newP.autofocus = true
        newP.className = 'textField'
        newP.style.boxSizing = 'content-box'
        newP.style.padding = '0px 3px'
        newP.style.height = `${fontSize + 10}px`
        newP.style.minWidth = '100px'
        newP.style.maxWidth = '200px'
        newP.style.backgroundColor = 'tranceparent'
        newP.style.fontFamily = `${fontStyle}`
        newP.style.color = textColor
        newP.style.fontSize = `${fontSize}px`
        newP.style.position = 'absolute'
        newP.style.top = `${screenY - fontSize}px`
        newP.style.left = `${screenX}px`
        newP.addEventListener('keydown', (event) => {
          text = event.target.innerHTML
          if (event.key === 'Enter' && text.length > 0) {
            event.preventDefault()
            drawText({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, text, textColor, screenX, screenY })
            addNewItemInArr({ selectedItem, type: 'text', text, textColor, fontSize, fontStyle, screenX, screenY })
            newP.remove()
            text = ''
            setIsTextEditing(false)
          }
        })
        document.getElementById('root').appendChild(newP)
        const addTextOnClick = () => {
          if (text.length > 0) {
            drawText({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, text, textColor, screenX, screenY })
            addNewItemInArr({ selectedItem, type: 'text', text, textColor, fontSize, fontStyle, screenX, screenY })
            newP.remove()
            text = ''
            setIsTextEditing(false)
          }
        }
        topCanvasRef.current.addEventListener('click', addTextOnClick)
        return () => {
          topCanvasRef.current.removeEventListener('click', addTextOnClick)
        }
      }
    }

    setDrawNewItem(() => drawNewItemRef.current)
  }, [currPastelColor, currBoldColor, currOutlineColor])

  return (
    <>
      <drawCanvasContext.Provider value={{ mainElements, setMainElements, selectedElements, setSelectedElements, topCanvasRef, middleCanvasRef, bottomCanvasRef, isTextEditing, canFireStoreItemFromSelectedElementsToMainElements, storeItemFromSelectedElementsToMainElements, drawSelectionArea, drawSelectedElementIndicator, drawNewItem, addNewItemInArr, drawMainElementsArr, drawSelectedElementsArr, tLRef, tRRef, bRRef, bLRef, lStart, lEnd, resetAllResizingPoints }}>
        {children}
      </drawCanvasContext.Provider>
    </>
  )

}

export default CanvasDrowStore
