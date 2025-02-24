import React from 'react'
import style from './CanvasToolbar.module.css'
import Color from './canvas toolbar supportive elements/Color'
import LineStyle from './canvas toolbar supportive elements/LineStyle'
import TextOrCodeBtn from './canvas toolbar supportive elements/TextOrCodeBtn'
import FontSize from './canvas toolbar supportive elements/FontSize'
import Typography from './canvas toolbar supportive elements/Typography'
import LineType from './canvas toolbar supportive elements/LineType'
import ArrowSide from './canvas toolbar supportive elements/ArrowSide'
import DashLine from './canvas toolbar supportive elements/DashLine'
import Pencil from './canvas toolbar supportive elements/Pencil'
import Eraser from './canvas toolbar supportive elements/Eraser'
import PencilPointerThickness from './canvas toolbar supportive elements/PencilPointerThickness'

const CanvasToolbar = () => {
  return (
    <div className={style.toolbarDiv}>
      <div className={style.toolbarButtonHolderDiv}>

      {/* for text block */}
        <Color/>
        <LineStyle/>
        <TextOrCodeBtn/>
        <FontSize/>
        <Typography/>
        <LineType/>
        <ArrowSide/>
        <DashLine/>
        <Pencil/>
        <Eraser/>
        <PencilPointerThickness/>
      {/* for shapes block */}


      {/* for arrow block */}


      {/* for line block */}


      {/* for drow block */}


      {/* for drow pancil block */}


      </div>
    </div>
  )
}

export default CanvasToolbar
