import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Canvas.module.css'
import { Toaster } from 'sonner';
import { sidebarSelectedBtnContext } from '../../store/CanvasSidebarStore';
import { drawCanvasContext } from '../../store/CanvasDrowStore';
import { workspaceElementServerContext } from '../../store/WorkspaceElementServerStore';
import resizeCanvasFns from '../services/helperFunctions/resizeCanvasFns';
import keyDownOnBodyFns from '../services/helperFunctions/keyDownOnBodyFns';
import manageCursorIconOnCanvas from '../services/helperFunctions/manageCursorIconOnCanvas';
import selectedElementIndicator from '../services/helperFunctions/selectedElementIndicator';
import selectElementOnCanvas from '../services/helperFunctions/selectElementOnCanvas';

const Canvas = () => {

  const { fetchAllElements } = useContext(workspaceElementServerContext)

  const { mainElements, setMainElements, selectedElements, setSelectedElements, isElementEditing, setIsElementEditing, bottomCanvasRef, middleCanvasRef, topCanvasRef, isTextEditing, drawSelectionArea, drawSelectedElementIndicator, drawNewItem, addNewItemInArr, tLRef, tRRef, bRRef, bLRef, lStart, lEnd, resetAllResizingPoints, storeItemFromSelectedElementsToMainElements, initialDrawAllElements } = useContext(drawCanvasContext)

  const { sidebarSelectedBtn, changeSidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)

  // resize the canvas
  resizeCanvasFns({ topCanvasRef, middleCanvasRef, bottomCanvasRef })

  // key down on body to select sidebar element tab by key
  keyDownOnBodyFns({ sidebarSelectedBtn, changeSidebarSelectedBtn, isTextEditing })

  // change the cursor icon on canvas according to the states
  manageCursorIconOnCanvas({ sidebarSelectedBtn })

  // draw selected element indicator on canvas while the element got select in sidebar tab like rectangle, circle
  selectedElementIndicator({ topCanvasRef, sidebarSelectedBtn, selectedElements, drawSelectedElementIndicator })

  // return the true or false weather the user clicked on element or not and help to select element on canvas
  const { isPointInPolygon } = selectElementOnCanvas({ topCanvasRef, mainElements, setMainElements, selectedElements, setSelectedElements, sidebarSelectedBtn })

  // fetch all elements form server
  useEffect(() => {
    fetchAllElements((res, error) => {
      if (res) {
        setMainElements(res)
      }
    })
  }, [])

  //code to draw and add item on canvas

  //to provide the updated state to the functions
  const isDraggingRef = useRef(false)
  const [startX, setStartX] = useState(null)
  const [startY, setStartY] = useState(null)

  //to provide the element type 
  const [type, setType] = useState(null)

  //this is for pencil draw tool
  const [prevPencilX, setPrevPencilX] = useState()
  const [prevPencilY, setPrevPencilY] = useState()
  useEffect(() => {
    const canvas = topCanvasRef.current
    const ctx = canvas.getContext('2d')

    let selectedItem = sidebarSelectedBtn;

    let endX = null
    let endY = null

    //for text draw
    let screenX = null;
    let screenY = null;

    const handleMouseDownOnCanvas = (event) => {

      isDraggingRef.current = true;
      setStartX(event.offsetX);
      setStartY(event.offsetY);
      //for pencil tool
      setPrevPencilX(event.offsetX);
      setPrevPencilY(event.offsetY);
      //for text tool
      screenX = event.offsetX
      screenY = event.offsetY

      if (sidebarSelectedBtn === 'squareBtn' || sidebarSelectedBtn === 'squareDraw') {
        changeSidebarSelectedBtn('squareDraw')
        selectedItem = 'squareDraw'
        setType('rectangle')
      } else if (sidebarSelectedBtn === 'circleBtn' || sidebarSelectedBtn === 'circleDraw') {
        changeSidebarSelectedBtn('circleDraw')
        selectedItem = 'circleDraw'
        setType('circle')
      } else if (sidebarSelectedBtn === 'arrowBtn') {
        changeSidebarSelectedBtn('arrowDraw')
        selectedItem = 'arrowDraw'
        setType('arrow')
      } else if (sidebarSelectedBtn === 'lineBtn') {
        changeSidebarSelectedBtn('lineDraw')
        selectedItem = 'lineDraw'
        setType('line')
      } else if (sidebarSelectedBtn === 'drawBtn') {
        changeSidebarSelectedBtn('pencilDraw')
        selectedItem = 'pencilDraw'
        setType('pencil')
      } else if (sidebarSelectedBtn === 'textBtn') {
        selectedItem = 'textDraw'
        //for text tool only
        isDraggingRef.current = false;
        changeSidebarSelectedBtn('cursorBtn')
        setType('text')
        drawNewItem(selectedItem, startX, startY, endX, endY, prevPencilX, prevPencilY, screenX, screenY)
      }
    }
    const handleMouseDragOnCanvas = (event) => {
      endX = event.offsetX
      endY = event.offsetY
      if (isDraggingRef.current && sidebarSelectedBtn === 'cursorBtn' && selectedElements.length <= 0) {
        //draw the selection area if the sidebar button is cursorBtn
        drawSelectionArea(startX, startY, event.offsetX, event.offsetY)
      } else if (isDraggingRef.current && selectedItem != 'textDraw') {
        drawNewItem(selectedItem, startX, startY, endX, endY, prevPencilX, prevPencilY)
        //for pencil tool
        setPrevPencilX(endX);
        setPrevPencilY(endY);
      }
    }
    const handleMouseUpOnCanvas = (event) => {
      isDraggingRef.current = false;
      setStartX(prev => null)
      setStartY(prev => null)
      const endX = event.offsetX;
      const endY = event.offsetY;
      if (sidebarSelectedBtn === 'cursorBtn' && selectedElements.length <= 0) {
        ctx.clearRect(0, 0, topCanvasRef.current.width, topCanvasRef.current.height)
      }
      if (sidebarSelectedBtn !== 'cursorBtn' && type !== 'text') {
        addNewItemInArr({ selectedItem, type, startX, startY, endX, endY, prevPencilX, prevPencilY })
        changeSidebarSelectedBtn('cursorBtn')
      }
    }

    canvas.addEventListener('mousedown', handleMouseDownOnCanvas)
    canvas.addEventListener('mousemove', handleMouseDragOnCanvas)
    canvas.addEventListener('mouseup', handleMouseUpOnCanvas)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDownOnCanvas)
      canvas.removeEventListener('mousemove', handleMouseDragOnCanvas)
      canvas.removeEventListener('mouseup', handleMouseUpOnCanvas)
    }
  }, [sidebarSelectedBtn, selectedElements, startX, startY, prevPencilX, prevPencilY])


  // code to hit detection on editing points and re-sizing the element if it's not then add selected elements on mainElements array and reset all resizing points

  const isGrabbedRef = useRef(false)
  const isReSizingRef = useRef(false)
  const clickedPointRef = useRef({})
  const offsetXRef = useRef(0)
  const offsetYRef = useRef(0)

  useEffect(() => {
    const canvas = topCanvasRef.current;
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect();
    const boundaryDiff = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--selected-item-boundry-difference'))
    const radius = 5
    let resizingPoints = []
    const handleResizingPointClick = (event) => {
      resizingPoints = [tLRef.current, tRRef.current, bRRef.current, bLRef.current, lStart.current, lEnd.current]
      // Mouse coordinates relative to canvas
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      // maneging offset for grab and drag element
      if (selectedElements.length > 0 && selectedElements[0].elementType === 'rectangle') {
        offsetXRef.current = mouseX - selectedElements[0].x
        offsetYRef.current = mouseY - selectedElements[0].y
      } else if (selectedElements.length > 0 && selectedElements[0].elementType === 'circle') {
        offsetXRef.current = mouseX - selectedElements[0].x
        offsetYRef.current = mouseY - selectedElements[0].y
      } else if (selectedElements.length > 0 && selectedElements[0].elementType === 'text') {
        offsetXRef.current = mouseX - selectedElements[0].screenX
        offsetYRef.current = mouseY - selectedElements[0].screenY
      }

      // checking if the user clicked on the selection points
      clickedPointRef.current = resizingPoints.find((point) => {
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        if (dx * dx + dy * dy <= radius * radius) {
          return dx * dx + dy * dy <= radius * radius;
        }
      })

      // checking if the user clicked the selected boundry of the selected element
      const clickedInsideBoundary = isPointInPolygon([{ x: tLRef.current.x, y: tLRef.current.y }, { x: tRRef.current.x, y: tRRef.current.y }, { x: bRRef.current.x, y: bRRef.current.y }, { x: bLRef.current.x, y: bLRef.current.y }], mouseX, mouseY)

      // checking if the user clicked the selected line or arrow
      const isClickedOnSelectedLine = selectedElements.length > 0 && (selectedElements[0].elementType === 'line' || selectedElements[0].elementType === 'arrow') ? isPointInPolygon(selectedElements[0].polygon, mouseX, mouseY) : false;

      if (clickedPointRef.current) {
        isReSizingRef.current = true
      } else if (clickedInsideBoundary) {
        isGrabbedRef.current = true
      } else if (isClickedOnSelectedLine) {
        null;
      } else {
        storeItemFromSelectedElementsToMainElements()
        resetAllResizingPoints()
      }

    }

    const reSizeTheSelectedElement = (event) => {
      // Mouse coordinates relative to canvas
      const minMargin = 20
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      let newArr = selectedElements[0]


      if (selectedElements.length < 1 && !isDraggingRef.current && !isGrabbedRef.current) return;

      selectedElements.forEach((item) => {
        if (isReSizingRef.current) {
          newArr.selectionSource = 'edit'
          setIsElementEditing(true)
          // re-sizing element according to the re-sizing points
          switch (item.elementType) {
            case 'rectangle':
              switch (clickedPointRef.current.name) {
                case 'topLeft':
                  if (mouseX + minMargin > bRRef.current.x || mouseY + minMargin > bRRef.current.y) return;

                  newArr.width += newArr.x - mouseX;
                  newArr.height += newArr.y - mouseY;
                  newArr.x = mouseX;
                  newArr.y = mouseY;

                  setSelectedElements([newArr])
                  break;
                case 'topRight':
                  if (mouseX - minMargin < tLRef.current.x || mouseY + minMargin > bLRef.current.y) return;

                  newArr.width = mouseX - newArr.x;
                  newArr.height += newArr.y - mouseY;
                  newArr.y = mouseY;
                  setSelectedElements([newArr])
                  break;
                case 'bottomLeft':
                  if (mouseX + minMargin > tRRef.current.x || mouseY - minMargin < tLRef.current.y) return;

                  newArr.width += newArr.x - mouseX;
                  newArr.x = mouseX;
                  newArr.height = mouseY - newArr.y;
                  setSelectedElements([newArr])
                  break;
                case 'bottomRight':
                  if (mouseX - minMargin < tLRef.current.x || mouseY - minMargin < tRRef.current.y) return;

                  newArr.width = mouseX - newArr.x;
                  newArr.height = mouseY - newArr.y;
                  setSelectedElements([newArr])
                  break;
              }
              break;
            case 'circle':
              const dx = mouseX - item.x;
              const dy = mouseY - item.y;
              item.radius = Math.sqrt(dx * dx + dy * dy);
              setSelectedElements([item])
              break;
            case 'text':
              const newFontSize = Math.max(20, mouseY - item.screenY);
              item.fontSize = newFontSize;
              setSelectedElements([item])
              break;
            case 'arrow':
            case 'line':
              let tolerance = 10

              // Calculate the selection area around the line
              const angle = Math.atan2(item.endY - item.startY, item.endX - item.startX);

              // Offset vectors perpendicular to the line
              const offsetX = Math.sin(angle) * tolerance;
              const offsetY = -Math.cos(angle) * tolerance;

              // Define polygon points (parallelogram around line)
              const p1 = { x: item.startX + offsetX, y: item.startY + offsetY };
              const p2 = { x: item.endX + offsetX, y: item.endY + offsetY };
              const p3 = { x: item.endX - offsetX, y: item.endY - offsetY };
              const p4 = { x: item.startX - offsetX, y: item.startY - offsetY };
              item.polygon = [p1, p2, p3, p4]

              switch (clickedPointRef.current.name) {
                case 'lineStart':
                  item.startX = mouseX
                  item.startY = mouseY
                  setSelectedElements([item])
                  break;
                case 'lineEnd':
                  item.endX = mouseX
                  item.endY = mouseY
                  setSelectedElements([item])
                  break;
              }
              break;
            default:
              break;
          }
        } else if (isGrabbedRef.current) {
          // grab and re-place the element
          item.selectionSource = 'edit'
          setIsElementEditing(true)
          switch (item.elementType) {
            case 'rectangle':
            case 'circle':
              item.x = mouseX - offsetXRef.current
              item.y = mouseY - offsetYRef.current
              setSelectedElements([item])
              break;
            case 'text':
              item.screenX = mouseX - offsetXRef.current
              item.screenY = mouseY - offsetYRef.current
              setSelectedElements([item])
              break;
            default:
              break;
          }
        }
      })
    }

    const handleResizingMouseUp = () => {
      setIsElementEditing(false)
      isReSizingRef.current = false
      isGrabbedRef.current = false

      offsetXRef.current = null
      offsetYRef.current = null
    }
    canvas.addEventListener('mousedown', handleResizingPointClick)
    canvas.addEventListener('mousemove', reSizeTheSelectedElement)
    canvas.addEventListener('mouseup', handleResizingMouseUp)
    return () => {
      canvas.removeEventListener('mousedown', handleResizingPointClick)
      canvas.removeEventListener('mousemove', reSizeTheSelectedElement)
      canvas.removeEventListener('mouseup', handleResizingMouseUp)
    }
  }, [selectedElements, tLRef, tRRef, bRRef, bLRef, lStart, lEnd])


  return (
    <div className={style.canvasHolderDiv} id='canvasHolderDiv'>
      <canvas ref={bottomCanvasRef} className={`${style.Canvas} ${style.mainCanvas}`} id={`myMainCanvas`} >
      </canvas>

      <canvas ref={middleCanvasRef} className={`${style.Canvas} ${style.supportingCanvas}`} id={`middleCanvas`}>
      </canvas>

      <canvas ref={topCanvasRef} className={`${style.Canvas} ${style.supportingCanvas}`} id={`topCanvas`}>
      </canvas>
      <Toaster richColors theme='dark' />
    </div>
  )
}

export default Canvas