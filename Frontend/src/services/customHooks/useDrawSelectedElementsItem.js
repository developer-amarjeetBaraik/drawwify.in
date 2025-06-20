import React, { useEffect, useRef, useState } from 'react'

const useDrawSelectedElementsItem = ({ selectedElements, topCanvasRef, functionReferance }) => {
    // this function draw selected elements present in selectedElements array on it's state change
    const drawSelectedElementsArrRef = useRef(() => { })
    const [drawSelectedElementsArr, setDrawSelectedElementsArr] = useState(() => () => { })
    // draw all items from selectedElements
    useEffect(() => {
        drawSelectedElementsArrRef.current = () => {
            const ctx = topCanvasRef.current.getContext('2d')
            ctx.clearRect(0, 0, topCanvasRef.current.width, topCanvasRef.current.height)
            selectedElements.forEach(item => {
                if (Object.keys(functionReferance).includes(item.elementType)) {
                    item.canvasRef = topCanvasRef
                    item.isSelectedItem = true
                    const functions = Object.entries(functionReferance)
                    const fn = functions.filter(fn => fn[0] === item.elementType)
                    fn[0][1](item)
                }
            })
        }
        setDrawSelectedElementsArr(() => drawSelectedElementsArrRef.current)
        drawSelectedElementsArrRef.current()
    }, [selectedElements])

    return {drawSelectedElementsArr}
}

export default useDrawSelectedElementsItem
