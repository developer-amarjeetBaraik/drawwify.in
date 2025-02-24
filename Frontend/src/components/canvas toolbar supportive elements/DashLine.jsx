import React from 'react'
import style from './DashLine.module.css'

const DashLine = () => {
  return (
    <div className={style.dashLineIconDiv}>
      <button className={style.dashLineIcon}>
      <svg role="img" width="40" height="20" focusable="false" aria-hidden="true" viewBox="0 0 40 20" className=""><path d="M6 10H34" stroke="white" stroke-width="2" stroke-dasharray="5.5" fill="none"></path></svg>
      </button>
    </div>
  )
}

export default DashLine
