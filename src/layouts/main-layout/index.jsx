import React, { Suspense, useState } from 'react'
import PropTypes from 'prop-types'

import Header from 'shared/components/Header'
import SideBar from 'shared/components/Sidebar'
import Breadcrumbs from 'shared/components/Breadcrumb'
import useMediaQuery from 'shared/hooks/useMediaQuery'
import { Spinner } from 'react-bootstrap'

function MainLayout ({ children }) {
  const [isOpen, setIsOpen] = useState(true)
  const width = useMediaQuery('(max-width: 800px)')
  return (
    <div className='main-layout'>
      <Header />
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`main-container ${width ? !isOpen && 'active' : isOpen && 'active'}`}>
        <div className='container-fluid'>
          <Breadcrumbs />
          <Suspense fallback={
            <Spinner animation='border' size='sm' variant='primary' />}>{children}</Suspense>
        </div>
      </div>
    </div>
  )
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired
}
export default MainLayout
