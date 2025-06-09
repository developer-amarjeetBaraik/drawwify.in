import Canvas from '../components/Canvas'
import CanvasNavbar from '../components/CanvasNavbar'
import CanvasNavbarStore from '../../store/CanvasNavbarStore'
import CanvasSidebar from '../components/CanvasSidebar'
import CanvasToolbar from '../components/CanvasToolbar'
import CanvasToolbarStore from '../../store/CanvasToolbarStore'
import CanvasSidebarStore from '../../store/CanvasSidebarStore'
import CanvasDrowStore from '../../store/CanvasDrowStore'
import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { workspaceServerContext } from '../../store/WorkspaceServerStore'
import WorkspaceElementServerStore from '../../store/WorkspaceElementServerStore'

const Workspace = () => {
  document.title = "Workspace"
  const { checkProjectOwnership } = useContext(workspaceServerContext)
  const { slug } = useParams()

  // check project ownership by project id 
  useEffect(() => {
    checkProjectOwnership(slug)
  }, [slug])

  return (
    <>
      {/* Canvas navbar */}
      <CanvasNavbarStore>
        <CanvasNavbar />
      </CanvasNavbarStore>

      {/* server operation context only for workspace elements */}
      <WorkspaceElementServerStore slug={slug}>

        {/* provide context of toolbar related things */}
        <CanvasToolbarStore>
          {/* provide context of sidebar related things */}
          <CanvasSidebarStore>

            {/* Canvas sidebar */}
            <CanvasSidebar />

            {/* provide context to draw on canvas */}
            <CanvasDrowStore>
              {/* Canvas */}
              <Canvas slug={slug} />
            </CanvasDrowStore>

            {/* Canvas toolbar */}
            <CanvasToolbar />
          </CanvasSidebarStore>
        </CanvasToolbarStore>
      </WorkspaceElementServerStore>
    </>
  )
}

export default Workspace