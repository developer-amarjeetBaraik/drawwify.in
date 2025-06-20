import React, { useContext } from 'react'
import style from './DashLine.module.css'
import styleFromToolbarCSS from '../CanvasToolbar.module.css'
import { toolbarComponentsValueContext } from '../../../store/CanvasToolbarStore'

const DashLine = () => {

  //code to provide current state of dash line input to canvas toolbar store to use some where
  const { currDashLineRef } = useContext(toolbarComponentsValueContext)

  return (
    <div className={`${style.dashLineIconDiv}`}>
      <input checked={currDashLineRef.current ? true : false} type="checkbox" name="dashLineBtn" id="dashLineBtn" readOnly />
      <label onClick={() => currDashLineRef.current = (!currDashLineRef.current)} htmlFor="dashLineBtn" className={`${style.dashLineIcon}`}>
        <svg role="img" width="40" height="20" focusable="false" aria-hidden="true" viewBox="0 0 40 20" className=""><path d="M6 10H34" stroke="white" strokeWidth="2" strokeDasharray="5.5" fill="none"></path></svg>
      </label>
    </div>
  )
}

export default DashLine
