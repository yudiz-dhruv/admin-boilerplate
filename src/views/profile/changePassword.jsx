import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
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
    control,
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
      localStorage.removeItem('token')
      localStorage.removeItem('type')
      navigate('/login')
    },
    onError: (err) => {
      navigate('/change-password')
      toaster(err?.response?.data?.message, 'error')
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
                  <Controller
                    name='sCurrentPassword'
                    control={control}
                    render={({ field: { ref, value, onChange } }) => (
                      <Form.Control
                        className={`form-control ${errors.sCurrentPassword && 'error'}`}
                        placeholder='Enter your current password'
                        type={!showCurrentPassword ? 'password' : 'text'}
                        name='sCurrentPassword'
                        ref={ref}
                        value={value}
                        onChange={(e) => {
                          e.target.value = e.target.value?.trim();
                          onChange(e);
                        }}
                      />
                    )}
                    rules={{
                      required: validationErrors.currentPasswordRequired,
                      pattern: {
                        value: PASSWORD,
                        message: 'Your password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                      },
                      maxLength: {
                        value: 12,
                        message: validationErrors.rangeLength(8, 12),
                      },
                      minLength: {
                        value: 8,
                        message: validationErrors.rangeLength(8, 12),
                      },
                    }}
                  />
                  <Button onClick={handleCurrentPasswordToggle} variant='link' className='icon-right'>
                    <i className={showCurrentPassword ? 'icon-visibility' : 'icon-visibility-off'}></i>
                  </Button>
                </InputGroup>
                {errors.sCurrentPassword && (<Form.Control.Feedback type='invalid'>{errors.sCurrentPassword.message}</Form.Control.Feedback>)}
              </Form.Group>

              <Form.Group className='form-group'>
                <Form.Label>
                  <FormattedMessage id='newPassword' />
                  <span className='inputStar'>*</span>
                </Form.Label>
                <InputGroup>
                  <Controller
                    name='sNewPassword'
                    control={control}
                    render={({ field: { ref, value, onChange } }) => (
                      <Form.Control
                        className={`form-control ${errors.sNewPassword && 'error'}`}
                        placeholder='Enter new password'
                        type={!showNewPassword ? 'password' : 'text'}
                        name='sNewPassword'
                        ref={ref}
                        value={value}
                        onChange={(e) => {
                          e.target.value = e.target.value?.trim();
                          onChange(e);
                        }}
                      />
                    )}
                    rules={{
                      required: validationErrors.newPasswordRequired,
                      pattern: {
                        value: PASSWORD,
                        message: 'Your password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                      },
                      maxLength: {
                        value: 12,
                        message: validationErrors.rangeLength(8, 12),
                      },
                      minLength: {
                        value: 8,
                        message: validationErrors.rangeLength(8, 12),
                      },
                    }}
                  />
                  <Button onClick={handleNewPasswordToggle} variant='link' className='icon-right'>
                    <i className={showNewPassword ? 'icon-visibility' : 'icon-visibility-off'}></i>
                  </Button>
                </InputGroup>
                {errors.sNewPassword && (<Form.Control.Feedback type='invalid'>{errors.sNewPassword.message}</Form.Control.Feedback>)}
              </Form.Group>

              <Form.Group className='form-group'>
                <Form.Label>
                  <FormattedMessage id='confirmNewPassword' />
                  <span className='inputStar'>*</span>
                </Form.Label>
                <InputGroup>
                  <Controller
                    name='sConfirmPassword'
                    control={control}
                    render={({ field: { ref, value, onChange } }) => (
                      <Form.Control
                        className={`form-control ${errors.sConfirmPassword && 'error'}`}
                        placeholder='Enter same new password'
                        type={!showConfirmPassword ? 'password' : 'text'}
                        name='sConfirmPassword'
                        ref={ref}
                        value={value}
                        onChange={(e) => {
                          e.target.value = e.target.value?.trim();
                          onChange(e);
                        }}
                      />
                    )}
                    rules={{
                      required: 'Confirm Password is required',
                      pattern: {
                        value: PASSWORD,
                        message: 'Your password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                      },
                      validate: (value) => value !== sNewPassword.current ? 'Password does not match.' : clearErrors('sConfirmPassword'),
                    }}
                  />
                  <Button onClick={handleConfirmPasswordToggle} variant='link' className='icon-right'>
                    <i className={showConfirmPassword ? 'icon-visibility' : 'icon-visibility-off'}></i>
                  </Button>
                </InputGroup>
                {errors.sConfirmPassword && (<Form.Control.Feedback type='invalid'>{errors.sConfirmPassword.message}</Form.Control.Feedback>)}
              </Form.Group>
              <Col lg={12} className='mt-4'>
                <div className='top-d-button'>
                  <Button variant='primary' type='submit' className='me-2 square' disabled={isLoading}>
                    <FormattedMessage id='submit' />{' '}
                    {isLoading && <Spinner animation='border' size='sm' />}
                  </Button>
                  <Button
                    variant='secondary'
                    disabled={isLoading}
                    onClick={() => navigate(route.dashboard)}
                    className='square'
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
