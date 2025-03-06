import React from 'react'
import style from './Workspace.module.css'
import Canvas from '../components/Canvas'
import CanvasNavbar from '../components/CanvasNavbar'
import CanvasNavbarStore from '../../store/CanvasNavbarStore'
import CanvasSidebar from '../components/CanvasSidebar'
import CanvasToolbar from '../components/CanvasToolbar'
import CanvasToolbarStore from '../../store/CanvasToolbarStore'
import CanvasSidebarStore from '../../store/CanvasSidebarStore'
import CanvasDrowStore from '../../store/CanvasDrowStore'
import ElementStore from '../../store/ElementStore'
import CanvasAllMouseAndKeyEventsStore from '../../store/CanvasAllMouseAndKeyEventsStore'

const Workspace = () => {
  document.title = "Workspace"
  return (
    <>
      {/* Canvas navbar */}
      <CanvasNavbarStore>
        <CanvasNavbar />
      </CanvasNavbarStore>

      {/* prodive context of elements and all */}
      <ElementStore>
        {/* provide context of toolbar related things */}
        <CanvasToolbarStore>
          {/* provide context of sidebar related things */}
          <CanvasSidebarStore>

            {/* Canvas sidebar */}
            <CanvasSidebar />

            {/* provide context of mouse events on canvas */}
            <CanvasAllMouseAndKeyEventsStore>
              {/* provide context to draw on canvas */}
              <CanvasDrowStore>
                {/* Canvas */}
                <Canvas />
              </CanvasDrowStore>
            </CanvasAllMouseAndKeyEventsStore>

            {/* Canvas toolbar */}
            <CanvasToolbar />
          </CanvasSidebarStore>
        </CanvasToolbarStore>
      </ElementStore>
    </>
  )
}

export default Workspace