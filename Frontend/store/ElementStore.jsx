import React, { createContext, useState } from 'react'

export const elementsContext = createContext({
    elements: [],
    selectedElements: [],
})

const ElementStore = ({ children }) => {

    const [elements, setElements] = useState([])
    const [selectedElements, setSelectedElements] = useState(null)

    return (
        <elementsContext.Provider value={{elements, selectedElements}}>
            {children}
        </elementsContext.Provider>
    )
}

export default ElementStore
