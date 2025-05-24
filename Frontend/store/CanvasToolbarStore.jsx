import React, { createContext, useEffect, useState } from 'react'

export const toolbarBtnContext = createContext({
    selectedBtnName: null,
    changeSelectedBtnName: () => { },
})

export const toolbarComponentsValueContext = createContext({
    currPastelColor: null,
    setCurrPatelColor: () => { },
    currBoldColor: null,
    setCurrBoldColor: () => { },
    currOutlineColor: null,
    setCurrOutlineColor: () => { },
    currFontSize: null,
    setCurrFontSize: () => { },
    currFontStyle: null,
    setCurrFontStyle: () => { },
    currLineType: null,
    setCurrLineType: () => { },
    currArrowHeadDir: [],
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

    //current pastel color
    const [currPastelColor, setCurrPatelColor] = useState(null)

    //current bold color
    const [currBoldColor, setCurrBoldColor] = useState(null)

    //current outline color
    const [currOutlineColor, setCurrOutlineColor] = useState('gray')

    //current font size
    const [currFontSize, setCurrFontSize] = useState(20)

    //current font style/typograhy
    const [currFontStyle, setCurrFontStyle] = useState('Sans-serif')

    //current line type
    const [currLineType, setCurrLineType] = useState('Straight')

    //current arrow head
    const [currArrowHeadDir, setCurrArrowHead] = useState([])

    //current dash line state
    const [currDashLine, setCurrDashLine] = useState(false)

    //current pencil pointer size
    const [currPencilPointerSize, setCurrPencilPointerSize] = useState(null)

    //current Eraser pointer size
    const [currEraserPointerSize, setCurrEraserPointerSize] = useState(null)


    const changeSelectedBtnName = (btnName) => {
        if (btnName === selectedBtnName) {
            setSelectedBtnName(null)
        } else {
            setSelectedBtnName(btnName)
        }
    }
    return (
        <toolbarComponentsValueContext.Provider value={{ currPastelColor, setCurrPatelColor, currBoldColor, setCurrBoldColor, currOutlineColor, setCurrOutlineColor, currFontSize, setCurrFontSize, currFontStyle, setCurrFontStyle, currLineType, setCurrLineType, currArrowHeadDir, setCurrArrowHead, currDashLine, setCurrDashLine, currPencilPointerSize, setCurrPencilPointerSize, currEraserPointerSize, setCurrEraserPointerSize }}>
            <toolbarBtnContext.Provider value={{ selectedBtnName, changeSelectedBtnName }}>
                {children}
            </toolbarBtnContext.Provider>
        </toolbarComponentsValueContext.Provider>
    )
}

export default CanvasToolbarStore
