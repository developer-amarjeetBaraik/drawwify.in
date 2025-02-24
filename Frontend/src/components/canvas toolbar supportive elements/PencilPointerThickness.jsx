import React from 'react'
import style from './PencilPointerThickness.module.css'

const PencilPointerThickness = () => {
    return (
        <div className={style.PencilPointerThicknessDiv}>
            <input type="radio" name="pencilPointer" id="pencilPointer1" />
            <label htmlFor="pencilPointer1" className={style.PencilPointerThicknessBtn}>
                <svg role="img" width="4" height="4" focusable="false" aria-hidden="true" viewBox="0 0 4 4" className=""><circle cx="2" cy="2" r="2" fill="gray"></circle></svg>
            </label>
            <input type="radio" defaultChecked name="pencilPointer" id="pencilPointer2" />
            <label htmlFor="pencilPointer2" className={style.PencilPointerThicknessBtn}>
                <svg role="img" width="7" height="7" focusable="false" aria-hidden="true" viewBox="0 0 7 7" className=""><circle cx="3.5" cy="3.5" r="3.5" fill="gray"></circle></svg>
            </label>
            <input type="radio" name="pencilPointer" id="pencilPointer3" />
            <label htmlFor="pencilPointer3" className={style.PencilPointerThicknessBtn}>
                <svg role="img" width="13" height="13" focusable="false" aria-hidden="true" viewBox="0 0 13 13" className=""><circle cx="6.5" cy="6.5" r="6.5" fill="gray"></circle></svg>
            </label>
            <input type="radio" name="pencilPointer" id="pencilPointer4" />
            <label htmlFor="pencilPointer4" className={style.PencilPointerThicknessBtn}>
                <svg role="img" width="17" height="17" focusable="false" aria-hidden="true" viewBox="0 0 17 17" className=""><circle cx="8.5" cy="8.5" r="8.5" fill="gray"></circle></svg>
            </label>
        </div>
    )
}

export default PencilPointerThickness
