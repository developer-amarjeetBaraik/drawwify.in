import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Canvas.module.css'
import { sidebarSelectedBtnContext } from '../../store/CanvasSidebarStore';
import { drawCanvasContext } from '../../store/CanvasDrowStore';

const Canvas = () => {


  const { mainCanvasRef, middleCanvasRef, topCanvasRef, drawExistingElementsOnDrawingCanvas, drawSelectionArea, drawSelectedElementIndicator, drawNewItemOnCanvas, addItemOnCanvas } = useContext(drawCanvasContext)

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


  //code to drag event on canvas or draw selection area on canvas
  // useEffect(() => {
  //   const canvas = document.getElementById('topCanvas')

  //   let isDragging = false;
  //   let startPointX = null;
  //   let startPointY = null;

  //   canvas.addEventListener('mousedown', (event) => {
  //     isDragging = true;
  //     startPointX = event.offsetX;
  //     startPointY = event.offsetY;
  //     console.log(startPointX , startPointY)
  //   })
  //   canvas.addEventListener('mousemove', (event) => {
  //     if (!isDragging) return
  //     const newMouseX = event.offsetX;
  //     const newMouseY = event.offsetY;
  //     if (sidebarSelectedBtn === null) {
  //       drawSelectionArea(startPointX, startPointY, newMouseX, newMouseY)
  //     }
  //   })
  //   canvas.addEventListener('mouseup', (event) => {
  //     isDragging = false;
  //     const ctx = canvas.getContext('2d')
  //     ctx.clearRect(0, 0, topCanvasRef.current.width, topCanvasRef.current.height)
  //     // console.log(`mouse up at: X:${event.offsetX} Y${event.offsetY}`)
  //   })
  // }, [sidebarSelectedBtn])


  //draw the selected element indicator with cursor
  useEffect(() => {
    const canvas = document.getElementById('topCanvas')
    const handleMouseOver = (event) => {
      drawSelectedElementIndicator(sidebarSelectedBtn, event.offsetX, event.offsetY)
    }
    canvas.addEventListener('mousemove', handleMouseOver)
    return () => {
      canvas.removeEventListener('mousemove', handleMouseOver)
    }
  }, [sidebarSelectedBtn])

  //code to draw and add item on canvas
  const isDraggingRef = useRef(false)
  const [startX, setStartX] = useState(null)
  const [startY, setStartY] = useState(null)
  //this is for pencil draw tool
  const [prevPencilX,setPrevPencilX] = useState()
  const [prevPencilY,setPrevPencilY] = useState()
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
      } else if (sidebarSelectedBtn === 'circleBtn' || sidebarSelectedBtn === 'circleDraw') {
        changeSidebarSelectedBtn('circleDraw')
        selectedItem = 'circleDraw'
      } else if (sidebarSelectedBtn === 'arrowBtn') {
        changeSidebarSelectedBtn('arrowDraw')
        selectedItem = 'arrowDraw'
      } else if (sidebarSelectedBtn === 'lineBtn') {
        changeSidebarSelectedBtn('lineDraw')
        selectedItem = 'lineDraw'
      } else if (sidebarSelectedBtn === 'drawBtn') {
        changeSidebarSelectedBtn('pencilDraw')
        selectedItem = 'pencilDraw'
      } else if (sidebarSelectedBtn === 'textBtn') {
        console.log(sidebarSelectedBtn)
        // changeSidebarSelectedBtn('textDraw')
        selectedItem = 'textDraw'
        //for text tool only
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
      addItemOnCanvas(sidebarSelectedBtn, startX, startY, endX, endY)
      changeSidebarSelectedBtn('cursorBtn')
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