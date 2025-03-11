import React, { useContext, useEffect, useState } from 'react'
import style from './CanvasToolbar.module.css'
import styleFromWorkSpace from '../pages/Workspace.module.css'
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
import { sidebarSelectedBtnContext } from '../../store/CanvasSidebarStore'

const CanvasToolbar = () => {

  const { sidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)

  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(()=>{
    setSelectedItem(sidebarSelectedBtn)
  },[sidebarSelectedBtn])


  return (
    <div className={`${style.toolbarDiv} ${styleFromWorkSpace.workspaceSupportingElement}`}>
      <div className={style.toolbarButtonHolderDiv}>

        {/* for text block */}
        {
          (selectedItem === 'textBtn') ? <>
            <Color />
            <TextOrCodeBtn />
            <FontSize />
            <Typography />
          </> : null
        }

        {/* for shapes block */}
        {
          (selectedItem === 'shape' || selectedItem === 'squareBtn' || selectedItem === 'circleBtn') ? <>
            <Color />
            <LineStyle />
            <FontSize />
            <Typography />
          </> : null
        }

        {/* for arrow block */}
        {
          (selectedItem === 'arrowBtn' || selectedItem === 'arrowDraw') ? <>
            <Color />
            <LineType />
            <LineStyle />
            <ArrowSide />
            <DashLine />
          </> : null
        }

        {/* for line block */}
        {
          (selectedItem === 'lineBtn' || selectedItem === 'lineDraw') ? <>
            <Color />
            <LineType />
            <LineStyle />
            <ArrowSide />
            <DashLine />
          </> : null
        }

        {/* for drow block */}
        {
          (selectedItem === 'drowBtn' || selectedItem === 'pencilDraw') ? <>
            <Color />
            <PencilPointerThickness />
          </> : null
        }

        {/* for drow pancil block */}
        {
          (selectedItem === 'drowPencilBtn') ? <>
            <Pencil />
            <Eraser />
            <Color />
            <PencilPointerThickness />
          </> : null
        }

      </div>
    </div>
  )
}

export default CanvasToolbar
