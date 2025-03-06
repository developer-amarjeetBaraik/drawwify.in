import React, { createContext } from 'react'

export const mouseEventsOnCanvasContext = createContext({
  selectElement: () => { },
})

const CanvasAllMouseAndKeyEventsStore = ({ children }) => {
  const selectElement = ()=>{

  }
  return (
    <mouseEventsOnCanvasContext.Provider value={{selectElement}}>
      {children}
    </mouseEventsOnCanvasContext.Provider>
  )
}

export default CanvasAllMouseAndKeyEventsStore
