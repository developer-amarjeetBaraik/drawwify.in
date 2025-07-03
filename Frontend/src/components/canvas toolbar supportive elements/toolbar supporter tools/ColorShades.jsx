import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import style from './ColorShades.module.css'
import { toolbarComponentsValueContext } from '../../../../store/CanvasToolbarStore'
import changeProperties from '../../../services/helperFunctions/changeProperties'

const ColorShades = ({ selectedColorTab }) => {
  const { currPastelColorRef, currBoldColorRef, currOutlineColorRef } = useContext(toolbarComponentsValueContext)
  const {changePropertiesOfSelectedElement} = changeProperties()

  const changePastelColor = (event) => {
    currPastelColorRef.current = getComputedStyle(event.target).backgroundColor
    changePropertiesOfSelectedElement('color', currPastelColorRef.current)
    currBoldColorRef.current = null
  }
  const changeBoldColor = (event) => {
    currBoldColorRef.current = getComputedStyle(event.target).backgroundColor
    changePropertiesOfSelectedElement('color', currBoldColorRef.current)
    currPastelColorRef.current = null
  }
  const changeOutlineColor = (event) => {
    currOutlineColorRef.current = getComputedStyle(event.target).borderColor
    changePropertiesOfSelectedElement('strokeColor', currOutlineColorRef.current)
  }

  const colorShadesBtns = [
    {
      BtnName: 'first',
    },
    {
      BtnName: 'second',
    },
    {
      BtnName: 'third',
    },
    {
      BtnName: 'fourth',
    },
    {
      BtnName: 'fifth',
    },
    {
      BtnName: 'sixth',
    },
    {
      BtnName: 'seventh',
    },
    {
      BtnName: 'eighth',
    },
    {
      BtnName: 'ninth',
    },
  ]
  return (
    <div className='flex flex-wrap gap-1'>
      {
        colorShadesBtns.map(item => (
          <button key={item.BtnName}
            onClick={selectedColorTab === 'Pastel' ? changePastelColor : selectedColorTab === 'Bold' ? changeBoldColor : selectedColorTab === 'Outline' ? changeOutlineColor : null}
            className={clsx(style.colorBtn,
              selectedColorTab === 'Pastel' ? `bg-tool-${item.BtnName}-transparent` : selectedColorTab === 'Bold' ? `bg-tool-${item.BtnName}-solid` : "",
              "border-[1px]",
              `border-tool-${item.BtnName}-solid`,
            )}
          ></button >
        ))
      }
    </div>
  )
}

export default ColorShades
