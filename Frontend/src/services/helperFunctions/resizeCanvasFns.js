import React, { useEffect } from 'react'

const resizeCanvasFns = ({ topCanvasRef, middleCanvasRef, bottomCanvasRef }) => {
    //code to manage canvas size
    useEffect(() => {
        const resizeCanvas = () => {
            // for main canvas
            bottomCanvasRef.current.width = document.documentElement.clientWidth;
            bottomCanvasRef.current.height = document.documentElement.clientHeight;
            // for drawing canvas
            middleCanvasRef.current.width = document.documentElement.clientWidth;
            middleCanvasRef.current.height = document.documentElement.clientHeight;
            // for execution canvas
            topCanvasRef.current.width = document.documentElement.clientWidth;
            topCanvasRef.current.height = document.documentElement.clientHeight;
            // drawMainElementsArr()
        }
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas);
    }, []);
}

export default resizeCanvasFns
