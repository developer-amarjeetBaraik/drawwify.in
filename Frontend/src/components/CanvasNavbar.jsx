import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import style from './CanvasNavbar.module.css'
import styleFromWorkSpace from '../pages/Workspace.module.css'
import { navbarContext } from '../../store/CanvasNavbarStore'

//importing images
import logo from '../assets/your-board-logo.png'
import { drawCanvasContext } from '../../store/CanvasDrowStore'

const CanvasNavbar = () => {

  const { canvasTitle, changeCanvasTitle } = useContext(navbarContext)
  const { bottomCanvasRef, storeItemFromSelectedElementsToMainElements } = useContext(drawCanvasContext)

  const handleTitleKeyDown = (event) => {
    if (event.code === "Enter") {
      event.preventDefault();
      changeCanvasTitle(event.target.innerHTML)
    }
  }

  const downloadImage = (event) => {
    if (!event.target.attributes.disabled) {
      storeItemFromSelectedElementsToMainElements()
      const canvas = bottomCanvasRef.current
      const ctx = canvas.getContext('2d')
      const imagedata = canvas.toDataURL("image/png")

      // Create a temporary anchor to trigger download
      const link = document.createElement("a");
      link.href = imagedata;
      link.download = `${canvasTitle}-drawwify.png`; // <-- Set your custom file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      event.target.setAttribute('disabled', true)
      event.target.style.cursor = 'not-allowed'
    }
  }

  return (
    <div className={`${style.canvasNavbarDiv} ${styleFromWorkSpace.workspaceSupportingElement}`}>
      <div className={style.navbarLeft}>
        <NavLink to={'/'}>
          <img src={logo} alt="" id={style.canvasNavbarLogo} />
        </NavLink>
        <div id={style.canvasTital} suppressContentEditableWarning contentEditable onKeyDown={handleTitleKeyDown}>
          {canvasTitle}
        </div>
        {/* three dot svg icon */}
        <span>
          <svg width="14" height="4" viewBox="0 0 14 4" xmlns="http://www.w3.org/2000/svg" className=""><path d="M2 .333C1.083.333.333 1.083.333 2S1.083 3.667 2 3.667 3.667 2.917 3.667 2 2.917.333 2 .333zm10 0c-.917 0-1.667.75-1.667 1.667s.75 1.667 1.667 1.667 1.667-.75 1.667-1.667S12.917.333 12 .333zm-5 0c-.917 0-1.667.75-1.667 1.667S6.083 3.667 7 3.667 8.667 2.917 8.667 2 7.917.333 7 .333z" fill="white"></path></svg>
        </span>
      </div>
      <div className={style.navbarRight}>
        <a href='#' onClick={downloadImage} className='bg-accentLight p-2 border-[1px] border-white rounded-sm cursor-pointer'>
          Download image
        </a>
      </div>
    </div>
  )
}

export default CanvasNavbar
