import React, { useContext, useEffect } from 'react'
import style from './Canvas.module.css'
import { sidebarSelectedBtnContext } from '../../store/CanvasSidebarStore';

const Canvas = () => {

  const { sidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)
  const canvasDiv = document.getElementById('canvasHolderDiv')

  // code to manage cursor icon on canvas
  useEffect(() => {
    switch (sidebarSelectedBtn) {
      case "square":
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
    const secondCanvas = document.getElementById('mySecondCanvas')
    function resizeCanvas(e) {
      // for main canvas
      mianCanvas.width = document.documentElement.clientWidth;
      mianCanvas.height = document.documentElement.clientHeight;
      // for second canvas
      secondCanvas.width = document.documentElement.clientWidth;
      secondCanvas.height = document.documentElement.clientHeight;
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div className={style.canvasHolderDiv} id='canvasHolderDiv'>
      <canvas width={document.documentElement.clientWidth} height={document.documentElement.clientHeight} className={`${style.Canvas} ${style.mainCanvas}`} id={`myMainCanvas`} >
        Drowing canvas
      </canvas>
      <canvas width={document.documentElement.clientWidth} height={document.documentElement.clientHeight} className={`${style.Canvas} ${style.supportingCanvas}`} id={`mySecondCanvas`}>
      </canvas>
    </div>
  )
}

export default Canvas