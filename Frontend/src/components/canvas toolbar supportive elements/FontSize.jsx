import React, { useContext, useState } from 'react'
import style from './FontSize.module.css'
import styleFromToolbarCSS from '../CanvasToolbar.module.css'
import { toolbarBtnContext, toolbarComponentsValueContext } from '../../../store/CanvasToolbarStore'

const FontSize = () => {
    const { selectedBtnName, changeSelectedBtnName } = useContext(toolbarBtnContext)

    const fontSizeBtnValue = 'fontSizeTab'

    //code to provide the font size to store to use it's value elsewhere
    const {currFontSize, setCurrFontSize}=useContext(toolbarComponentsValueContext)

    //code to see the which font size is selected
    const [fontSize, setFontSize] = useState('Small')

    //click event handler on buttons
    const handleBtnClick = (event) => {
        setCurrFontSize(event.target.value)
        setFontSize(event.target.innerHTML)
    }

    return (
        <div className={`${style.fontSizeDiv}`}>
            <div className={`${style.FontSizeIconDiv} ${styleFromToolbarCSS.toolbarButton} ${fontSizeBtnValue === selectedBtnName ? styleFromToolbarCSS.active : null}`}>
                {/* <input className={styleFromToolbarCSS.toolbarinput} type="radio" name="toolbarDropdownInput" id="fontSizeBtn" /> */}
                <button value={fontSizeBtnValue} onClick={() => changeSelectedBtnName(fontSizeBtnValue)} className={`${styleFromToolbarCSS.toolbarBtn} ${styleFromToolbarCSS.iconComponentSpan}`}>
                    <span>
                        {fontSize}
                    </span>
                    <svg width="5" height="5" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg" className="PropertyBarDropdown_caret__5FfmK"><path d="M.206 1.117l1.805 1.692c.272.255.71.255.983 0l1.804-1.692C5.23.705 4.924 0 4.303 0H.701C.074 0-.233.705.206 1.117z" fill="white"></path></svg>
                </button>
            </div>

            {/* conditional rendering applied */}
            {
                fontSizeBtnValue === selectedBtnName ? <>
                    <div className={style.FontSizeOptionDiv}>
                        {/* <div className={`${style.optionSection} ${style.firstSection}`}>
                            <div className={`${style.fontSizeRange} `}>
                                <button>-</button>
                                <p>{`${10}px`}</p>
                                <button>+</button>
                            </div>
                        </div> */}
                        <div className={`${style.fontSizeOption} ${style.optionSection} ${style.secondSection}`}>
                            <button onClick={handleBtnClick} value={10} className={`sizeBtn ${fontSize === "Small" ? style.activeSize : null}`}>Small</button>
                            <button onClick={handleBtnClick} value={15} className={`sizeBtn ${fontSize === "Medium" ? style.activeSize : null}`}>Medium</button>
                            <button onClick={handleBtnClick} value={20} className={`sizeBtn ${fontSize === "Large" ? style.activeSize : null}`}>Large</button>
                            <button onClick={handleBtnClick} value={25} className={`sizeBtn ${fontSize === "X-Large" ? style.activeSize : null}`}>X-Large</button>
                        </div>
                    </div>
                </> : null
            }



        </div>
    )
}

export default FontSize
