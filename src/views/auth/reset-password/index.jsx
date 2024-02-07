import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { PASSWORD } from 'shared/constants'
import { validationErrors } from 'shared/constants/ValidationErrors'
import { useMutation } from 'react-query'
import { resetPassWord } from 'query/auth/auth.query'
import { useNavigate, useParams } from 'react-router-dom'
import { checkToken } from 'query/profile/profile.query'
import NotFound from 'shared/components/404'
import textLogo from 'assets/images/Yantra.Care.svg'
import { Zoom, toast } from 'react-toastify'

function ResetPassword () {
  const navigate = useNavigate()
  const { token } = useParams()

  const [showPassword, setShowPassword] = useState({ newPassword: true, confirmPassword: true })
  const sNewPassword = useRef({})
  // const [timer, setTimer] = useState(true)
  // const [timerValue, setTimerValue] = useState(30)

  const [tokneWrong, setTokenWrong] = useState(false)

  // useEffect(() => {
  //   if (timer) {
  //     const timerId = setTimeout(() => {
  //       setTimerValue((prev) => (prev > 0 ? prev - 1 : prev))
  //     }, 1000)

  //     if (timerValue === 0) {
  //       setTimer(false)
  //     }

  //     return () => clearTimeout(timerId)
  //   }
  // }, [timerValue])

  // const { mutate: tokenMutation, isLoading: tokenLoading } = useMutation(checkToken, {
  //   onError: () => {
  //     setTokenWrong(true)
  //   }
  // })

  // useEffect(() => {
  //   tokenMutation({ sVerifyToken: token })
  // }, [token])

  const {
    control,
    register: fields,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors
  } = useForm({ mode: 'all' })
  sNewPassword.current = watch('sNewPassword')

  function handlePasswordToggle (name) {
    if (name === 'newPassword') {
      setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })
    } else {
      setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })
    }
  }

  const { mutate, isLoading } = useMutation(resetPassWord, {
    onSuccess: (response) => {
      navigate('/login')
      toast.success(response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Zoom,
      })
    }
  })

  function onSubmit (data) {
    mutate({ sNewPassword: data?.sNewPassword, sConfirmPassword: data?.sConfirmNewPassword, token })
  }

  useEffect(() => {
    document.title = 'Reset Password'
  }, [])

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)} className='login-form'>
      <div className='yantra-logo'>
        <img src={textLogo} className="textLogo" alt='Yantra Healthcare' />
      </div>
      <div className='title-b mt-5'>
        <h2 className='title'>
          <FormattedMessage id='resetPassword' />
        </h2>
      </div>
      <div className='line'></div>
      {tokneWrong ? (
        <div className='reset_expire'>
          <h5>Your Reset Password Link is expired</h5>
          <NotFound />
        </div>
      ) : (
        <>
          {/* <Form.Group className='form-group'>
            <Form.Label>
              <FormattedMessage id='OTP' />
            </Form.Label>
            <InputGroup>
              <Form.Control
                type={'text'}
                required
                name='sAuthCode'
                placeholder='Enter One Time Password'
                className={errors.sAuthCode && 'error'}
                {...fields('sAuthCode', {
                  required: 'OTP field is required.',
                  pattern: {
                    value: OTP,
                    message: 'Invalid! OTP. Provide a valid OTP number.'
                  },
                  maxLength: { value: 4, message: 'OTP must be of 4 digits.' },
                  minLength: { value: 4, message: 'OTP must be of 4 digits.' },
                  onChange: (e) => {
                    e.target.value = e?.target?.value?.trim()
                  }
                })}
              />
            </InputGroup>
            {'0:0:' + timerValue}
            {errors.sAuthCode && <Form.Control.Feedback type='invalid'>{errors.sAuthCode.message}</Form.Control.Feedback>}
          </Form.Group> */}

          <Form.Group className='form-group'>
            <Form.Label>
              <FormattedMessage id='newPassword' />
            </Form.Label>
            <InputGroup>
              <Controller
                name='sNewPassword'
                control={control}
                render={({ field: { ref, value, onChange } }) => (
                  <Form.Control
                    className={`form-control ${errors.sNewPassword && 'error'}`}
                    placeholder='Enter your new password'
                    type={showPassword?.newPassword ? 'password' : 'text'}
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
                  required: 'New Password is required.',
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
              <Button onClick={() => handlePasswordToggle('newPassword')} variant='link' className='icon-right'>
                <i className={!showPassword.newPassword ? 'icon-visibility' : 'icon-visibility-off'}></i>
              </Button>
            </InputGroup>
            {errors.sNewPassword && <Form.Control.Feedback type='invalid'>{errors.sNewPassword.message}</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className='form-group'>
            <Form.Label>
              <FormattedMessage id='confirmNewPassword' />
            </Form.Label>
            <InputGroup>
              <Controller
                name='sConfirmNewPassword'
                control={control}
                render={({ field: { ref, value, onChange } }) => (
                  <Form.Control
                    className={`form-control ${errors.sConfirmNewPassword && 'error'}`}
                    placeholder='Enter same new password'
                    type={showPassword?.confirmPassword ? 'password' : 'text'}
                    name='sConfirmNewPassword'
                    ref={ref}
                    value={value}
                    onChange={(e) => {
                      e.target.value = e.target.value?.trim();
                      onChange(e);
                    }}
                  />
                )}
                rules={{
                  required: 'Confirm password is required.',
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
                  validate: (value) => value !== sNewPassword.current ? 'Password does not match.' : clearErrors('sConfirmPassword')
                }}
              />
              <Button onClick={() => handlePasswordToggle('confirmPassword')} variant='link' className='icon-right'>
                <i className={!showPassword.confirmPassword ? 'icon-visibility' : 'icon-visibility-off'}></i>
              </Button>
            </InputGroup>
            {errors.sConfirmNewPassword && (
              <Form.Control.Feedback type='invalid'>{errors.sConfirmNewPassword.message}</Form.Control.Feedback>
            )}
          </Form.Group>

          <div className='button-section'>
            <Row>
              <Col sm={12}>
                <Button variant='primary' type='submit' disabled={isLoading} className='login-btn me-2'>
                  <FormattedMessage id='reset' /> {isLoading && <Spinner animation='border' size='sm' />}
                </Button>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Form>
  )
}
export default ResetPassword
