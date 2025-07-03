import Canvas from '../components/Canvas'
import CanvasNavbar from '../components/CanvasNavbar'
import CanvasNavbarStore from '../../store/CanvasNavbarStore'
import CanvasSidebar from '../components/CanvasSidebar'
import CanvasToolbar from '../components/CanvasToolbar'
import CanvasToolbarStore from '../../store/CanvasToolbarStore'
import CanvasSidebarStore from '../../store/CanvasSidebarStore'
import CanvasDrowStore from '../../store/CanvasDrowStore'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { workspaceServerContext } from '../../store/WorkspaceServerStore'
import WorkspaceElementServerStore from '../../store/WorkspaceElementServerStore'
import { userAuthContext } from '../../store/UserAuthStore'

const Workspace = () => {
  document.title = "Workspace"
  const { authenticated } = useContext(userAuthContext)
  const { checkWorkspaceOwnership } = useContext(workspaceServerContext)
  const { slug } = useParams()
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const [canvasReadingModeOnly, setCanvasReadingModeOnly] = useState(true)

  // check project ownership by project id 
  useEffect(() => {
    checkWorkspaceOwnership(slug)
  }, [slug])

  useEffect(() => {
    if (windowHeight < 200 || windowWidth < 1000) {
      console.log(windowHeight, windowWidth)
      setCanvasReadingModeOnly(true)
      toast('Canvas is in reading mode only due to small screen')
    }else{
      setCanvasReadingModeOnly(false)
    }
  }, [windowHeight, windowWidth])


  return (
    <>

      {/* server operation context only for workspace elements */}
      <WorkspaceElementServerStore slug={slug}>

        {/* provide context of toolbar related things */}
        <CanvasToolbarStore>
          {/* provide context of sidebar related things */}
          <CanvasSidebarStore>

            {/* Canvas sidebar */}
            {canvasReadingModeOnly ? null : <CanvasSidebar />}
            {/* provide context to draw on canvas */}
            <CanvasDrowStore>

              {/* Canvas navbar */}
              <CanvasNavbarStore>
                <CanvasNavbar />
              </CanvasNavbarStore>
              {/* Canvas */}
              <Canvas slug={slug} />

              {/* Canvas toolbar */}
              {canvasReadingModeOnly ? null : <CanvasToolbar />}
            </CanvasDrowStore>
          </CanvasSidebarStore>
        </CanvasToolbarStore>
      </WorkspaceElementServerStore>
    </>
  )
}

export default Workspace