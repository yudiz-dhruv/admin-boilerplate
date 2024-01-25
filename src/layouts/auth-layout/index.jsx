import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Col, Spinner } from 'react-bootstrap';
import DoctorCharacter from 'assets/images/DoctorCharacter';

function AuthLayout ({ children }) {
  return (
    <div className='auth-main'>
      <div className='child-box-second row'>
        <Col xl={6} lg={6} md={6} sm={12} className='side-logo'>
          <div className='logo-container'>
            <DoctorCharacter />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} className='login-form-container'>
          {/* <Suspense
            fallback={
              <Spinner animation='border' variant='primary' />
            }> */}
          {children}
          {/* </Suspense> */}
        </Col>
      </div>
    </div>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthLayout
