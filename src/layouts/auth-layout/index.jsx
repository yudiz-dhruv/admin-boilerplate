import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import wallpaperLogin from '../../assets/images/wallpaper.jpg';
import { Col, Spinner } from 'react-bootstrap';
import textLogo from 'assets/images/vivid-vision-logo.png'

function AuthLayout ({ children }) {
  return (
    <div className='auth-main'>
      <div className='child-box-second row'>
        <Col xl={6} lg={6} md={6} sm={12} className='side-logo'>
          <div className='logo-container'>
            <img src={textLogo} className="textLogo" alt='Yantra Healthcare' />
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
