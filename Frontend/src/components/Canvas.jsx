import React, { useEffect } from 'react'
import style from './Canvas.module.css'

const Canvas = () => {

  useEffect(() => {
    const canvas = document.getElementById('myCanvas')
    function resizeCanvas(e) {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
    }
    canvas.addEventListener("wheel", console.log('wheel'))
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas);
  }, []);

  return (
    <>
      <canvas width={document.documentElement.clientWidth} height={document.documentElement.clientHeight} className={style.firstCanvas} id='myCanvas' >

      </canvas>
    </>
  )
}

export default Canvas
