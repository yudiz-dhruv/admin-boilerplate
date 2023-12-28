import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Row, Col, Button, InputGroup, Spinner } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

import { validationErrors } from 'shared/constants/ValidationErrors'
import { PASSWORD } from 'shared/constants'
import { useMutation } from 'react-query'
import { changePassWord } from 'query/auth/auth.query'
import { toaster } from 'helper/helper'
import { useNavigate } from 'react-router-dom'
import Wrapper from 'shared/components/Wrap'
import { route } from 'shared/constants/AllRoutes'

export default function ChangePassword () {
  const [showCurrentPassword, setShowCurrentPassword] = useState(true)
  const [showNewPassword, setShowNewPassword] = useState(true)
  const [showConfirmPassword, setConfirmPassword] = useState(true)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors
  } = useForm({
    mode: 'all'
  })
  const sNewPassword = useRef({})
  sNewPassword.current = watch('sNewPassword')

  useEffect(() => {
    document.title = 'Change Password'
  }, [])

  const { mutate, isLoading } = useMutation(changePassWord, {
    onSuccess: (response) => {
      toaster(response?.data?.message)
      localStorage.clear()
      navigate('/login')
    }
  })

  const onSubmit = (data) => {
    mutate({
      sNewPassword: data.sConfirmPassword,
      sOldPassword: data.sCurrentPassword
    })
  }

  const handleCurrentPasswordToggle = () => {
    setShowCurrentPassword(!showCurrentPassword)
  }
  const handleNewPasswordToggle = () => {
    setShowNewPassword(!showNewPassword)
  }
  const handleConfirmPasswordToggle = () => {
    setConfirmPassword(!showConfirmPassword)
  }
  return (
    <>
      <Row className='justify-content-center'>
        <Col xxl={4} xl={8} md={10} sm={12}>
          <Wrapper Wrapper>
            <Form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className='form-group'>
                <Form.Label>
                  <FormattedMessage id='currentPassword' />
                  <span className='inputStar'>*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    className={`form-control ${errors.sCurrentPassword && 'error'}`}
                    type={showCurrentPassword ? 'password' : 'text'}
                    name='sCurrentPassword'
                    onPaste={(e) => {
                      e.preventDefault()
                      return false
                    }}
                    placeholder='Enter your current password'
                    {...register('sCurrentPassword', {
                      required: {
                        value: true,
                        message: validationErrors.currentPasswordRequired
                      },
                      pattern: {
                        value: PASSWORD,
                        message: 'Provide a valid Password.'
                      },
                      maxLength: { value: 15, message: validationErrors.rangeLength(8, 15) },
                      minLength: { value: 8, message: validationErrors.rangeLength(8, 15) },
                      onChange: (e) => {
                        e.target.value = e?.target?.value?.trim()
                      }
                    })}
                  />
                  <Button
                    onClick={handleCurrentPasswordToggle}
                    variant='link'
                    className='icon-right'
                  >
                    <i
                      className={
                        showCurrentPassword
                          ? 'icon-visibility'
                          : 'icon-visibility-off'
                      }
                    ></i>
                  </Button>
                </InputGroup>
                {errors.sCurrentPassword && (
                  <Form.Control.Feedback type='invalid'>
                    {errors.sCurrentPassword.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className='form-group'>
                <Form.Label>
                  <FormattedMessage id='newPassword' />
                  <span className='inputStar'>*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    className={`form-control ${errors.sNewPassword && 'error'}`}
                    onPaste={(e) => {
                      e.preventDefault()
                      return false
                    }}
                    placeholder='Enter new password'
                    type={showNewPassword ? 'password' : 'text'}
                    name='sNewPassword'
                    {...register('sNewPassword', {
                      required: {
                        value: true,
                        message: validationErrors.newPasswordRequired
                      },
                      pattern: {
                        value: PASSWORD,
                        message: 'Provide a valid Password.'
                      },
                      maxLength: {
                        value: 12,
                        message: validationErrors.rangeLength(8, 12)
                      },
                      minLength: {
                        value: 8,
                        message: validationErrors.rangeLength(8, 12)
                      }
                    })}
                    onChange={(e) => {
                      e.target.value = e.target.value?.trim()
                    }}
                  />
                  <Button
                    onClick={handleNewPasswordToggle}
                    variant='link'
                    className='icon-right'
                  >
                    <i
                      className={
                        showNewPassword
                          ? 'icon-visibility'
                          : 'icon-visibility-off'
                      }
                    ></i>
                  </Button>
                </InputGroup>
                {errors.sNewPassword && (
                  <Form.Control.Feedback type='invalid'>
                    {errors.sNewPassword.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className='form-group'>
                <Form.Label>
                  <FormattedMessage id='confirmNewPassword' />
                  <span className='inputStar'>*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    className={`form-control ${errors.sConfirmPassword && 'error'}`}
                    onPaste={(e) => {
                      e.preventDefault()
                      return false
                    }}
                    placeholder='Enter same new password'
                    type={showConfirmPassword ? 'password' : 'text'}
                    name='sConfirmPassword'
                    {...register('sConfirmPassword', {
                      required: {
                        value: true,
                        message: 'Confirm Password is reaquired'
                      },
                      validate: (value) => value !== sNewPassword.current ? 'Password does not match.' : clearErrors('sConfirmPassword'),
                      onChange: (e) => {
                        e.target.value = e?.target?.value?.trim()
                      }
                    })}
                  />
                  <Button
                    onClick={handleConfirmPasswordToggle}
                    variant='link'
                    className='icon-right'
                  >
                    <i
                      className={
                        showConfirmPassword
                          ? 'icon-visibility'
                          : 'icon-visibility-off'
                      }
                    ></i>
                  </Button>
                </InputGroup>
                {errors.sConfirmPassword && (
                  <Form.Control.Feedback type='invalid'>
                    {errors.sConfirmPassword.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Col lg={12} className='d-flex align-items-center justify-content-end mt-3'>
                <div className='top-d-button'>
                  <Button variant='primary' type='submit' className='me-2' disabled={isLoading}>
                    <FormattedMessage id='submit' />{' '}
                    {isLoading && <Spinner animation='border' size='sm' />}
                  </Button>
                  <Button
                    variant='secondary'
                    disabled={isLoading}
                    onClick={() => navigate(route.dashboard)}
                  >
                    Cancel
                  </Button>
                </div>
              </Col>
            </Form>
          </Wrapper>
        </Col>
      </Row>
    </>
  )
}
