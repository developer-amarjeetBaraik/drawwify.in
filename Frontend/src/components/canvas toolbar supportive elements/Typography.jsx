import React, { useContext, useState } from 'react'
import style from './Typography.module.css'
import styleFromToolbarCSS from '../CanvasToolbar.module.css'
import { toolbarBtnContext, toolbarComponentsValueContext } from '../../../store/CanvasToolbarStore'

const Typography = () => {

    const { selectedBtnName, changeSelectedBtnName } = useContext(toolbarBtnContext)

    //code to provide it's value to the store to use it some where
    const { currFontStyleRef } = useContext(toolbarComponentsValueContext)
    const handleBtnClick = (event) =>{
        currFontStyleRef.current = event.target.value
    }

    const typographyBtnValue = 'typographyTab'

    //code to see the which font size is selected
    const [fontSize, setFontSize] = useState('Rough')

    const handleFontSizeOption = (e) => {
        setFontSize(e.target.innerHTML)
    }

    return (
        <div className={style.TypographyDiv}>
            <div className={`${style.TypographyIconDiv}`}>
                <div className={`${styleFromToolbarCSS.toolbarButton} ${typographyBtnValue === selectedBtnName ? styleFromToolbarCSS.active : null}`}>
                    {/* <input className={styleFromToolbarCSS.toolbarinput} type="radio" name="toolbarDropdownInput" id="typographyBtn" /> */}
                    <button value={typographyBtnValue} onClick={() => changeSelectedBtnName(typographyBtnValue)} className={styleFromToolbarCSS.toolbarBtn}>
                        <span className={styleFromToolbarCSS.iconComponentSpan}>
                            <p>T</p>
                            <svg width="5" height="5" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg" className="PropertyBarDropdown_caret__5FfmK"><path d="M.206 1.117l1.805 1.692c.272.255.71.255.983 0l1.804-1.692C5.23.705 4.924 0 4.303 0H.701C.074 0-.233.705.206 1.117z" fill="white"></path></svg>
                        </span>
                    </button>
                </div>
            </div>

            {/* conditional rendering applyed */}
            {
                typographyBtnValue === selectedBtnName ?
                    <div className={style.alignOptionDiv}>
                        <div onClick={(e) => handleFontSizeOption(e)} className={`${style.fontStyleOption} ${style.optionSection} ${style.firstSection}`}>
                            <button onClick={handleBtnClick} value={'Sans-serif'} style={{fontFamily:'Sans-serif'}} className={`sizeBtn ${fontSize === "Rough" ? style.activeFont : null}`}>Rough</button>
                            <button onClick={handleBtnClick} value={'Monospace'} style={{fontFamily:'Monospace'}} className={`sizeBtn ${fontSize === "Clean" ? style.activeFont : null}`}>Clean</button>
                            <button onClick={handleBtnClick} value={'Cursive'} style={{fontFamily:'Cursive'}} className={`sizeBtn ${fontSize === "Mono" ? style.activeFont : null}`}>Mono</button>
                        </div>
                        <div className={`${style.optionSection} ${style.secondSection}`}>
                            <div className={`${style.textAlignOption} `}>
                                <button><svg role="img" width="28" height="28" focusable="false" aria-hidden="true" viewBox="0 0 28 28" className=""><line x1="8.75" y1="9.25" x2="19.25" y2="9.25" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"></line><line x1="8.75" y1="14.25" x2="13.25" y2="14.25" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"></line><line x1="8.75" y1="19.25" x2="16.25" y2="19.25" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"></line></svg></button>

                                <button><svg role="img" width="28" height="28" focusable="false" aria-hidden="true" viewBox="0 0 28 28" className=""><line x1="8.75" y1="9.25" x2="19.25" y2="9.25" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"></line><line x1="11.75" y1="14.25" x2="16.25" y2="14.25" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"></line><line x1="9.75" y1="19.25" x2="18.25" y2="19.25" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"></line></svg></button>

                                <button><svg role="img" width="28" height="28" focusable="false" aria-hidden="true" viewBox="0 0 28 28" className=""><line x1="8.75" y1="9.25" x2="19.25" y2="9.25" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"></line><line x1="14.75" y1="14.25" x2="19.25" y2="14.25" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"></line><line x1="11.75" y1="19.25" x2="19.25" y2="19.25" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"></line></svg></button>
                            </div>
                        </div>
                    </div>
                    : null
            }


        </div>
    )
}

export default Typography
