import React, { useReducer, useState } from 'react'
import { createContext } from "react";

export const navbarContext = createContext({
    canvasTitle: "Default title@",
    changeCanvasTitle: () => { }
})

const canvasTitleReducer = (value, action) => {

}
const CanvasNavbarStore = ({children}) => {

    const [canvasTitle, dispatchCanvasTitle] = useReducer(canvasTitleReducer, "Default title")

    function changeCanvasTitle(title) {
        console.log(title)
    }

    return (
        <navbarContext.Provider value={{ canvasTitle, changeCanvasTitle }}>
            {children}
        </navbarContext.Provider>
    )
}

export default CanvasNavbarStore
