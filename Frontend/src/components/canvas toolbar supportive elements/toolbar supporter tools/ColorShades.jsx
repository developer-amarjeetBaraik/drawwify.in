import React, { useContext } from 'react'
import style from './ColorShades.module.css'
import { toolbarComponentsValueContext } from '../../../../store/CanvasToolbarStore'

const ColorShades = ({ selectedColorTab }) => {
  const {currColor,setCurrColor}=useContext(toolbarComponentsValueContext)

  const handleClickOnBtn = (event) => {
    setCurrColor(getComputedStyle(document.documentElement).getPropertyValue(event.target.value))
  }
  

  return (
    <div className={style.colorShadesDiv}>
      <button value={`${selectedColorTab === 'pastel' ? '--color-tool-first-transparent' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? '--color-tool-first-solid' : selectedColorTab === 'outline' ? '--first-outline-color' : null}`} onClick={handleClickOnBtn} className={style.colorBtn} style={{ border: `1px solid var(--first-outline-color)`, backgroundColor: `${selectedColorTab === 'pastel' ? 'var(--color-tool-first-transparent)' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? 'var(--color-tool-first-solid)' : selectedColorTab === 'outline' ? 'var(--canvas-color)' : null}` }}></button>

      <button value={`${selectedColorTab === 'pastel' ? '--color-tool-second-transparent' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? '--color-tool-second-solid' : selectedColorTab === 'outline' ? '--color-tool-second-solid' : null}`} onClick={handleClickOnBtn} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-second-solid)`, backgroundColor: `${selectedColorTab === 'pastel' ? 'var(--color-tool-second-transparent)' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? 'var(--color-tool-second-solid)' : selectedColorTab === 'outline' ? 'var(--canvas-color)' : null}` }}></button>

      <button value={`${selectedColorTab === 'pastel' ? '--color-tool-third-transparent' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? '--color-tool-third-solid' : selectedColorTab === 'outline' ? '--color-tool-third-solid' : null}`} onClick={handleClickOnBtn} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-third-solid)`, backgroundColor: `${selectedColorTab === 'pastel' ? 'var(--color-tool-third-transparent)' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? 'var(--color-tool-third-solid)' : selectedColorTab === 'outline' ? 'var(--canvas-color)' : null}` }}></button>

      <button value={`${selectedColorTab === 'pastel' ? '--color-tool-fourth-transparent' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? '--color-tool-fourth-solid' : selectedColorTab === 'outline' ? '--color-tool-fourth-solid' : null}`} onClick={handleClickOnBtn} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-fourth-solid)`, backgroundColor: `${selectedColorTab === 'pastel' ? 'var(--color-tool-fourth-transparent)' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? 'var(--color-tool-fourth-solid)' : selectedColorTab === 'outline' ? 'var(--canvas-color)' : null}` }}></button>

      <button value={`${selectedColorTab === 'pastel' ? '--color-tool-fifth-transparent' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? '--color-tool-fifth-solid' : selectedColorTab === 'outline' ? '--color-tool-fifth-solid' : null}`} onClick={handleClickOnBtn} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-fifth-solid)`, backgroundColor: `${selectedColorTab === 'pastel' ? 'var(--color-tool-fifth-transparent)' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? 'var(--color-tool-fifth-solid)' : selectedColorTab === 'outline' ? 'var(--canvas-color)' : null}` }}></button>

      <button value={`${selectedColorTab === 'pastel' ? '--color-tool-sixth-transparent' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? '--color-tool-sixth-solid' : selectedColorTab === 'outline' ? '--color-tool-sixth-solid' : null}`} onClick={handleClickOnBtn} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-sixth-solid)`, backgroundColor: `${selectedColorTab === 'pastel' ? 'var(--color-tool-sixth-transparent)' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? 'var(--color-tool-sixth-solid)' : selectedColorTab === 'outline' ? 'var(--canvas-color)' : null}` }}></button>

      <button value={`${selectedColorTab === 'pastel' ? '--color-tool-seventh-transparent' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? '--color-tool-seventh-solid' : selectedColorTab === 'outline' ? '--color-tool-seventh-solid' : null}`} onClick={handleClickOnBtn} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-seventh-solid)`, backgroundColor: `${selectedColorTab === 'pastel' ? 'var(--color-tool-seventh-transparent)' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? 'var(--color-tool-seventh-solid)' : selectedColorTab === 'outline' ? 'var(--canvas-color)' : null}` }}></button>

      <button value={`${selectedColorTab === 'pastel' ? '--color-tool-eighth-transparent' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? '--color-tool-eighth-solid' : selectedColorTab === 'outline' ? '--color-tool-eighth-solid' : null}`} onClick={handleClickOnBtn} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-eighth-solid)`, backgroundColor: `${selectedColorTab === 'pastel' ? 'var(--color-tool-eighth-transparent)' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? 'var(--color-tool-eighth-solid)' : selectedColorTab === 'outline' ? 'var(--canvas-color)' : null}` }}></button>

      <button value={`${selectedColorTab === 'pastel' ? '--color-tool-ninth-transparent' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? '--color-tool-ninth-solid' : selectedColorTab === 'outline' ? '--color-tool-nineth-solid' : null}`} onClick={handleClickOnBtn} className={style.colorBtn} style={{ border: `1px solid var(--color-tool-ninth-solid)`, backgroundColor: `${selectedColorTab === 'pastel' ? 'var(--color-tool-ninth-transparent)' : (selectedColorTab === 'bold' || selectedColorTab === 'others') ? 'var(--color-tool-ninth-solid)' : selectedColorTab === 'outline' ? 'var(--canvas-color)' : null}` }}></button>
    </div>
  )
}

export default ColorShades
