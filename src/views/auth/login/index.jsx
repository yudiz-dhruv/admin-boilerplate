import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { login } from 'query/auth/auth.query'
import { route } from 'shared/constants/AllRoutes'
import { validationErrors } from 'shared/constants/ValidationErrors'
import { useMutation, useQuery } from 'react-query'
import { toaster } from 'helper/helper'
import { EMAIL } from 'shared/constants'
import { profile } from 'query/profile/profile.query'

function Login () {
  const navigate = useNavigate()

  const {
    register: fields,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onSubmit' })

  const [showPassword, setShowPassword] = useState(true)
  const [isLoginSuccess, setIsLoginSuccess] = useState(false)

  function handlePasswordToggle () {
    setShowPassword(!showPassword)
  }

  const { mutate, isLoading } = useMutation(login, {
    onSettled: (response, err) => {
      if (response) {
        localStorage.setItem('token', response?.headers?.authorization)
        setIsLoginSuccess(true)
      } else {
        toaster(err?.response?.data?.message, 'error')

        setIsLoginSuccess(false)
        reset({
          sEmail: '',
          sPassword: ''
        })
      }
    }
  })

  const { isLoading: profileLoader, isFetching: profileFetching } = useQuery('getProfile', profile, {
    enabled: !!isLoginSuccess,
    select: (data) => data?.data?.data,
    onSuccess: (data) => {
      toaster('Login Successfully', 'success')
      localStorage.setItem('type', data?.eUserType)
      navigate(route.dashboard)
    },
    onError: (data) => {
      toaster('Oops! Something went wrong.', 'error')
      localStorage.removeItem('token')
      reset({
        sEmail: '',
        sPassword: ''
      })
    }
  })

  function onSubmit (data) {
    mutate({ sEmail: data.sEmail, sPassword: data.sPassword })
  }

  useEffect(() => {
    document.title = 'Login'
  }, [])

  return (
    <>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} className='login-form'>
        <div className='title-b'>
          <div className='d-flex align-items-center justify-content-center'>
            <h2 className='title me-2 m-0'>
              <FormattedMessage id='signIn' />
            </h2>
          </div>
        </div>
        <Form.Group className='form-group mt-5'>
          <Form.Label>
            <FormattedMessage id='emailAddress' />
          </Form.Label>
          <Form.Control
            type='text'
            required
            name='sEmail'
            placeholder='Enter your email address'
            autoFocus
            className={errors.sEmail && 'error'}
            {...fields('sEmail', {
              required: { value: true, message: validationErrors.emailRequired },
              pattern: { value: EMAIL, message: 'Invalid Email Format.' }
            })}
          />
          {errors.sEmail && <Form.Control.Feedback type='invalid'>{errors.sEmail.message}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className='form-group'>
          <Form.Label>
            <FormattedMessage id='password' />
          </Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'password' : 'text'}
              required
              // onPaste={(e) => {
              //   e.preventDefault()
              //   return false
              // }}
              name='sPassword'
              placeholder='Enter your password'
              className={errors.sPassword && 'error'}
              {...fields('sPassword', {
                required: { value: true, message: validationErrors.passwordRequired },
                onChange: (e) => {
                  e.target.value = e?.target?.value?.trim()
                }
              })}
            />
            <Button onClick={handlePasswordToggle} variant='link' className='icon-right'>
              <i className={!showPassword ? 'icon-visibility' : 'icon-visibility-off'}></i>
            </Button>
          </InputGroup>
          {errors.sPassword && <Form.Control.Feedback type='invalid'>{errors.sPassword.message}</Form.Control.Feedback>}
        </Form.Group>
        <div className='button-section mb-1'>
          <Button variant='primary' type='submit' disabled={isLoading} className='login-btn'>
            <FormattedMessage id='Login' /> {(isLoading || profileLoader || profileFetching) && <Spinner animation='border' size='sm' />}
          </Button>
        </div>

        <Link to={route.forgotPassword} className='b-link'>
          <FormattedMessage id='forgotPassword' />?
        </Link>
      </Form>
    </>
  )
}

export default Login
