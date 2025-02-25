import React from 'react'
import style from './Color.module.css'
import styleFromToolbarCSS from '../CanvasToolbar.module.css'
import ColorTool from './toolbar supporter tools/ColorTool'

const Color = () => {
  return (
    <div className={style.colorMainDiv}>
      <button className={styleFromToolbarCSS.toolbarButton}>
        <span className={style.toolbarColorIcon}>
            <span className={style.colorSpaceIcon}>
                <i></i>
            </span>
            <svg width="5" height="5" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg" className="PropertyBarDropdown_caret__5FfmK"><path d="M.206 1.117l1.805 1.692c.272.255.71.255.983 0l1.804-1.692C5.23.705 4.924 0 4.303 0H.701C.074 0-.233.705.206 1.117z" fill="white"></path></svg>
        </span>
      </button>
      <ColorTool/>
    </div>
  )
}

export default Color
