import React from 'react'
import style from './ColorTool.module.css'

const ColorTool = () => {
    return (
        <div className={style.colorToolDiv}>
            {/* Color tool when shapes selected */}
            <div className={style.colorPropertyDivForShapes}>
                <div className={style.colorPropertyTab}>
                    {/* pastel */}
                    <input type="radio" defaultChecked name="colorPropertyTab" id="pastelColorPropertyTab" />
                    <label htmlFor="pastelColorPropertyTab">
                        <span className={style.toolbarColorIcon}>
                            <span className={style.colorSpaceIcon}>
                                <i></i>
                            </span>
                        </span>
                    </label>
                    {/* bold */}
                    <input type="radio" name="colorPropertyTab" id="boldColorPropertyTab" />
                    <label htmlFor="boldColorPropertyTab">
                        <span className={style.toolbarColorIcon}>
                            <span className={style.colorSpaceIcon}>
                                <i></i>
                            </span>
                        </span>
                    </label>
                    {/* outline */}
                    <input type="radio" name="colorPropertyTab" id="outlinelColorPropertyTab" />
                    <label htmlFor="outlinelColorPropertyTab">
                        <span className={style.toolbarColorIcon}>
                            <span className={style.colorSpaceIcon}>
                                <i></i>
                            </span>
                        </span>
                    </label>
                </div>
                <div className={style.colorWindowForShapes}>

                </div>
            </div>
            {/* Color tool when text and other element selected */}
            <div>
                
            </div>
        </div>
    )
}

export default ColorTool
