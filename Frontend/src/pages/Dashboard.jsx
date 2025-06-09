import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { workspaceServerContext } from '../../store/WorkspaceServerStore'
import PopupContainer from '../components/PopupContainer'
import { useNavigate } from 'react-router-dom'



const shortBtn = [
    {
        name: "All"
    },
    {
        name: "Recent"
    },
    {
        name: "Created by me"
    }
]

const Dashboard = () => {
    document.title = 'Dashboard'

    const { projects, fetchAllProjects, createNewProject } = useContext(workspaceServerContext)
    const [selectedShortingTab, setSelectedShortingTab] = useState('All')
    const nevigate = useNavigate()

    useEffect(() => {
        fetchAllProjects()
    }, [])

    return (
        <div className='min-h-screen text-white bg-background'>
            <Navbar />

            <section className='max-w-[1200px] mx-auto'>
                <div className='w-full min-h-20 px-8 flex justify-between items-center'>
                    {/* Tabs */}
                    {
                        shortBtn.map((item) => (
                            <button key={item.name} className={`${selectedShortingTab === item.name ? 'border-b-2 border-white' : null}  cursor-pointer`} onClick={() => setSelectedShortingTab(item.name)}>{item.name}</button>
                        ))
                    }
                    {/* CTA button */}
                    <button onClick={createNewProject} className='px-2 w-[130px] h-[45px] rounded-xl border-2 border-glassBorder flex items-center justify-between cursor-pointer'>
                        <svg className='max-w-5 text-white' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                            <path fillRule="evenodd" stroke='white' fill='white' d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                        </svg>
                        New Project
                    </button>
                </div>

                {/* Projects list */}

                {
                    projects.length > 0 ? <div className='w-full min-h-20 px-8 flex flex-col justify-between gap-2.5'>
                        <li className='px-2.5 w-full min-h-[40px] flex justify-between items-center border-b-2 border-glassBorder'>
                            <div>
                                <p className='text-[12px] italic'>Project name</p>
                            </div>
                            <div>
                                <p className='text-[12px] italic'>Project id</p>
                            </div>
                            <div>
                                <p className='text-[12px] italic'>Auther</p>
                            </div>
                        </li>
                        {projects.map((item) => (
                            <li key={item.workSpaceId} onClick={()=> nevigate(`/workspace/${item.workSpaceId}`)} className='px-2.5 w-full min-h-[70px] flex justify-between items-center flex-wrap bg-glass rounded-xl border border-glassBorder cursor-pointer'>
                                <div>
                                    {item.workspaceName}
                                </div>
                                <div>
                                    {item.workSpaceId}
                                </div>
                                <div>
                                    {item.createdBy}
                                </div>
                            </li>
                        ))}
                    </div> : <p className='mt-20 text-center'>You have not created any project yet. <button onClick={createNewProject} className='text-blue-600 underline cursor-pointer'>Create new project</button></p>
                }

            </section>
        </div>
    )
}

export default Dashboard
