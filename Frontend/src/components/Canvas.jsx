import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Canvas.module.css'
import { sidebarSelectedBtnContext } from '../../store/CanvasSidebarStore';
import { drawCanvasContext } from '../../store/CanvasDrowStore';

const Canvas = () => {


  const { elements, selectedElements, mainCanvasRef, middleCanvasRef, topCanvasRef, drawExistingElementsOnDrawingCanvas, drawSelectionArea, drawSelectedElementIndicator,drawSelectedElementsWhenIndicatorsReRendering, drawNewItemOnCanvas, addItemOnCanvas, } = useContext(drawCanvasContext)

  const { sidebarSelectedBtn, changeSidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)

  //code to manage canvas size
  useEffect(() => {
    const mianCanvas = document.getElementById('myMainCanvas')
    const middleCanvas = document.getElementById('middleCanvas')
    const topCanvas = document.getElementById('topCanvas')

    function resizeCanvas() {
      // for main canvas
      mianCanvas.width = document.documentElement.clientWidth;
      mianCanvas.height = document.documentElement.clientHeight;
      // for drawing canvas
      middleCanvas.width = document.documentElement.clientWidth;
      middleCanvas.height = document.documentElement.clientHeight;
      // for execution canvas
      topCanvas.width = document.documentElement.clientWidth;
      topCanvas.height = document.documentElement.clientHeight;
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas);
  }, []);

  //code to add key down evnet listener on body to handle sidebar selected button on key down
  useEffect(() => {
    const body = document.body

    const handleKeyDownOnBody = (event) => {
      if (['v', 'r', 'c', 'a', 'l', 'd', 't', '/'].includes(event.key) && sidebarSelectedBtn !== 'textBtn' && sidebarSelectedBtn !== 'textDraw') {
        console.log('clicked')
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
  }, [sidebarSelectedBtn])


  //draw the element for the first time
  useEffect(() => {
    drawExistingElementsOnDrawingCanvas()
  }, [])

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

  //code the select the element on canvas
  useEffect(() => {
    const canvas = document.getElementById('topCanvas')
    const ctx = canvas.getContext('2d')

    const handleClickToSelectElement = () => {
      // console.log(`these are elements to select ${elements}`)
      // console.log(elements)
    }
    canvas.addEventListener('click', handleClickToSelectElement)

    return () => {
      canvas.removeEventListener('click', handleClickToSelectElement)
    }
  }, [elements])


  //draw the selected element indicator with cursor
  useEffect(() => {
    const canvas = document.getElementById('topCanvas')
    const handleMouseOver = (event) => {
      drawSelectedElementIndicator(sidebarSelectedBtn, event.offsetX, event.offsetY)
      console.log(selectedElements.length)
      if (selectedElements.length > 0) {
        drawSelectedElementsWhenIndicatorsReRendering()
      }
    }
    canvas.addEventListener('mousemove', handleMouseOver)
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
    const canvas = document.getElementById('topCanvas')
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
        drawNewItemOnCanvas(selectedItem, startX, startY, endX, endY, prevPencilX, prevPencilY, screenX, screenY)
      }
    }
    const handleMouseDragOnCanvas = (event) => {
      endX = event.offsetX
      endY = event.offsetY
      if (isDraggingRef.current && sidebarSelectedBtn === 'cursorBtn') {
        //draw the selection area if the sidebar button is cursorBtn
        drawSelectionArea(startX, startY, event.offsetX, event.offsetY)
      } else if (isDraggingRef.current && selectedItem != 'textDraw') {
        drawNewItemOnCanvas(selectedItem, startX, startY, endX, endY, prevPencilX, prevPencilY)
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
      if (sidebarSelectedBtn === 'cursorBtn') {
        ctx.clearRect(0, 0, topCanvasRef.current.width, topCanvasRef.current.height)
      }
      changeSidebarSelectedBtn('cursorBtn')
      if (sidebarSelectedBtn !== 'cursorBtn') {
        addItemOnCanvas(selectedItem, type, startX, startY, endX, endY, prevPencilX, prevPencilY)
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
  }, [sidebarSelectedBtn, startX, startY, prevPencilX, prevPencilY])

  return (
    <div className={style.canvasHolderDiv} id='canvasHolderDiv'>
      <canvas ref={mainCanvasRef} className={`${style.Canvas} ${style.mainCanvas}`} id={`myMainCanvas`} >
      </canvas>

      <canvas ref={middleCanvasRef} className={`${style.Canvas} ${style.supportingCanvas}`} id={`middleCanvas`}>
      </canvas>

      <canvas ref={topCanvasRef} className={`${style.Canvas} ${style.supportingCanvas}`} id={`topCanvas`}>
      </canvas>
    </div>
  )
}

export default Canvas