import React, { useEffect, useRef, useState } from 'react'

const useDrawMainElementsItem = ({ mainElements, bottomCanvasRef, functionReferance }) => {
    // this function draw elements present in elements array on it's state change
    const [drawMainElementsArr, setDrawMainElementsArr] = useState(() => () => { })
    const drawMainElementsArrRef = useRef(() => { })

    // draw all items from mainElements
    useEffect(() => {
        drawMainElementsArrRef.current = () => {
            const ctx = bottomCanvasRef.current.getContext('2d')
            ctx.clearRect(0, 0, bottomCanvasRef.current.width, bottomCanvasRef.current.height)
            mainElements.forEach(item => {
                if (Object.keys(functionReferance).includes(item.elementType)) {
                    item.canvasRef = bottomCanvasRef
                    const functions = Object.entries(functionReferance)
                    const fn = functions.filter(fn => fn[0] === item.elementType)
                    fn[0][1](item)
                }
            })
        }
        setDrawMainElementsArr(() => drawMainElementsArrRef.current)
        drawMainElementsArrRef.current()
    }, [mainElements])
    return { drawMainElementsArr }
}

export default useDrawMainElementsItem