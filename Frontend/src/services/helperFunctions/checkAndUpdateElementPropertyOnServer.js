import React, { useContext, useEffect, useRef, useState } from 'react'
import { workspaceElementServerContext } from '../../../store/WorkspaceElementServerStore'

const checkAndUpdateElementPropertyOnServer = ({ selectedElements, isElementEditing }) => {

    const { updateEditedElementOnServer } = useContext(workspaceElementServerContext)

    useEffect(() => {
        if (selectedElements.length > 0 && selectedElements[0].selectionSource === 'edit' && isElementEditing === false) {
            updateEditedElementOnServer(selectedElements[0], (res, error) => {
                if (error) {
                    console.log(error)
                }
            })
        }
    }, [selectedElements, isElementEditing])

}

export default checkAndUpdateElementPropertyOnServer