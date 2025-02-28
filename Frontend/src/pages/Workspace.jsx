import React from 'react'
import style from './Workspace.module.css'
import Canvas from '../components/Canvas'
import CanvasNavbar from '../components/CanvasNavbar'
import CanvasNavbarStore from '../../store/CanvasNavbarStore'
import CanvasSidebar from '../components/CanvasSidebar'
import CanvasToolbar from '../components/CanvasToolbar'
import CanvasToolbarStore from '../../store/CanvasToolbarStore'
import CanvasSidebarStore from '../../store/CanvasSidebarStore'

const Workspace = () => {
  document.title = "Workspace"
  return (
    <>
      {/* Canvas navbar */}
      <CanvasNavbarStore>
        <CanvasNavbar />
      </CanvasNavbarStore>

      <CanvasToolbarStore>
        <CanvasSidebarStore>

          {/* Canvas sidebar */}
          <CanvasSidebar />

          {/* Canvas */}
          <Canvas />

          {/* Canvas toolbar */}
          <CanvasToolbar />
        </CanvasSidebarStore>
      </CanvasToolbarStore>
    </>
  )
}

export default Workspace