import React, { useContext, useState } from 'react'
import style from './ColorTool.module.css'
import ColorShades from './ColorShades'
import { toolbarComponentsValueContext } from '../../../../store/CanvasToolbarStore'

const ColorTool = () => {

    const {currPastelColor, currBoldColor, currOutlineColor}=useContext(toolbarComponentsValueContext)

    const [selectedColorTab, setSelectedColorTab] = useState('Pastel')

    const handleInputChange = (event)=>{
        setSelectedColorTab(event.target.value)
    }

    return (
        <div className={style.colorToolDiv}>
            {/* Color tool when shapes selected */}
            <div className={style.colorPropertyDivForShapes}>
                <div onChange={handleInputChange} className={style.colorPropertyTab}>
                    {/* pastel */}
                    <input value={'Pastel'} type="radio" defaultChecked name="colorPropertyTab" id="pastelColorPropertyTab" />
                    <label htmlFor="pastelColorPropertyTab" >
                        <span className={style.toolbarColorIcon}>
                            <span className={style.colorSpaceIcon}>
                                <i className={style.colorEffectTab} id={style.pastelBtn} style={{backgroundColor:`${currPastelColor || 'gray'}`}}></i>
                            </span>
                        </span>
                    </label>

                    {/* bold */}
                    <input value={'Bold'} type="radio" name="colorPropertyTab" id="boldColorPropertyTab" />
                    <label htmlFor="boldColorPropertyTab" >
                        <span className={style.toolbarColorIcon}>
                            <span className={style.colorSpaceIcon}>
                                <i className={style.colorEffectTab} id={style.boldBtn} style={{backgroundColor:`${currBoldColor || 'white'}`}}></i>
                            </span>
                        </span>
                    </label>

                    {/* outline */}
                    <input value={'Outline'} type="radio" name="colorPropertyTab" id="outlinelColorPropertyTab" />
                    <label htmlFor="outlinelColorPropertyTab" >
                        <span className={style.toolbarColorIcon}>
                            <span className={style.colorSpaceIcon}>
                                <i className={style.colorEffectTab} id={style.outlineBtn} style={{border:`1px solid ${currOutlineColor}`}}></i>
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
