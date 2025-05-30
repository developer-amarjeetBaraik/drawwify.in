import ServerRequestStore from '../store/ServerRequestStore'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Workspace from './pages/Workspace'

function App() {

  return (
    <>
      <ServerRequestStore>
        <Home />
        <Login />
        <Workspace />
      </ServerRequestStore>
    </>
  )
}

export default App
