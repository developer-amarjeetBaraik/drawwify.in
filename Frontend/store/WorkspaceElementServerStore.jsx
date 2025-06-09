import React, { createContext } from 'react'

export const workspaceElementServerContext = createContext({
    fetchAllElements: () => { },
    createNewElementOnServer: () => { },
})

const WorkspaceElementServerStore = ({ children, slug }) => {
    // fetch all elements from server
    const fetchAllElements = async (callback) => {

        try {
            let res = await fetch(`/api/workspace-element/get-all?slug=${slug}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            res = await res.json()
            // console.log(res.elements)
            const elementsArrr = res.elements.map((el) => (
                {
                    id: el.elementId,
                    type: el.type,
                    ...el.properties
                }
            ))
            callback(elementsArrr, null)
        } catch (error) {
            console.log(error)
            callback(null, error)
        }

    }

    // create new elements
    const createNewElementOnServer = async (newElement, callback) => {
        const elementType = newElement.elementType
        const { canvasRef, id, savedStatus, ...properties } = newElement

        try {
            let res = await fetch('/api/workspace-element/create-new', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workspaceId: slug, elementType, properties })
            })

            res = await res.json()
            console.log('server response')
            const newObj = {
                id: res.elementId,
                type: res.type,
                ...res.properties
            }

            callback(newObj, null)
        } catch (error) {
            callback(null, error)
            console.log(error)
        }

    }


    return (
        <workspaceElementServerContext.Provider value={{ fetchAllElements, createNewElementOnServer }}>
            {children}
        </workspaceElementServerContext.Provider>
    )
}

export default WorkspaceElementServerStore
