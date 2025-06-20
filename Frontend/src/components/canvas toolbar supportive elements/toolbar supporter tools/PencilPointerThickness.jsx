import React, { useContext, useEffect } from 'react'
import style from './PencilPointerThickness.module.css'
import { toolbarComponentsValueContext } from '../../../../store/CanvasToolbarStore'

const PencilPointerThickness = () => {

    //provideing pencil size to the toolbar context to use these value somewhare
    const { currPencilPointerSizeRef } = useContext(toolbarComponentsValueContext)

    useEffect(() => {
        const inputs = document.getElementsByName('pencilPointer')
        inputs.forEach((item) => {
            if (item.checked) {
                currPencilPointerSizeRef.current = item.value
            }
        })
    }, [])

    const handleClick = (event) => {
        currPencilPointerSizeRef.current = event.currentTarget.value
    }

    return (
        <div className={style.PencilPointerThicknessDiv}>
            <input onClick={handleClick} value={10} type="radio" name="pencilPointer" id="pencilPointer1" />
            <label htmlFor="pencilPointer1" className={style.PencilPointerThicknessBtn}>
                <svg role="img" width="4" height="4" focusable="false" aria-hidden="true" viewBox="0 0 4 4" className=""><circle cx="2" cy="2" r="2" fill="gray"></circle></svg>
            </label>
            <input onClick={handleClick} value={15} type="radio" defaultChecked name="pencilPointer" id="pencilPointer2" />
            <label htmlFor="pencilPointer2" className={style.PencilPointerThicknessBtn}>
                <svg role="img" width="7" height="7" focusable="false" aria-hidden="true" viewBox="0 0 7 7" className=""><circle cx="3.5" cy="3.5" r="3.5" fill="gray"></circle></svg>
            </label>
            <input onClick={handleClick} value={20} type="radio" name="pencilPointer" id="pencilPointer3" />
            <label htmlFor="pencilPointer3" className={style.PencilPointerThicknessBtn}>
                <svg role="img" width="13" height="13" focusable="false" aria-hidden="true" viewBox="0 0 13 13" className=""><circle cx="6.5" cy="6.5" r="6.5" fill="gray"></circle></svg>
            </label>
            <input onClick={handleClick} value={25} type="radio" name="pencilPointer" id="pencilPointer4" />
            <label htmlFor="pencilPointer4" className={style.PencilPointerThicknessBtn}>
                <svg role="img" width="17" height="17" focusable="false" aria-hidden="true" viewBox="0 0 17 17" className=""><circle cx="8.5" cy="8.5" r="8.5" fill="gray"></circle></svg>
            </label>
        </div>
    )
}

export default PencilPointerThickness
