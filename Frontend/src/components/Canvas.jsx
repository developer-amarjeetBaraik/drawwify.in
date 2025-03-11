import React, { useContext, useEffect, useRef } from 'react'
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
      case "textBtn":
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
  useEffect(() => {
    const canvas = document.getElementById('topCanvas')
    const ctx = canvas.getContext('2d')

    let selectedItem = sidebarSelectedBtn;
    let startX = null;
    let startY = null;
    //this is for pencil draw tool
    let prevPencilX = null;
    let prevPencilY = null;
    let isDragging = false;

    const handleMouseDownOnCanvas = (event) => {
      isDragging = true;
      startX = event.offsetX;
      startY = event.offsetY;
      //for pencil tool
      prevPencilX = startX;
      prevPencilY = startY;
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
      }
    }
    const handleMouseDragOnCanvas = (event) => {
      let endX = event.offsetX
      let endY = event.offsetY
      if (isDragging && sidebarSelectedBtn === 'cursorBtn') {
        //draw the selection area if the sidebar button is cursorBtn
        drawSelectionArea(startX, startY, event.offsetX, event.offsetY)
      } else if (isDragging) {
        drawNewItemOnCanvas(selectedItem, startX, startY, endX, endY, prevPencilX, prevPencilY)
        //for pencil tool
        prevPencilX = endX;
        prevPencilY = endY;
      }
    }
    const handleMouseUpOnCanvas = (event) => {
      isDragging = false;
      const endX = event.offsetX;
      const endY = event.offsetY;
      if (sidebarSelectedBtn === 'cursorBtn') {
        ctx.clearRect(0, 0, topCanvasRef.current.width, topCanvasRef.current.height)
      }
      addItemOnCanvas(sidebarSelectedBtn, startX, startY, endX, endY)
    }

    canvas.addEventListener('mousedown', handleMouseDownOnCanvas)
    canvas.addEventListener('mousemove', handleMouseDragOnCanvas)
    canvas.addEventListener('mouseup', handleMouseUpOnCanvas)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDownOnCanvas)
      canvas.addEventListener('mousemove', handleMouseDragOnCanvas)
      canvas.addEventListener('mouseup', handleMouseUpOnCanvas)
    }
  }, [sidebarSelectedBtn])


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