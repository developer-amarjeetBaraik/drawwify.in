import { useEffect } from "react"

const updateSelectionPolygonOfLineAndArrow = ({selectedElements, setSelectedElements}) => {
    // Fn- updating the selection polygon of line and arrow
    useEffect(() => {
        if (selectedElements.elementType === 'line' || selectedElements.elementType === 'arrow') {
            let tolerance = 10
            let startX = selectedElements[0].startX
            let startY = selectedElements[0].startY
            let endX = selectedElements[0].endX
            let endY = selectedElements[0].endY

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
            selectedElements.polygon = [p1, p2, p3, p4]
            setSelectedElements(selectedElements)
        }
    }, [selectedElements])
}

export default updateSelectionPolygonOfLineAndArrow
