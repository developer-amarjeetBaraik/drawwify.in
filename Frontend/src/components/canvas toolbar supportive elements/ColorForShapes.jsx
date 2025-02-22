import React from 'react'
import style from './ColorForShapes.module.css'

const ColorForShapes = () => {
    return (
        <div className={style.colorMenu}>
            <div className={style.propertyOptionDiv}>
                <button className={style.propertyBtn}>
                    <span>
                        <i id={style.pastelI}></i>
                    </span>
                </button>
                <button className={style.propertyBtn}>
                    <span>
                        <i id={style.boldI}></i>
                    </span>
                </button>
                <button className={style.propertyBtn}>
                    <span>
                        <i id={style.outlineI}></i>
                    </span>
                </button>
            </div>
            <div className={style.colorOption}>

            </div>
        </div>
    )
}

export default ColorForShapes
