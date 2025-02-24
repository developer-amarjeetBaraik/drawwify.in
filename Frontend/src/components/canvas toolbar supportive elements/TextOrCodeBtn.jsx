import React, { useEffect, useState } from 'react'
import style from './TextOrCodeBtn.module.css'

const TextOrCodeBtn = () => {
    //styling
    const [selectedInput, setSelectedInput] = useState('text')

    return (
        <div className={style.TextOrCodeBtnDiv}>
            <div className={`${style.text} ${style.inputHolderDiv} ${selectedInput === 'text'?style.selectedTab:null}`}  >
                <input type="radio" id='text' defaultChecked value={'text'} name='TextOrCodeBtn' />
                <label onClick={() => setSelectedInput('text')} htmlFor="text" >Text</label>
            </div>
            <div className={`${style.code} ${style.inputHolderDiv} ${selectedInput === 'code'?style.selectedTab:null}`} >
                <input type="radio" id='code' value={'code'} name='TextOrCodeBtn' />
                <label onClick={() => setSelectedInput('code')} htmlFor="code" >Code</label>
            </div>
        </div>
    )

}

export default TextOrCodeBtn
