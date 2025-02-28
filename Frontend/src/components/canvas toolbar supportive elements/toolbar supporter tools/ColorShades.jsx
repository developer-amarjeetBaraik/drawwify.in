import React from 'react'
import style from './ColorShades.module.css'

const ColorShades = ({selectedColorTab}) => {

  return (
    <div className={style.colorShadesDiv}>
      <button className={style.colorBtn} style={{border:`1px solid rgb(219, 60, 124)`,backgroundColor:`${selectedColorTab === 'pastel'?'var(--color-tool-first-transparent)':(selectedColorTab==='bold' || selectedColorTab==='others')?'var(--color-tool-first-solid)':selectedColorTab==='outline'?'var(--canvas-color)':null}`}}></button>
      <button className={style.colorBtn} style={{border:`1px solid var(--color-tool-second-solid)`,backgroundColor:`${selectedColorTab === 'pastel'?'var(--color-tool-second-transparent)':(selectedColorTab==='bold' || selectedColorTab==='others')?'var(--color-tool-second-solid)':selectedColorTab==='outline'?'var(--canvas-color)':null}`}}></button>
      <button className={style.colorBtn} style={{border:`1px solid var(--color-tool-third-solid)`,backgroundColor:`${selectedColorTab === 'pastel'?'var(--color-tool-third-transparent)':(selectedColorTab==='bold' || selectedColorTab==='others')?'var(--color-tool-third-solid)':selectedColorTab==='outline'?'var(--canvas-color)':null}`}}></button>
      <button className={style.colorBtn} style={{border:`1px solid var(--color-tool-fourth-solid)`,backgroundColor:`${selectedColorTab === 'pastel'?'var(--color-tool-fourth-transparent)':(selectedColorTab==='bold' || selectedColorTab==='others')?'var(--color-tool-fourth-solid)':selectedColorTab==='outline'?'var(--canvas-color)':null}`}}></button>
      <button className={style.colorBtn} style={{border:`1px solid var(--color-tool-fifth-solid)`,backgroundColor:`${selectedColorTab === 'pastel'?'var(--color-tool-fifth-transparent)':(selectedColorTab==='bold' || selectedColorTab==='others')?'var(--color-tool-fifth-solid)':selectedColorTab==='outline'?'var(--canvas-color)':null}`}}></button>
      <button className={style.colorBtn} style={{border:`1px solid var(--color-tool-sixth-solid)`,backgroundColor:`${selectedColorTab === 'pastel'?'var(--color-tool-sixth-transparent)':(selectedColorTab==='bold' || selectedColorTab==='others')?'var(--color-tool-sixth-solid)':selectedColorTab==='outline'?'var(--canvas-color)':null}`}}></button>
      <button className={style.colorBtn} style={{border:`1px solid var(--color-tool-seventh-solid)`,backgroundColor:`${selectedColorTab === 'pastel'?'var(--color-tool-seventh-transparent)':(selectedColorTab==='bold' || selectedColorTab==='others')?'var(--color-tool-seventh-solid)':selectedColorTab==='outline'?'var(--canvas-color)':null}`}}></button>
      <button className={style.colorBtn} style={{border:`1px solid var(--color-tool-eighth-solid)`,backgroundColor:`${selectedColorTab === 'pastel'?'var(--color-tool-eighth-transparent)':(selectedColorTab==='bold' || selectedColorTab==='others')?'var(--color-tool-eighth-solid)':selectedColorTab==='outline'?'var(--canvas-color)':null}`}}></button>
      <button className={style.colorBtn} style={{border:`1px solid var(--color-tool-ninth-solid)`,backgroundColor:`${selectedColorTab === 'pastel'?'var(--color-tool-ninth-transparent)':(selectedColorTab==='bold' || selectedColorTab==='others')?'var(--color-tool-ninth-solid)':selectedColorTab==='outline'?'var(--canvas-color)':null}`}}></button>
    </div>
  )
}

export default ColorShades
