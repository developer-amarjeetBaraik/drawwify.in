import React from 'react'
import style from './Eraser.module.css'

const Eraser = () => {
  return (
    <div className={style.eraserDiv}>
            <button className={style.eraserBtn}>
            <svg role="img" width="21" height="21" focusable="false" aria-hidden="true" viewBox="0 0 21 21" className=""><rect x="7.97168" y="17.7328" width="7.18182" height="14.8166" rx="0.5" transform="rotate(-135 7.97168 17.7328)" fill="white" stroke="white"></rect><rect x="11.0459" y="15.9443" width="9" height="12.3084" rx="0.5" transform="rotate(-135 11.0459 15.9443)" fill="var(--grey-0)" stroke="white"></rect><path d="M8 20H1" stroke="white" stroke-width="1.5" stroke-linecap="round"></path></svg>
            </button>
        </div>
  )
}

export default Eraser
