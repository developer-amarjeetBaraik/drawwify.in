import { useEffect, useRef, useState } from "react"

export const useDrawNewItem = ({ topCanvasRef, addNewItemInArr, currPastelColorRef, currBoldColorRef, currOutlineColorRef, currFontSizeRef, currFontStyleRef, currArrowHeadDirRef, drawRectangle, drawCircle, drawArrow, drawLine, pencilDraw, drawText, setIsTextEditing }) => {
    // this function draw the new element on canvas to simulate the adding of new element but just draw don't add on selectedElements or elements array
    const [drawNewItem, setDrawNewItem] = useState(() => () => { })
    const drawNewItemRef = useRef(() => { })
    //draw new item on canvas
    useEffect(() => {
        drawNewItemRef.current = (selectedItem, startX, startY, endX, endY, prevPencilX, prevPencilY, screenX, screenY) => {
            const canvas = topCanvasRef.current
            const ctx = canvas.getContext('2d')
            if (selectedItem === 'squareDraw') {

                drawRectangle({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, x: startX, y: startY, height: endY - startY, width: endX - startX, strokeColor: currOutlineColorRef.current, borderRadius: 10, color: currPastelColorRef.current || currBoldColorRef.current })

            } else if (selectedItem === 'circleDraw') {
                let centerX = (startX + endX) / 2
                let centerY = (startY + endY) / 2
                let radius = Math.sqrt(Math.pow(startX - centerX, 2) + Math.pow(startY - centerY, 2))

                drawCircle({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, x: centerX, y: centerY, radius: radius, color: currPastelColorRef.current || currBoldColorRef.current, strokeColor: currOutlineColorRef.current })
            } else if (selectedItem === 'arrowDraw') {

                drawArrow({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, startX, startY, endX, endY, arrowSize: 10, arrowHeadDir: currArrowHeadDirRef.current, strokeColor: currOutlineColorRef.current })
            } else if (selectedItem === 'lineDraw') {

                drawLine({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, startX, startY, endX, endY, strokeColor: currOutlineColorRef.current })
            } else if (selectedItem === 'pencilDraw') {

                pencilDraw({ isNewElement: true, canvasRef: topCanvasRef, prevPencilX, prevPencilY, endX, endY, lineWidth: 3, pencilSize: 10, color: currPastelColorRef.current || currBoldColorRef.current, strokeColor: currOutlineColorRef.current })
            } else if (selectedItem === 'textDraw') {

                // there are two ways of adding text in canvas 1 press Enter after enter text 2 click on canvas outside the text box

                setIsTextEditing(true)

                let text = ''
                let fontSize = currFontSizeRef.current
                let fontStyle = currFontStyleRef.current || 'Arial'
                let textColor = currPastelColorRef.current || currBoldColorRef.current || 'white'

                const newP = document.createElement('p')
                newP.contentEditable = true
                // newP.autofocus = true
                newP.id = 'textField'
                newP.style.boxSizing = 'content-box'
                newP.style.padding = '0px 3px'
                newP.style.height = `${fontSize + 10}px`
                newP.style.minWidth = '100px'
                newP.style.maxWidth = '200px'
                newP.style.backgroundColor = 'tranceparent'
                newP.style.border = '1px solid white'
                newP.style.fontFamily = `${fontStyle}`
                newP.style.color = textColor
                newP.style.fontSize = `${fontSize}px`
                newP.style.position = 'absolute'
                newP.style.top = `${screenY - fontSize}px`
                newP.style.left = `${screenX}px`
                document.getElementById('root').appendChild(newP)
                setTimeout(() => {
                    newP.focus() 
                }, 0);
                newP.addEventListener('keydown', (event) => {
                    text = event.target.innerHTML
                    if (event.key === 'Enter' && text.length > 0) {
                        event.preventDefault()
                        drawText({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, text, textColor, screenX, screenY })
                        addNewItemInArr({ selectedItem, type: 'text', text, textColor, fontSize, fontStyle, screenX, screenY })
                        newP.remove()
                        text = ''
                        setIsTextEditing(false)
                    }
                })
                const addTextOnClick = () => {
                    if (text.length > 0) {
                        drawText({ isSelectedItem: true, isNewElement: true, canvasRef: topCanvasRef, text, textColor, screenX, screenY })
                        addNewItemInArr({ selectedItem, type: 'text', text, textColor, fontSize, fontStyle, screenX, screenY })
                        newP.remove()
                        text = ''
                        setIsTextEditing(false)
                    }else{
                        setIsTextEditing(false)
                        newP.remove()
                    }
                }
                topCanvasRef.current.addEventListener('click', addTextOnClick)
                return () => {
                    topCanvasRef.current.removeEventListener('click', addTextOnClick)
                }
            }
        }

        setDrawNewItem(() => drawNewItemRef.current)
    }, [currPastelColorRef.current, currBoldColorRef.current, currOutlineColorRef.current])
    return { drawNewItem }
}