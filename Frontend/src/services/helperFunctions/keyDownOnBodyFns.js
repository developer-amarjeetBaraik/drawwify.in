import React, { useEffect } from 'react'

const useKeyDownOnBodyFns = ({ sidebarSelectedBtn, changeSidebarSelectedBtn, isTextEditing }) => {

    //code to add key down evnet listener on body to handle sidebar selected button on key down
    useEffect(() => {
        const body = document.body
        const selectSidebarTabByKey = (event) => {
            if (['v', 'r', 'c', 'a', 'l', 'd', 't', '/'].includes(event.key) && sidebarSelectedBtn !== 'textBtn' && sidebarSelectedBtn !== 'textDraw') {
                switch (event.key) {
                    case '/':
                        changeSidebarSelectedBtn('insertBtn')
                        break;
                    case 'v':
                        changeSidebarSelectedBtn('cursorBtn')
                        break;
                    case 'r':
                        changeSidebarSelectedBtn('squareBtn')
                        break;
                    case 'c':
                        changeSidebarSelectedBtn('circleBtn')
                        break;
                    case 'a':
                        changeSidebarSelectedBtn('arrowBtn')
                        break;
                    case 'l':
                        changeSidebarSelectedBtn('lineBtn')
                        break;
                    case 'd':
                        changeSidebarSelectedBtn('drawBtn')
                        break;
                    case 't':
                        changeSidebarSelectedBtn('textBtn')
                        break;
                }
            }
        }
        if (!isTextEditing) {
            body.addEventListener('keydown', selectSidebarTabByKey)
            return () => {
                body.removeEventListener('keydown', selectSidebarTabByKey)
            }
        }
    }, [sidebarSelectedBtn, isTextEditing])

}

export default useKeyDownOnBodyFns
