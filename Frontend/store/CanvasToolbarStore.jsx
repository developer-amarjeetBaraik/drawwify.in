import React, { createContext, useState } from 'react'

export const toolbarBtnContext = createContext({
    selectedBtnName: null,
    changeSelectedBtnName: () => { },
})

const CanvasToolbarStore = ({ children }) => {
    const [selectedBtnName, setSelectedBtnName] = useState(null)

    const changeSelectedBtnName = (btnName)=>{
        if(btnName === selectedBtnName){
            setSelectedBtnName(null)
        }else{
            setSelectedBtnName(btnName)
        }
    }
    return (
        <toolbarBtnContext.Provider value={{selectedBtnName, changeSelectedBtnName}}>
            {children}
        </toolbarBtnContext.Provider>
    )
}

export default CanvasToolbarStore
