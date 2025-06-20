import { useContext } from "react"

export const useDrawElementsFunction = ({ topCanvasRef, tLRef, tRRef, bLRef, bRRef, lStart, lEnd }) => {
    // Section- Functions to draw on canvas

    // Fn- draw selected element indicator
    const drawSelectedElementIndicator = (selectedBtn, mouseX, mouseY) => {
        const canvas = topCanvasRef.current
        const ctx = canvas.getContext('2d')
        if (selectedBtn === 'squareBtn') {
            drawRectangle({ isNewElement: true, canvasRef: topCanvasRef, height: 100, width: 200, strokeColor: 'gray', x: mouseX, y: mouseY, borderRadius: 10 })
        } else if (selectedBtn === 'circleBtn') {
            drawCircle({ isNewElement: true, canvasRef: topCanvasRef, x: mouseX + 35, y: mouseY + 35, radius: 40, })
        }
    }

    // Fn- draw selection area
    const drawSelectionArea = (startPointX, startPointY, newMouseX, newMouseY) => {
        const rectWidth = newMouseX - startPointX
        const rectHeight = newMouseY - startPointY

        drawRectangle({ isNewElement: true, canvasRef: topCanvasRef, x: startPointX, y: startPointY, width: rectWidth, height: rectHeight, strokeColor: getComputedStyle(document.documentElement).getPropertyValue('--select-area-border-color'), fillColor: getComputedStyle(document.documentElement).getPropertyValue('--select-area-fill-color'), strokeWidth: 0.5 })
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

    // Fn - draw rectangle
    const drawRectangle = ({ isSelectedItem = false, isNewElement = false, canvasRef, x, y, width, height, strokeColor, fillColor = 'transparent', strokeWidth = 1.5, borderRadius = 0, }) => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.save();

        if (isNewElement) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }

        if (isSelectedItem) {
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
    const drawCircle = ({ isSelectedItem = false, isNewElement = false, canvasRef, x, y, radius, strokeColor = 'gray', fillColor, strokeWidth = 1.5 }) => {
        const ctx = canvasRef.current.getContext('2d')
        if (isNewElement) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
        if (isSelectedItem) {
            const boundaryDiff = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--selected-item-boundry-difference'))
            let sX = x - radius - boundaryDiff
            let sY = y - radius - boundaryDiff
            let sWidth = radius * 2 + boundaryDiff * 2
            let sHeight = radius * 2 + boundaryDiff * 2
            drawSelectionBoundary({ type: 'circle', sX, sY, sWidth, sHeight })
        }

        ctx.fillStyle = fillColor === null || fillColor === undefined ? 'transparent' : fillColor
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

        if (isSelectedItem) {
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

        if (isSelectedItem) {

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

    return { drawSelectedElementIndicator, drawSelectionArea, drawRectangle, drawCircle, drawArrow, drawLine, pencilDraw, drawText }
}
