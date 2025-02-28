import React, { useContext, useState } from 'react'
import style from './LineStyle.module.css'
import styleFromToolbarCSS from '../CanvasToolbar.module.css'
import { toolbarBtnContext } from '../../../store/CanvasToolbarStore'

const LineStyle = () => {

    const { selectedBtnName, changeSelectedBtnName } = useContext(toolbarBtnContext)

    const [lineThicknessBtnValue, setLineThicknessBtnValue] = useState('lineThicknessTab')

    return (
        <div>
            <div className={`${styleFromToolbarCSS.toolbarButton} ${lineThicknessBtnValue === selectedBtnName ? styleFromToolbarCSS.active : null}`}>
                {/* <input className={styleFromToolbarCSS.toolbarinput} type="radio" name="toolbarDropdownInput" id="lineThicknessBtn" /> */}
                <button value={lineThicknessBtnValue} onClick={() => changeSelectedBtnName(lineThicknessBtnValue)} className={styleFromToolbarCSS.toolbarBtn}>
                    <span className={styleFromToolbarCSS.iconComponentSpan}>
                        <svg className={style.LineStyleIcon} role="img" width="13" height="10" focusable="false" aria-hidden="true" viewBox="0 0 13 10"><rect x="0.5" y="0.5" width="12" height="1.5" fill="white"></rect><rect x="0.5" y="3.5" width="12" height="2" fill="white"></rect><rect x="0.5" y="7" width="12" height="3" fill="white"></rect></svg>
                        <svg width="5" height="5" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg" className="PropertyBarDropdown_caret__5FfmK"><path d="M.206 1.117l1.805 1.692c.272.255.71.255.983 0l1.804-1.692C5.23.705 4.924 0 4.303 0H.701C.074 0-.233.705.206 1.117z" fill="white"></path></svg>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default LineStyle
