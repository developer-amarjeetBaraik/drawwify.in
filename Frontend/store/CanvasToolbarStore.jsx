import React, { createContext, useEffect, useState } from 'react'

export const toolbarBtnContext = createContext({
    selectedBtnName: null,
    changeSelectedBtnName: () => { },
})

export const toolbarComponentsValueContext = createContext({
    currColor: null,
    setCurrColor: () => { },
    currFontSize: null,
    setCurrFontSize: () => { },
    currFontStyle: null,
    setCurrFontStyle: () => { },
    currLineType: null,
    setCurrLineType: () => { },
    currArrowHead: [],
    setCurrArrowHead: () => { },
    currDashLine: false,
    setCurrDashLine: () => { },
    currPencilPointerSize: null,
    setCurrPencilPointerSize: () => { },
    currEraserPointerSize: null,
    setCurrEraserPointerSize: () => { }, 
})

const CanvasToolbarStore = ({ children }) => {
    const [selectedBtnName, setSelectedBtnName] = useState(null)

    //toolbar components current state

    //current color
    const [currColor, setCurrColor] = useState('blue')

    //current font size
    const [currFontSize, setCurrFontSize] = useState('10px')

    //current font style/typograhy
    const [currFontStyle, setCurrFontStyle] = useState('Sans-serif')

    //current line type
    const [currLineType, setCurrLineType] = useState('Straight')

    //current arrow head
    const [currArrowHead, setCurrArrowHead] = useState([])

    //current dash line state
    const [currDashLine, setCurrDashLine] = useState(false)

    //current pencil pointer size
    const [currPencilPointerSize, setCurrPencilPointerSize] = useState(null)

    //current Eraser pointer size
    const [currEraserPointerSize, setCurrEraserPointerSize] = useState(null)

    useEffect(() => {
        console.log(currColor)
    }, [currColor])


    const changeSelectedBtnName = (btnName) => {
        if (btnName === selectedBtnName) {
            setSelectedBtnName(null)
        } else {
            setSelectedBtnName(btnName)
        }
    }
    return (
        <toolbarComponentsValueContext.Provider value={{ currColor, setCurrColor, currFontSize, setCurrFontSize, currFontStyle, setCurrFontStyle, currLineType, setCurrLineType, currArrowHead, setCurrArrowHead, currDashLine, setCurrDashLine, currPencilPointerSize, setCurrPencilPointerSize, currEraserPointerSize, setCurrEraserPointerSize }}>
            <toolbarBtnContext.Provider value={{ selectedBtnName, changeSelectedBtnName }}>
                {children}
            </toolbarBtnContext.Provider>
        </toolbarComponentsValueContext.Provider>
    )
}

export default CanvasToolbarStore
