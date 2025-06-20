import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Toaster, toast } from 'sonner'
import { workspaceServerContext } from '../../store/WorkspaceServerStore'
import PopupContainer from '../components/PopupContainer'
import { useNavigate } from 'react-router-dom'
import { userAuthContext } from '../../store/UserAuthStore'



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

    const { authenticated } = useContext(userAuthContext)
    const { workspaces, fetchAllWorkspaces, createNewWorkpace, deleteWorkspace } = useContext(workspaceServerContext)
    const [selectedShortingTab, setSelectedShortingTab] = useState('All')
    const navigate = useNavigate()

    const handleDeleteWorkspace = (workSpaceId, createrId) => {
        deleteWorkspace(workSpaceId, createrId, (res, error) => {
            if (res) {
                toast.success('Workspace deleted', {
                    description: 'deleted successfully'
                })
            } else {
                toast.error('Faild to delete', {
                    description: 'something went wrong'
                })
            }
        })
    }
    useEffect(() => {
        fetchAllWorkspaces()
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
                    <button onClick={createNewWorkpace} className='px-2 w-[130px] h-[45px] rounded-xl border-2 border-glassBorder flex items-center justify-between cursor-pointer'>
                        <svg className='max-w-5 text-white' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                            <path fillRule="evenodd" stroke='white' fill='white' d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                        </svg>
                        New Project
                    </button>
                </div>

                {/* workspaces list */}

                {
                    workspaces.length > 0 ? <div className='w-full min-h-20 px-8 flex flex-col justify-between gap-2.5'>
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
                        {workspaces?.map((item) => (
                            <div key={item.workSpaceId} className='relative flex'>
                                <li key={item.workSpaceId} onClick={() => navigate(`/workspace/${item.workSpaceId}`)} className='px-2.5 w-full min-h-[70px] flex justify-between items-center flex-wrap bg-glass rounded-xl border border-glassBorder cursor-pointer'>
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
                                {/* options button */}
                                <button onClick={() => handleDeleteWorkspace(item.workSpaceId, item.createdBy)} className='p-1.5 absolute top-[50%] -translate-y-[50%] -right-10 rounded-[50%] hover:bg-glassBorder  cursor-pointer'>
                                    <svg className='mx-auto my-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                        <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                        <path d="M9.5 16.5L9.5 10.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                        <path d="M14.5 16.5L14.5 10.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div> : <p className='mt-20 text-center'>You have not created any project yet. <button onClick={createNewWorkpace} className='text-blue-600 underline cursor-pointer'>Create new project</button></p>
                }

            </section>
            <Toaster richColors theme='dark' />

        </div>
    )
}

export default Dashboard
