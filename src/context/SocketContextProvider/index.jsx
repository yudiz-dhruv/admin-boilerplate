import React from 'react'
import SocketContext from 'context/SocketContext'

const SocketContextProvider = ({ children, socket }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider
