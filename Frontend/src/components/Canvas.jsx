import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Canvas.module.css'
import { sidebarSelectedBtnContext } from '../../store/CanvasSidebarStore';
import { drawCanvasContext } from '../../store/CanvasDrowStore';

const Canvas = () => {


  const { mainElements, setMainElements, selectedElements, setSelectedElements, bottomCanvasRef, middleCanvasRef, topCanvasRef, isTextEditing, drawSelectionArea, drawSelectedElementIndicator, drawNewItem, addNewItemInArr, tLRef, tRRef, bRRef, bLRef, lStart, lEnd, resetAllResizingPoints, storeItemFromSelectedElementsToMainElements, initialDrawAllElements } = useContext(drawCanvasContext)

  const { sidebarSelectedBtn, changeSidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)

  //code to manage canvas size
  useEffect(() => {
    const mianCanvas = document.getElementById('myMainCanvas')
    const middleCanvas = document.getElementById('middleCanvas')
    const topCanvas = document.getElementById('topCanvas')

    const resizeCanvas = () => {
      // for main canvas
      mianCanvas.width = document.documentElement.clientWidth;
      mianCanvas.height = document.documentElement.clientHeight;
      // for drawing canvas
      middleCanvas.width = document.documentElement.clientWidth;
      middleCanvas.height = document.documentElement.clientHeight;
      // for execution canvas
      topCanvas.width = document.documentElement.clientWidth;
      topCanvas.height = document.documentElement.clientHeight;
      // drawMainElementsArr()
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas);
  }, []);

  //code to add key down evnet listener on body to handle sidebar selected button on key down
  useEffect(() => {
    const body = document.body

    if (!isTextEditing) {
      const handleKeyDownOnBody = (event) => {
        if (['v', 'r', 'c', 'a', 'l', 'd', 't', '/'].includes(event.key) && sidebarSelectedBtn !== 'textBtn' && sidebarSelectedBtn !== 'textDraw') {
          switch (event.key) {
            case '/':
              changeSidebarSelectedBtn('insertBtn')
              break;
            case 'v':
              changeSidebarSelectedBtn('cursorBtn')
              break;
            case 'r':
              changeSidebarSelectedBtn('squareBtn')
              break;
            case 'c':
              changeSidebarSelectedBtn('circleBtn')
              break;
            case 'a':
              changeSidebarSelectedBtn('arrowBtn')
              break;
            case 'l':
              changeSidebarSelectedBtn('lineBtn')
              break;
            case 'd':
              changeSidebarSelectedBtn('drawBtn')
              break;
            case 't':
              changeSidebarSelectedBtn('textBtn')
              break;
          }
        }
      }

      body.addEventListener('keydown', handleKeyDownOnBody)

      return () => {
        body.removeEventListener('keydown', handleKeyDownOnBody)
      }
    }


  }, [sidebarSelectedBtn])


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


  //draw the selected element indicator with cursor
  useEffect(() => {
    const canvas = document.getElementById('topCanvas')
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

  //code the select the element on canvas
  function isPointInPolygon(polygon, x, y) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;

      const intersect = ((yi > y) !== (yj > y)) &&
        (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  useEffect(() => {
    const canvas = topCanvasRef.current;
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect();


    // check if any element clicked
    const handleCanvasClick = (event) => {
      // Mouse coordinates relative to canvas
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (selectedElements.length < 1 && sidebarSelectedBtn === 'cursorBtn') {

        const clickedElement = mainElements.find((el) => {
          switch (el.elementType) {
            case 'rectangle':
              return (
                mouseX >= el.x &&
                mouseX <= el.x + el.width &&
                mouseY >= el.y &&
                mouseY <= el.y + el.height
              );
            case 'text':
              const boundaryDiff = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--selected-item-boundry-difference'))
              let sX = el.screenX - boundaryDiff
              let sY = el.screenY - boundaryDiff * 2 - el.fontSize / 2
              ctx.font = `${el.fontSize}px ${el.fontStyle ? el.fontStyle : 'Arial'}`
              let width = ctx.measureText(el.text).width + boundaryDiff * 2
              let height = el.fontSize + boundaryDiff

              return (
                mouseX >= sX &&
                mouseX <= sX + width &&
                mouseY >= sY &&
                mouseY <= sY + height
              );

            case 'circle':
              const dx = mouseX - el.x;
              const dy = mouseY - el.y;
              return dx * dx + dy * dy <= el.radius * el.radius;

            case 'line':
            case 'arrow':
              return isPointInPolygon(el.polygon, mouseX, mouseY);

            default:
              return false;
          }
        });

        if (clickedElement) {
          let newMainElements = mainElements.filter((item) => item !== clickedElement)
          setMainElements(newMainElements)
          setSelectedElements([clickedElement])
        }
      }

    };

    canvas.addEventListener('click', handleCanvasClick)

    return () => {
      canvas.removeEventListener('click', handleCanvasClick)
    }
  }, [mainElements, selectedElements, sidebarSelectedBtn])


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
        offsetXRef.current = mouseX - selectedElements[0].width
        offsetYRef.current = mouseY - selectedElements[0].height
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
      isReSizingRef.current = false
      isGrabbedRef.current = false
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
    </div>
  )
}

export default Canvas