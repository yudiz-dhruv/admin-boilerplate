import React, { useEffect } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { forgotPassword } from 'query/auth/auth.query'
import { EMAIL } from 'shared/constants'
import { validationErrors } from 'shared/constants/ValidationErrors'
import textLogo from 'assets/images/Yantra.Care Logo.svg'
import { ReactToastify } from 'shared/utils'

function ForgotPassword () {
  const {
    register: fields,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onSubmit' })

  const { mutate, isLoading } = useMutation(forgotPassword, {
    onSuccess: (response) => {
      ReactToastify('Reset Link send successfully. Please check you mail.', 'success')
    }
  })

  function onSubmit (data) {
    mutate({ sEmail: data?.sEmail })
  }

  useEffect(() => {
    document.title = 'Forgot Password | Yantra Healthcare'
  }, [])
  return (
    <>
      <Form noValidate className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='yantra-logo'>
          <img src={textLogo} className="textLogo" alt='Yantra Healthcare' />
        </div>
        <div className='title-b mt-5'>
          <h2 className='title me-2 m-0'>
            <FormattedMessage id='forgotPassword' />
          </h2>
        </div>
        <div className='line'></div>
        <Form.Group className='form-group'>
          <Form.Label>
            <FormattedMessage id='emailAddress' />
          </Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter your registered email address'
            name='sEmail'
            className={errors.sEmail && 'error'}
            {...fields('sEmail', {
              required: { value: true, message: validationErrors.emailRequired },
              pattern: { value: EMAIL, message: validationErrors.email }
            })}
          />
          {errors.sEmail && <Form.Control.Feedback type='invalid'>{errors.sEmail.message}</Form.Control.Feedback>}
        </Form.Group>
        <div className='button-section mb-1'>
          <Button variant='primary' type='submit' disabled={isLoading} className='login-btn mt-3'>
            <FormattedMessage id='submit' /> {isLoading && <Spinner animation='border' size='sm' />}
          </Button>
        </div>

        <Link to={'/login'} className='b-link'>
          <FormattedMessage id='backToLogin' />
        </Link>
      </Form>
    </>
  )
}

export default ForgotPassword
