import React, { createContext, use, useContext, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { toolbarComponentsValueContext } from './CanvasToolbarStore';
import { sidebarSelectedBtnContext } from './CanvasSidebarStore';
import { useDrawElementsFunction } from '../src/services/customHooks/useDrawElementsFunctions';
import { useDrawNewItem } from '../src/services/customHooks/useDrawNewItem';
import useStoreAndManageElementsInArray from '../src/services/customHooks/useStoreAndManageElementsInArray';
import useDrawMainElementsItem from '../src/services/customHooks/useDrawMainElementsItem';
import useDrawSelectedElementsItem from '../src/services/customHooks/useDrawSelectedElementsItem';
import updateSelectionPolygonOfLineAndArrow from '../src/services/helperFunctions/updateSelectionPolygonOfLineAndArrow';
import checkAndUpdateElementProperty from '../src/services/helperFunctions/checkAndUpdateElementProperty';

export const drawCanvasContext = createContext({
  mainElements: [],
  setMainElements: () => { },
  selectedElements: [],
  setSelectedElements: () => { },
  isElementEditing: false,
  setIsElementEditing: () => { },
  bottomCanvasRef: null,
  middleCanvasRef: null,
  topCanvasRef: null,
  isTextEditing: false,
  storeItemFromSelectedElementsToMainElements: () => { },
  drawSelectionArea: () => { },
  drawSelectedElementIndicator: () => { },
  drawNewItem: () => { },
  addNewItemInArr: () => { },
  drawMainElementsArr: () => { },
  drawSelectedElementsArr: () => { },
  tLRef: {},
  tRRef: {},
  bLRef: {},
  bRRef: {},
  lStart: {},
  lEnd: {},
  resetAllResizingPoints: () => { },
})


const CanvasDrowStore = ({ children }) => {

  const topCanvasRef = useRef(null)
  const middleCanvasRef = useRef(null)
  const bottomCanvasRef = useRef(null)

  // resizing points
  const tLRef = useRef({ name: 'topLeft', x: null, y: null })
  const tRRef = useRef({ name: 'topRight', x: null, y: null })
  const bLRef = useRef({ name: 'bottomLeft', x: null, y: null })
  const bRRef = useRef({ name: 'bottomRight', x: null, y: null })
  const lStart = useRef({ name: 'lineStart', x: null, y: null })
  const lEnd = useRef({ name: 'lineEnd', x: null, y: null })

  // Section- storing the state of all mainElements present on canvas

  //mainElements array
  const [mainElements, setMainElements] = useState([])

  //selectedElements array
  const [selectedElements, setSelectedElements] = useState([])

  // define if the user is editing the element or not
  const [isElementEditing, setIsElementEditing] = useState(false)

  // selected button context from sidebar
  const { sidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)

  // context form toolbar
  const { currPastelColorRef, currBoldColorRef, currOutlineColorRef, currFontSizeRef, currLineTypeRef, currFontStyleRef, currArrowHeadDirRef, currDashLineRef, currEraserPointerSizeRef, currPencilPointerSizeRef } = useContext(toolbarComponentsValueContext)

  // helper function- update the polygon around line or arrow when it's position change
  updateSelectionPolygonOfLineAndArrow({ selectedElements, setSelectedElements })

  // Fn- reset all the resizeing points points
  const resetAllResizingPoints = () => {
    tLRef.current = { name: 'topLeft', x: null, y: null }
    tRRef.current = { name: 'topRight', x: null, y: null }
    bLRef.current = { name: 'bottomLeft', x: null, y: null }
    bRRef.current = { name: 'bottomRight', x: null, y: null }
    lStart.current = { name: 'lineStart', x: null, y: null }
    lEnd.current = { name: 'lineEnd', x: null, y: null }
  }

  // custom hook- it contains element draw helping functions
  const { drawSelectedElementIndicator, drawSelectionArea, drawRectangle, drawCircle, drawArrow, drawLine, pencilDraw, drawText } = useDrawElementsFunction({ topCanvasRef, tLRef, tRRef, bLRef, bRRef, lStart, lEnd })

  // custom hook- it help to store and manage the new and old elements while selecting and deselecting the element
  const { addNewItemInArr, storeItemFromSelectedElementsToMainElements } = useStoreAndManageElementsInArray({ bottomCanvasRef, sidebarSelectedBtn, mainElements, setMainElements, selectedElements, setSelectedElements, currPastelColorRef, currOutlineColorRef, currBoldColorRef, currDashLineRef, currArrowHeadDirRef })

  // this state help to know if the text in editing or not on canvas right now
  const [isTextEditing, setIsTextEditing] = useState(false)

  // custom hook- when new element getting add on canvas it semulates the add new element by drawing that element on canvas
  const { drawNewItem } = useDrawNewItem({ topCanvasRef, addNewItemInArr, currPastelColorRef, currBoldColorRef, currOutlineColorRef, currFontSizeRef, currFontStyleRef, currArrowHeadDirRef, drawRectangle, drawCircle, drawArrow, drawLine, pencilDraw, drawText, setIsTextEditing })

  // check if the user change the properties of the element and update it on server
  checkAndUpdateElementProperty({ selectedElements, isElementEditing })

  // referance use to define which function should be used from useDrawElementsFunctions hook
  const functionReferance = {
    'rectangle': drawRectangle,
    'circle': drawCircle,
    'arrow': drawArrow,
    'line': drawLine,
    'handDraw': pencilDraw,
    'text': drawText,
  }

  // custom hook- draw element from selectedElements array
  const { drawSelectedElementsArr } = useDrawSelectedElementsItem({ selectedElements, topCanvasRef, functionReferance })
  // custom hook- draw element from mainElements array
  const { drawMainElementsArr } = useDrawMainElementsItem({ mainElements, bottomCanvasRef, functionReferance })

  return (
    <>
      <drawCanvasContext.Provider value={{ mainElements, setMainElements, selectedElements, setSelectedElements, isElementEditing, setIsElementEditing, topCanvasRef, middleCanvasRef, bottomCanvasRef, isTextEditing, storeItemFromSelectedElementsToMainElements, drawSelectionArea, drawSelectedElementIndicator, drawNewItem, addNewItemInArr, drawMainElementsArr, drawSelectedElementsArr, tLRef, tRRef, bRRef, bLRef, lStart, lEnd, resetAllResizingPoints }}>
        {children}
      </drawCanvasContext.Provider>
    </>
  )

}

export default CanvasDrowStore