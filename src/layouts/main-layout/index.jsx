import React, { Suspense, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Header from 'shared/components/Header'
import SideBar from 'shared/components/Sidebar'
import Breadcrumbs from 'shared/components/Breadcrumb'
import useMediaQuery from 'shared/hooks/useMediaQuery'
import { Spinner } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { io } from 'socket.io-client'
import SocketContextProvider from 'context/SocketContextProvider'

function MainLayout ({ children }) {
  const [isOpen, setIsOpen] = useState(true)
  const width = useMediaQuery('(max-width: 800px)')

  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  const { data: socket } = useQuery('socketConnection', () => io(process.env.REACT_APP_SOCKET_ENDPOINT, {
    extraHeaders: {
      Authorization: token
    },
  }), {
    enabled: !!token
  })

  useEffect(() => {
    if (!socket?.connected && socket !== undefined) {
      socket?.on("connect_error", (error) => {
        console.log("Connection Error:", error);
      })

      socket.on("disconnect", (reason, details) => {
        if (reason === 'io server disconnect' || reason === 'io client disconnect') {
          socket.connect()
        }
        console.log("Disconnected:", reason, details);
      })

      socket.connect()
    } else {
      console.warn('Socket Connected Successfuly.')
    }
  }, [socket])

  return (
    <div className='main-layout'>
      <SocketContextProvider socket={socket}>
        <Header />
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={`main-container ${width ? !isOpen && 'active' : isOpen && 'active'}`}>
          <div className='container-fluid'>
            <Breadcrumbs />
            <Suspense fallback={
              <div className='d-flex align-items-center justify-content-center top-0 left-0 position-fixed h-100 w-100'>
                <Spinner animation='border' size='sm' variant='success' />
              </div>
            }>{children}</Suspense>
          </div>
        </div>
      </SocketContextProvider>
    </div>
  )
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired
}
export default MainLayout
