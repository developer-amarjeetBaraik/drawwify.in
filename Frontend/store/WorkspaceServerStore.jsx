import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const workspaceServerContext = createContext({
  workspaces: [],
  checkWorkspaceOwnership: () => { },
  fetchAllWorkspaces: () => { },
  createNewWorkpace: () => { },
  deleteWorkspace: () => { },
})

const WorkspaceServerStore = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([])
  const navigate = useNavigate()

  // check workspace ownership
  const checkWorkspaceOwnership = (projectId) => {
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

  // fetch all worksapce
  const fetchAllWorkspaces = () => {
    fetch('/api/workspace/all-projects', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(res => {
        setWorkspaces(res)
      })
      .catch(err => console.log(err))
  }

  // create new workspace
  const createNewWorkpace = () => {
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

  // delete workspace
  const deleteWorkspace = async (workspaceId, createrId, callback) => {
    try {
      let res = await fetch(`/api/workspace/delete-project?workspaceId=${workspaceId}&createrId=${createrId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        }
      })
      res = await res.json()
      if(res.isDeleted){
        setWorkspaces(res.updatedProjectList)
        callback(res.isDeleted, null)
      }else{
        callback(null, res.message)
      }
    } catch (error) {
      console.log(error.message)
      callback(null, error.message)
    }
  }

  return (
    <workspaceServerContext.Provider value={{ workspaces, checkWorkspaceOwnership, fetchAllWorkspaces, createNewWorkpace, deleteWorkspace }}>
      {children}
    </workspaceServerContext.Provider>
  )
}

export default WorkspaceServerStore