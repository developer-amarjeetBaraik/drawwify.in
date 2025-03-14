import React, { createContext, useEffect, useState } from 'react'

export const sidebarSelectedBtnContext = createContext({
    sidebarSelectedBtn: null,
    changeSidebarSelectedBtn: () => { },
})

const CanvasSidebarStore = ({ children }) => {

    const [sidebarSelectedBtn, setSidebarSelectedBtn] = useState('cursorBtn')

    const changeSidebarSelectedBtn = (state) => {
        setSidebarSelectedBtn(prevState => {
            return state
        })
    }

    // useEffect(()=>{
    //     console.log(sidebarSelectedBtn)
    // },[sidebarSelectedBtn])

    return (
        <sidebarSelectedBtnContext.Provider value={{ sidebarSelectedBtn, changeSidebarSelectedBtn }}>
            {children}
        </sidebarSelectedBtnContext.Provider>
    )
}

export default CanvasSidebarStore
