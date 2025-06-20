import React, { useContext } from 'react'
import style from './ArrowSide.module.css'
import { toolbarComponentsValueContext } from '../../../store/CanvasToolbarStore'

const ArrowSide = () => {

    //code to provide the value to the stote to use 
    const {currArrowHeadDirRef} = useContext(toolbarComponentsValueContext)

    const handleBtnClick =(event)=>{
        let value = event.currentTarget.value
        if(!currArrowHeadDirRef.current.includes(value)){
            let newArray = [...currArrowHeadDirRef.current]
            newArray.push(value)
            currArrowHeadDirRef.current = newArray
        }else{
            let newArray = currArrowHeadDirRef.current.filter((items)=> items !== value)
            currArrowHeadDirRef.current = newArray
        }
    }

    return (
        <div className={style.arrowBtnDiv}>
            <button onClick={handleBtnClick} value={0} className={`${style.arrowBtn} ${currArrowHeadDirRef.current.includes(0) ? style.activeBtn:null}`}>
                <svg role="img" width="16" height="16" focusable="false" aria-hidden="true" viewBox="0 0 16 16" className=""><path fill="white" fillRule="evenodd" clipRule="evenodd" d="M6.12438 11.2931C5.82444 11.5788 5.3497 11.5672 5.06404 11.2672L2.2069 8.26724C1.93103 7.97759 1.93103 7.52241 2.2069 7.23276L5.06404 4.23276C5.3497 3.93281 5.82444 3.92123 6.12438 4.2069C6.42433 4.49256 6.43591 4.96729 6.15025 5.26724L4.5 7L12.75 7C13.1642 7 13.5 7.33578 13.5 7.75C13.5 8.16421 13.1642 8.5 12.75 8.5L4.5 8.5L6.15025 10.2328C6.43591 10.5327 6.42433 11.0074 6.12438 11.2931Z" transform=""></path></svg>
            </button>
            <button onClick={handleBtnClick} value={1} className={`${style.arrowBtn} ${currArrowHeadDirRef.current.includes(0) ? style.activeBtn:null}`}>
                <svg role="img" width="16" height="16" focusable="false" aria-hidden="true" viewBox="0 0 16 16" className=""><path fill="white" fillRule="evenodd" clipRule="evenodd" d="M6.12438 11.2931C5.82444 11.5788 5.3497 11.5672 5.06404 11.2672L2.2069 8.26724C1.93103 7.97759 1.93103 7.52241 2.2069 7.23276L5.06404 4.23276C5.3497 3.93281 5.82444 3.92123 6.12438 4.2069C6.42433 4.49256 6.43591 4.96729 6.15025 5.26724L4.5 7L12.75 7C13.1642 7 13.5 7.33578 13.5 7.75C13.5 8.16421 13.1642 8.5 12.75 8.5L4.5 8.5L6.15025 10.2328C6.43591 10.5327 6.42433 11.0074 6.12438 11.2931Z" transform="translate(16, 0) scale(-1, 1)"></path></svg>
            </button>
        </div>
    )
}

export default ArrowSide
