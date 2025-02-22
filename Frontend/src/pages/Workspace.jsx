import React from 'react'
import Canvas from '../components/Canvas'
import CanvasNavbar from '../components/CanvasNavbar'
import CanvasNavbarStore from '../../store/CanvasNavbarStore'
import CanvasSidebar from '../components/CanvasSidebar'
import CanvasToolbar from '../components/CanvasToolbar'

const Workspace = () => {
  document.title = "Workspace"
  return (
    <>
    {/* Canvas navbar */}
      <CanvasNavbarStore>
        <CanvasNavbar />
      </CanvasNavbarStore>
      {/* Canvas sidebar */}
      <CanvasSidebar/>
      {/* Canvas */}
      <Canvas />
      {/* Canvas toolbar */}
      <CanvasToolbar/>
    </>
  )
}

export default Workspace
