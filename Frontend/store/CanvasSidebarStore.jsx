import React, { createContext, useState } from 'react'

export const sidebarSelectedBtnContext = createContext({
    sidebarSelectedBtn: null,
    setSidebarSelectedBtn: () => { },
})

const CanvasSidebarStore = ({ children }) => {

    const [sidebarSelectedBtn, setSidebarSelectedBtn] = useState('cursor')

    return (
        <sidebarSelectedBtnContext.Provider value={{ sidebarSelectedBtn, setSidebarSelectedBtn }}>
            {children}
        </sidebarSelectedBtnContext.Provider>
    )
}

export default CanvasSidebarStore
