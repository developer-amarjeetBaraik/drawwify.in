import React, { createContext, useEffect, useRef, useState } from 'react'

export const toolbarBtnContext = createContext({
    selectedBtnName: null,
    changeSelectedBtnName: () => { },
})

export const toolbarComponentsValueContext = createContext({
    currPastelColorRef: null,
    currBoldColorRef: null,
    currOutlineColorRef: null,
    currFontSizeRef: null,
    currFontStyleRef: null,
    currLineTypeRef: null,
    currArrowHeadDirRef: [],
    currDashLineRef: false,
    currPencilPointerSizeRef: null,
    currEraserPointerSizeRef: null,
})

const CanvasToolbarStore = ({ children }) => {
    const [selectedBtnName, setSelectedBtnName] = useState(null)

    //toolbar components current state

    //current pastel color
    const currPastelColorRef = useRef(null)

    //current bold color
    const currBoldColorRef = useRef(null)

    //current outline color
    const currOutlineColorRef = useRef('gray')

    //current font size
    const currFontSizeRef = useRef(20)

    //current font style/typograhy
    const currFontStyleRef = useRef('Sans-serif')

    //current line type
    const currLineTypeRef = useRef('Straight')

    //current arrow head
    const currArrowHeadDirRef = useRef([])

    //current dash line state
    const currDashLineRef = useRef(false)

    //current pencil pointer size
    const currPencilPointerSizeRef = useRef(null)

    //current Eraser pointer size
    const currEraserPointerSizeRef = useRef(null)


    const changeSelectedBtnName = (btnName) => {
        if (btnName === selectedBtnName) {
            setSelectedBtnName(null)
        } else {
            setSelectedBtnName(btnName)
        }
    }
    return (
        <toolbarComponentsValueContext.Provider value={{ currPastelColorRef, currBoldColorRef, currOutlineColorRef, currFontSizeRef, currFontStyleRef, currLineTypeRef, currArrowHeadDirRef, currDashLineRef, currPencilPointerSizeRef, currEraserPointerSizeRef, }}>
            <toolbarBtnContext.Provider value={{ selectedBtnName, changeSelectedBtnName }}>
                {children}
            </toolbarBtnContext.Provider>
        </toolbarComponentsValueContext.Provider>
    )
}

export default CanvasToolbarStore
