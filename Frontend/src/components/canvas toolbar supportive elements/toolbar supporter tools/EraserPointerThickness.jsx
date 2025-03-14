import React, { useContext, useEffect, useRef } from 'react'
import style from './EraserPointerThickness.module.css'
import { sidebarSelectedBtnContext } from '../../../../store/CanvasSidebarStore'
import { toolbarComponentsValueContext } from '../../../../store/CanvasToolbarStore'

const EraserPointerThickness = () => {
    //provideing eraser size to the sidebar context to use these value somewhare
    const { changeSidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)
    //provideing eraser size to the toolbar context to use these value somewhare
    const { setCurrEraserPointerSize } = useContext(toolbarComponentsValueContext)

    useEffect(() => {
        const inputs = document.getElementsByName('eraserPointer')
        inputs.forEach((item) => {
            if (item.checked) {
                changeSidebarSelectedBtn(item.value)
                setCurrEraserPointerSize(item.value)
            }
        })
    }, [])

    const handleClick = (event) => {
        changeSidebarSelectedBtn(event.currentTarget.value)
        setCurrEraserPointerSize(event.currentTarget.value)
    }

    return (
        <div className={style.EraserPointerThicknessDiv}>
            <input onClick={handleClick} value={'eraserSizeX'} type="radio" name="eraserPointer" id="eraserPointer1" />
            <label htmlFor="eraserPointer1" className={style.EraserPointerThicknessBtn}>
                <svg role="img" width="4" height="4" focusable="false" aria-hidden="true" viewBox="0 0 4 4" className=""><circle cx="2" cy="2" r="2" fill="gray"></circle></svg>
            </label>
            <input onClick={handleClick} value={'eraserSizeM'} type="radio" name="eraserPointer" id="eraserPointer2" />
            <label htmlFor="eraserPointer2" className={style.EraserPointerThicknessBtn}>
                <svg role="img" width="7" height="7" focusable="false" aria-hidden="true" viewBox="0 0 7 7" className=""><circle cx="3.5" cy="3.5" r="3.5" fill="gray"></circle></svg>
            </label>
            <input onClick={handleClick} value={'eraserSizeL'} type="radio" defaultChecked name="eraserPointer" id="eraserPointer3" />
            <label htmlFor="eraserPointer3" className={style.EraserPointerThicknessBtn}>
                <svg role="img" width="13" height="13" focusable="false" aria-hidden="true" viewBox="0 0 13 13" className=""><circle cx="6.5" cy="6.5" r="6.5" fill="gray"></circle></svg>
            </label>
            <input onClick={handleClick} value={'eraserSizeXL'} type="radio" name="eraserPointer" id="eraserPointer4" />
            <label htmlFor="eraserPointer4" className={style.EraserPointerThicknessBtn}>
                <svg role="img" width="17" height="17" focusable="false" aria-hidden="true" viewBox="0 0 17 17" className=""><circle cx="8.5" cy="8.5" r="8.5" fill="gray"></circle></svg>
            </label>
        </div>
    )
}

export default EraserPointerThickness
