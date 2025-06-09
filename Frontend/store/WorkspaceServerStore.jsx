import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const workspaceServerContext = createContext({
  projects: [],
  checkProjectOwnership: () => { },
  fetchAllProjects: () => { },
  createNewProject: () => { },
})

const WorkspaceServerStore = ({ children }) => {
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  // check project ownership
  const checkProjectOwnership = (projectId) => {
    fetch('/api/workspace/check-project-ownership', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ projectId })
    }).then(res => {
      if (res.ok) {
        return true
      } else {
        alert("You're Unauthorized for this workspace")
        navigate('/dashboard')
        return
      }
    }).catch(err => console.log(err))
  }

  // fetch all project
  const fetchAllProjects = () => {
    fetch('/api/workspace/all-projects', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(res => {
        setProjects(res)
      })
      .catch(err => console.log(err))
  }

  // create new project
  const createNewProject = () => {
    fetch('/api/workspace/create-project', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json())
      .then((res) => {
        console.log(res)
        navigate(res.path)
      })
      .catch((err) => console.log(err.message))
  }
  return (
    <workspaceServerContext.Provider value={{ projects, checkProjectOwnership, fetchAllProjects, createNewProject }}>
      {children}
    </workspaceServerContext.Provider>
  )
}

export default WorkspaceServerStore
