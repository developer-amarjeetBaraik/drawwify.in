import React, { useContext } from 'react'
import { drawCanvasContext } from '../../../store/CanvasDrowStore'

const changeProperties = () => {
    const { selectedElements, setSelectedElements } = useContext(drawCanvasContext)
    const changePropertiesOfSelectedElement = (fieldName, value) => {
        let newObj = selectedElements[0]
        if (fieldName in newObj) {
            newObj = {
                ...newObj,
                [fieldName]: value,
                selectionSource: 'edit'
            }
            setSelectedElements([newObj])
        }
    }
    return { changePropertiesOfSelectedElement }
}

export default changeProperties