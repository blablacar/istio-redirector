import React, { useContext } from 'react'

const LayoutContext = React.createContext()

const useLayoutContext = () => useContext(LayoutContext)

export { LayoutContext, useLayoutContext }
