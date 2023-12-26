import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import { Button, Spinner } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

export default function CustomModal({
  open,
  handleConfirm,
  confirmValue,
  handleClose,
  title,
  bodyTitle,
  children,
  isLoading,
  disableHeader,
  className,
  fullscreen = false,
  size = 'md',
  singleButton,
  disableFooter,
  setSingleButtonEvent,
  ...props
}) {
  return (
    <Modal
      show={open}
      onHide={handleClose}
      size={size || ''}
      centered
      animation
      dialogClassName={className || 'modal-100w'}
      fullscreen={fullscreen}
      className={`common-modal`}
      {...props}
    >
      {!disableHeader && (
        <Modal.Header closeButton>
          <span className='modal-title' style={{ fontWeight: 'bold' }}>
            {title}
          </span>
        </Modal.Header>
      )}
      <Modal.Body style={{ maxWidth: '100%' }}>
        <h3 style={{ textAlign: 'center' }}>{bodyTitle}</h3>
        {children}
        {!disableFooter && (
          <Modal.Footer>
            {!singleButton ? (
              <>
                <Button variant='secondary' onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant='primary' onClick={() => handleConfirm(confirmValue)} disabled={isLoading}>
                  <FormattedMessage id='confirm' /> {isLoading && <Spinner animation='border' size='sm' />}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  handleClose()
                }}
              >
                Okay
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal.Body>
    </Modal>
  )
}

CustomModal.propTypes = {
  open: PropTypes.bool,
  isLoading: PropTypes.bool,
  fullscreen: PropTypes.bool,
  disableHeader: PropTypes.bool,
  handleConfirm: PropTypes.func,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.node,
  bodyTitle: PropTypes.node,
  size: PropTypes.string,
  className: PropTypes.string
}
