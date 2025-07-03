import React, { useContext, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { workspaceElementServerContext } from '../../../store/WorkspaceElementServerStore'

const useStoreAndManageElementsInArray = ({ bottomCanvasRef,sidebarSelectedBtn, mainElements, setMainElements, selectedElements, setSelectedElements, currPastelColorRef, currBoldColorRef, currOutlineColorRef, currDashLineRef, currArrowHeadDirRef }) => {
    const { createNewElementOnServer } = useContext(workspaceElementServerContext)
    // section- storeing and managing the items in arrays

    // storeing new item in selected elements array
    const addItemInSelectedElementsArray = (arrgs) => {
        const tempId = `temp-${uuid()}`
        arrgs.id = tempId
        arrgs.savedStatus = 'pending'
        setSelectedElements([arrgs])
        // save new element in server database
        createNewElementOnServer(arrgs, (res, error) => {
            if (error) {
                setSelectedElements(prev => prev.map(el =>
                    el.id === tempId ? { ...el, savedStatus: 'faild' } : el
                ))
                console.log(`Element saving failed: ${res}`)
            } else {
                setSelectedElements(prev => prev.map(el => (
                    el.id === tempId ? { ...el, id: res.id, type: res.type, savedStatus: 'saved' } : el
                )))
            }
        })
    }

    // parse the values and store send them to store in selcted elements array
    const addNewItemInArr = ({ selectedItem, type, text, textColor, fontSize, fontStyle, screenX, screenY, startX, startY, endX, endY, prevPencilX, prevPencilY }) => {
        let color = currPastelColorRef.current || currBoldColorRef.current
        let strokeColor = currOutlineColorRef.current
        let isDashed = currDashLineRef.current
        let arrowHeadDir = currArrowHeadDirRef.current

        if (type === 'rectangle') {
            addItemInSelectedElementsArray({ elementType: type, x: startX, y: startY, height: endY - startY, width: endX - startX, strokeColor, borderRadius: 10, color })

        } else if (type === 'circle') {
            let centerX = (startX + endX) / 2
            let centerY = (startY + endY) / 2
            addItemInSelectedElementsArray({ elementType: type, x: centerX, y: centerY, radius: Math.sqrt(Math.pow(startX - centerX, 2) + Math.pow(startY - centerY, 2)), color, strokeColor })
        }
        else if (type === 'arrow') {
            let tolerance = 10

            // Calculate the selection area around the line
            const angle = Math.atan2(endY - startY, endX - startX);

            // Offset vectors perpendicular to the line
            const offsetX = Math.sin(angle) * tolerance;
            const offsetY = -Math.cos(angle) * tolerance;

            // Define polygon points (parallelogram around line)
            const p1 = { x: startX + offsetX, y: startY + offsetY };
            const p2 = { x: endX + offsetX, y: endY + offsetY };
            const p3 = { x: endX - offsetX, y: endY - offsetY };
            const p4 = { x: startX - offsetX, y: startY - offsetY };

            addItemInSelectedElementsArray({ polygon: [p1, p2, p3, p4], elementType: type, startX, startY, endX, endY, arrowSize: 10, arrowHeadDir, strokeColor })
        }
        else if (type === 'line') {
            let tolerance = 10

            // Calculate the selection area around the line
            const angle = Math.atan2(endY - startY, endX - startX);

            // Offset vectors perpendicular to the line
            const offsetX = Math.sin(angle) * tolerance;
            const offsetY = -Math.cos(angle) * tolerance;

            // Define polygon points (parallelogram around line)
            const p1 = { x: startX + offsetX, y: startY + offsetY };
            const p2 = { x: endX + offsetX, y: endY + offsetY };
            const p3 = { x: endX - offsetX, y: endY - offsetY };
            const p4 = { x: startX - offsetX, y: startY - offsetY };
            addItemInSelectedElementsArray({ polygon: [p1, p2, p3, p4], elementType: type, startX, startY, endX, endY, strokeColor })
        }
        else if (type === 'pencil') {
            addItemInSelectedElementsArray({ elementType: type, prevPencilX, prevPencilY, endX, endY, lineWidth: 3, pencilSize: 10, color, strokeColor })
        }
        else if (type === 'text') {
            color !== null ? color : color = 'white'
            addItemInSelectedElementsArray({ elementType: type, text, screenX, screenY, textColor, fontSize, fontStyle })
        }

    }

    // store selcted element in main element
    const storeItemFromSelectedElementsToMainElements = () => {
        if (selectedElements.length > 0) {
            selectedElements[0].canvasRef = bottomCanvasRef
            delete selectedElements[0].isSelectedItem
            delete selectedElements[0].selectionSource
            setMainElements([...mainElements, ...selectedElements])
            setSelectedElements([])
        }
    }

    // when sidebar selected button changes add selcted element into main element array if any
    useEffect(() => {
        if (sidebarSelectedBtn !== 'cursorBtn')
            storeItemFromSelectedElementsToMainElements()
    }, [sidebarSelectedBtn])

    return { addNewItemInArr, storeItemFromSelectedElementsToMainElements }
}

export default useStoreAndManageElementsInArray