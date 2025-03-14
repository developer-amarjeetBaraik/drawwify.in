import React, { useEffect, useState } from 'react'
import style from './PencilAndEraser.module.css'
import Pencil from './toolbar supporter tools/Pencil'
import Eraser from './toolbar supporter tools/Eraser'
import Color from './Color'
import PencilPointerThickness from './toolbar supporter tools/PencilPointerThickness'
import EraserPointerThickness from './toolbar supporter tools/EraserPointerThickness'

const PencilAndEraser = () => {
  const [selectedElement, setSelectedElement] = useState('pencil')

  return (
    <div className={style.pencilAndEraserHolderDiv}>
      <Pencil selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
      <Eraser selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
      {(selectedElement === 'pencil') ? <>
        <Color />
        <PencilPointerThickness />
      </> : null}
      {(selectedElement === 'eraser') ? <EraserPointerThickness/> : null}
    </div>
  )
}

export default PencilAndEraser
