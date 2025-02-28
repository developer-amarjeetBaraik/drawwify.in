import React, { useState } from 'react'
import style from './ColorTool.module.css'
import ColorShades from './ColorShades'

const ColorTool = () => {

    const [selectedColorTab, setSelectedColorTab] = useState('pastel')

    const handleInputChange = (event)=>{
        setSelectedColorTab(event.target.value)
    }

    return (
        <div className={style.colorToolDiv}>
            {/* Color tool when shapes selected */}
            <div className={style.colorPropertyDivForShapes}>
                <div onChange={handleInputChange} className={style.colorPropertyTab}>
                    {/* pastel */}
                    <input value={'pastel'} type="radio" defaultChecked name="colorPropertyTab" id="pastelColorPropertyTab" />
                    <label htmlFor="pastelColorPropertyTab">
                        <span className={style.toolbarColorIcon}>
                            <span className={style.colorSpaceIcon}>
                                <i className={style.colorEffectTab} id={style.pastelBtn}></i>
                            </span>
                        </span>
                    </label>
                    {/* bold */}
                    <input value={'bold'} type="radio" name="colorPropertyTab" id="boldColorPropertyTab" />
                    <label htmlFor="boldColorPropertyTab">
                        <span className={style.toolbarColorIcon}>
                            <span className={style.colorSpaceIcon}>
                                <i className={style.colorEffectTab} id={style.boldBtn}></i>
                            </span>
                        </span>
                    </label>
                    {/* outline */}
                    <input value={'outline'} type="radio" name="colorPropertyTab" id="outlinelColorPropertyTab" />
                    <label htmlFor="outlinelColorPropertyTab">
                        <span className={style.toolbarColorIcon}>
                            <span className={style.colorSpaceIcon}>
                                <i className={style.colorEffectTab} id={style.outlineBtn}></i>
                            </span>
                        </span>
                    </label>
                </div>
                <div className={style.colorWindowForShapes}>
                    <ColorShades selectedColorTab={selectedColorTab}/>
                </div>
            </div>
            {/* Color tool when text and other element selected */}
            <div>
            </div>
        </div>
    )
}

export default ColorTool
