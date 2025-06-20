import React, { useEffect } from 'react'
import deleteCanvasElementFns from './deleteCanvasElementFns';

const selectElementOnCanvas = ({ topCanvasRef, mainElements, setMainElements, selectedElements, setSelectedElements, sidebarSelectedBtn }) => {
    const { deleteCanvasElement } = deleteCanvasElementFns(selectedElements)
    //code the select the element on canvas
    const isPointInPolygon = (polygon, x, y) => {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].x, yi = polygon[i].y;
            const xj = polygon[j].x, yj = polygon[j].y;

            const intersect = ((yi > y) !== (yj > y)) &&
                (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }


    useEffect(() => {
        const canvas = topCanvasRef.current;
        const ctx = canvas.getContext('2d')
        const rect = canvas.getBoundingClientRect();

        const returnClickedElement = (mouseX, mouseY) => {
            let clickedElement = null
            if (selectedElements.length < 1 && sidebarSelectedBtn === 'cursorBtn') {
                clickedElement = mainElements.find((el) => {
                    switch (el.elementType) {
                        case 'rectangle':
                            return (
                                mouseX >= el.x &&
                                mouseX <= el.x + el.width &&
                                mouseY >= el.y &&
                                mouseY <= el.y + el.height
                            );
                        case 'text':
                            const boundaryDiff = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--selected-item-boundry-difference'))
                            let sX = el.screenX - boundaryDiff
                            let sY = el.screenY - boundaryDiff * 2 - el.fontSize / 2
                            ctx.font = `${el.fontSize}px ${el.fontStyle ? el.fontStyle : 'Arial'}`
                            let width = ctx.measureText(el.text).width + boundaryDiff * 2
                            let height = el.fontSize + boundaryDiff

                            return (
                                mouseX >= sX &&
                                mouseX <= sX + width &&
                                mouseY >= sY &&
                                mouseY <= sY + height
                            );

                        case 'circle':
                            const dx = mouseX - el.x;
                            const dy = mouseY - el.y;
                            return dx * dx + dy * dy <= el.radius * el.radius;

                        case 'line':
                        case 'arrow':
                            return isPointInPolygon(el.polygon, mouseX, mouseY);

                        default:
                            return false;
                    }
                });

            }
            return clickedElement
        }


        // check if any element clicked
        const handleCanvasClick = (event) => {
            // Mouse coordinates relative to canvas
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const clickedElement = returnClickedElement(mouseX, mouseY)

            if (clickedElement) {
                let newMainElements = mainElements.filter((item) => item !== clickedElement)
                setMainElements(newMainElements)
                setSelectedElements([clickedElement])
            }

        };

        const handleMouseRightClick = (event) => {
            event.preventDefault()
            // Mouse coordinates relative to canvas
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const clickedElement = returnClickedElement(mouseX, mouseY)

            if (clickedElement) {
                let newMainElements = mainElements.filter((item) => item !== clickedElement)
                setMainElements(newMainElements)
                setSelectedElements([clickedElement])
                deleteCanvasElement(clickedElement, mouseX, mouseY)
            } else if (selectedElements.length > 0) {
                deleteCanvasElement(selectedElements[0], mouseX, mouseY)
            }

        }

        canvas.addEventListener('click', handleCanvasClick)
        canvas.addEventListener('contextmenu', handleMouseRightClick)

        return () => {
            canvas.removeEventListener('click', handleCanvasClick)
            canvas.removeEventListener('contextmenu', handleMouseRightClick)
        }
    }, [mainElements, selectedElements, sidebarSelectedBtn])

    return { isPointInPolygon }
}

export default selectElementOnCanvas


