import React, { useContext, useEffect, useState } from 'react'
import style from './ColorShades.module.css'
import { toolbarComponentsValueContext } from '../../../../store/CanvasToolbarStore'

const ColorShades = ({ selectedColorTab }) => {
  const { currPastelColorRef, currBoldColorRef, currOutlineColorRef} = useContext(toolbarComponentsValueContext)

  const changePastelColor = (event) => {
    currPastelColorRef.current = getComputedStyle(document.documentElement).getPropertyValue(event.target.value)
    currBoldColorRef.current = null
  }
  const changeBoldColor = (event) => {
    currBoldColorRef.current = getComputedStyle(document.documentElement).getPropertyValue(event.target.value)
    currPastelColorRef.current = null
  }
  const changeOutlineColor = (event) => {
    currOutlineColorRef.current = getComputedStyle(document.documentElement).getPropertyValue(event.target.value)
  }


  return (
    <>
      {
        // conditional rendering applied

        (selectedColorTab === 'Pastel') ? <>

          {/* for pastel */}

          <div className={style.colorShadesDiv}>
            <button value={'--color-tool-first-transparent'} onClick={changePastelColor} className={style.colorBtn} style={{ border: `1px solid var(--first-outline-color)`, backgroundColor: 'var(--color-tool-first-transparent)' }}></button>

            <button value={'--color-tool-second-transparent'} onClick={changePastelColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-second-solid)`, backgroundColor: 'var(--color-tool-second-transparent)' }}></button>

            <button value={'--color-tool-third-transparent'} onClick={changePastelColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-third-solid)`, backgroundColor: 'var(--color-tool-third-transparent)' }}></button>

            <button value={'--color-tool-fourth-transparent'} onClick={changePastelColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-fourth-solid)`, backgroundColor: 'var(--color-tool-fourth-transparent)' }}></button>

            <button value={'--color-tool-fifth-transparent'} onClick={changePastelColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-fifth-solid)`, backgroundColor: 'var(--color-tool-fifth-transparent)' }}></button>

            <button value={'--color-tool-sixth-transparent'} onClick={changePastelColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-sixth-solid)`, backgroundColor: 'var(--color-tool-sixth-transparent)' }}></button>

            <button value={'--color-tool-seventh-transparent'} onClick={changePastelColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-seventh-solid)`, backgroundColor: 'var(--color-tool-seventh-transparent)' }}></button>

            <button value={'--color-tool-eighth-transparent'} onClick={changePastelColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-eighth-solid)`, backgroundColor: 'var(--color-tool-eighth-transparent)' }}></button>

            <button value={'--color-tool-ninth-transparent'} onClick={changePastelColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-ninth-solid)`, backgroundColor: 'var(--color-tool-ninth-transparent)' }}></button>
          </div>

        </> : (selectedColorTab === 'Bold') ? <>

          {/* for bold */}

          <div className={style.colorShadesDiv}>
            <button value={'--color-tool-first-solid'} onClick={changeBoldColor} className={style.colorBtn} style={{ border: `1px solid var(--first-outline-color)`, backgroundColor: 'var(--color-tool-first-solid)' }}></button>

            <button value={'--color-tool-second-solid'} onClick={changeBoldColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-second-solid)`, backgroundColor: 'var(--color-tool-second-solid)' }}></button>

            <button value={'--color-tool-third-solid'} onClick={changeBoldColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-third-solid)`, backgroundColor: 'var(--color-tool-third-solid)' }}></button>

            <button value={'--color-tool-fourth-solid'} onClick={changeBoldColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-fourth-solid)`, backgroundColor: 'var(--color-tool-fourth-solid)' }}></button>

            <button value={'--color-tool-fifth-solid'} onClick={changeBoldColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-fifth-solid)`, backgroundColor: 'var(--color-tool-fifth-solid)' }}></button>

            <button value={'--color-tool-sixth-solid'} onClick={changeBoldColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-sixth-solid)`, backgroundColor: 'var(--color-tool-sixth-solid)' }}></button>

            <button value={'--color-tool-seventh-solid'} onClick={changeBoldColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-seventh-solid)`, backgroundColor: 'var(--color-tool-seventh-solid)' }}></button>

            <button value={'--color-tool-eighth-solid'} onClick={changeBoldColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-eighth-solid)`, backgroundColor: 'var(--color-tool-eighth-solid)' }}></button>

            <button value={'--color-tool-ninth-solid'} onClick={changeBoldColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-ninth-solid)`, backgroundColor: 'var(--color-tool-ninth-solid)' }}></button>
          </div>

        </> : (selectedColorTab === 'Outline') ? <>

          {/* for outline */}

          <div className={style.colorShadesDiv}>
            <button value={'--color-tool-first-solid'} onClick={changeOutlineColor} className={style.colorBtn} style={{ border: `1px solid var(--first-outline-color)`, backgroundColor: 'var(--canvas-color)' }}></button>

            <button value={'--color-tool-second-solid'} onClick={changeOutlineColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-second-solid)`, backgroundColor: 'var(--canvas-color)' }}></button>

            <button value={'--color-tool-third-solid'} onClick={changeOutlineColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-third-solid)`, backgroundColor: 'var(--canvas-color)' }}></button>

            <button value={'--color-tool-fourth-solid'} onClick={changeOutlineColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-fourth-solid)`, backgroundColor: 'var(--canvas-color)' }}></button>

            <button value={'--color-tool-fifth-solid'} onClick={changeOutlineColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-fifth-solid)`, backgroundColor: 'var(--canvas-color)' }}></button>

            <button value={'--color-tool-sixth-solid'} onClick={changeOutlineColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-sixth-solid)`, backgroundColor: 'var(--canvas-color)' }}></button>

            <button value={'--color-tool-seventh-solid'} onClick={changeOutlineColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-seventh-solid)`, backgroundColor: 'var(--canvas-color)' }}></button>

            <button value={'--color-tool-eighth-solid'} onClick={changeOutlineColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-eighth-solid)`, backgroundColor: 'var(--canvas-color)' }}></button>

            <button value={'--color-tool-ninth-solid'} onClick={changeOutlineColor} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-ninth-solid)`, backgroundColor: 'var(--canvas-color)' }}></button>
          </div>
        </> : null
      }
    </>
  )
}

export default ColorShades
