import React, { useContext, useEffect, useRef } from 'react'
import style from './Canvas.module.css'
import { sidebarSelectedBtnContext } from '../../store/CanvasSidebarStore';
import { drawCanvasContext } from '../../store/CanvasDrowStore';

const Canvas = () => {

  const canvasDiv = document.getElementById('canvasHolderDiv')

  const { mainCanvasRef, middleCanvasRef, topCanvasRef, drawOnDrawingCanvas, drawSelectionArea } = useContext(drawCanvasContext)

  const { sidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)

  // code to manage cursor icon on canvas
  useEffect(() => {
    switch (sidebarSelectedBtn) {
      case "square":
        // drawOnDrawingCanvas()
        canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
        break;
      case "circle":
        canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
        break;
      case "arrow":
        canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
        break;
      case "line":
        canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
        break;
      case "drow":
        canvasDiv.style.cursor = 'var(--cursor-draw-icon)'
        break;
      case "text":
        canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
        break;
    }
  }, [sidebarSelectedBtn])

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
    drawOnDrawingCanvas()
  }, [])

  //code to drag event on canvas 
  useEffect(() => {
    const canvas = document.getElementById('topCanvas')

    let isDragging = false;
    let startPointX = null;
    let startPointY = null;

    canvas.addEventListener('mousedown', (event) => {
      isDragging = true;
      startPointX = event.offsetX;
      startPointY = event.offsetY;
    })
    canvas.addEventListener('mousemove', (event) => {
      if (!isDragging) return
      const newMouseX = event.offsetX;
      const newMouseY = event.offsetY;
      drawSelectionArea(startPointX, startPointY, newMouseX, newMouseY)
    })
    canvas.addEventListener('mouseup', (event) => {
      isDragging = false;
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, topCanvasRef.current.width, topCanvasRef.current.height)
      // console.log(`mouse up at: X:${event.offsetX} Y${event.offsetY}`)
    })
  }, [])


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