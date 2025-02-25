import React, { useState } from 'react'
import style from './LineType.module.css'

const LineType = () => {
    // code to see if the fontSize tab is active of not
    const [isTabActive, setIsTabActive] = useState(false)
    return (
        <div className={style.LineTypeDiv}>
            <div className={`${style.LineTypeIconDiv} ${isTabActive ? style.active : null}`}>
                <button>
                    <svg role="img" width="11" height="12" focusable="false" aria-hidden="true" viewBox="0 0 11 12" className=""><path d="M9.78906 11.3479L7.98906 11.3479C6.49789 11.3479 5.28906 10.2286 5.28906 8.8479L5.28906 3.8479C5.28906 2.46719 4.08023 1.3479 2.58906 1.3479C2.58906 1.3479 2.58906 1.3479 2.58906 1.3479C2.58906 1.3479 1.49201 1.3479 0.789062 1.3479" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round"></path></svg>
                </button>
                <svg width="5" height="5" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg" className="PropertyBarDropdown_caret__5FfmK"><path d="M.206 1.117l1.805 1.692c.272.255.71.255.983 0l1.804-1.692C5.23.705 4.924 0 4.303 0H.701C.074 0-.233.705.206 1.117z" fill="white"></path></svg>
            </div>

            {/* <div className={style.optionDiv}>
                <button className={style.optionBtn}>
                <svg role="img" width="11" height="12" focusable="false" aria-hidden="true" viewBox="0 0 11 12" className="Button_leftIcon__JKaKw"><path d="M9.78906 11.3479L7.98906 11.3479C6.49789 11.3479 5.28906 10.2286 5.28906 8.8479L5.28906 3.8479C5.28906 2.46719 4.08023 1.3479 2.58906 1.3479C2.58906 1.3479 2.58906 1.3479 2.58906 1.3479C2.58906 1.3479 1.49201 1.3479 0.789062 1.3479" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round"></path></svg>
                <p>Elbow</p>
                </button>
                <button className={style.optionBtn}>
                <svg role="img" width="10" height="10" focusable="false" aria-hidden="true" viewBox="0 0 10 10" className="Button_leftIcon__JKaKw"><path fillRule="evenodd" clipRule="evenodd" d="M0.53033 9.53033C0.237437 9.23744 0.324914 8.67509 0.725715 8.27429L8.46667 0.533326C8.86747 0.132524 9.42982 0.0450481 9.72272 0.337941C10.0156 0.630835 9.92814 1.19318 9.52733 1.59399L1.78638 9.33495C1.38557 9.73575 0.823223 9.82322 0.53033 9.53033Z" fill="white"></path></svg>
                <p>Straight</p>
                </button>
            </div> */}
        </div>
    )
}

export default LineType
