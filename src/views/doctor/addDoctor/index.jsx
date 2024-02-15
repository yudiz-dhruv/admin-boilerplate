import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import Wrapper from 'shared/components/Wrap'
import CommonInput from 'shared/components/CommonInput'
import { validationErrors } from 'shared/constants/ValidationErrors'
import { EMAIL, PASSWORD } from 'shared/constants'
import { route } from 'shared/constants/AllRoutes'
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { addAdmin } from 'query/admin/admin.mutation'
import { getGameDropdownList } from 'query/game/game.query'
import { FormattedMessage } from 'react-intl'
import makeAnimated from 'react-select/animated'
import { ReactToastify } from 'shared/utils'

const AddDoctor = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, control, reset, watch, getValues } = useForm({ mode: 'all' })
  const fileInputRef = useRef(null)

  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [showNewPassword, setNewPassword] = useState(false)

  // DROPDOWN GAME LIST
  const { data: eGameDropdown } = useQuery('dropdownGame', getGameDropdownList, { select: (data) => data?.data?.data, })

  // ADD ADMIN
  const { mutate, isLoading } = useMutation(addAdmin, {
    onSuccess: (res) => {
      ReactToastify('New Admin Added Successfully!', 'success')
      navigate(route.admin)
      reset()
    }
  })

  const onSubmit = useCallback((data) => {
    const formData = new FormData()

    if (isButtonDisabled) {
      return;
    }
    setButtonDisabled(true)

    formData.append('sUserName', data?.sUserName || '')
    formData.append('sEmail', data?.sEmail || '')
    formData.append('aGamesName', data?.aGamesName?.map(item => item?.sName) || '')
    formData.append('nPrice', +data?.nPrice || '')
    formData.append('dStartAt', data?.dStartAt?.toISOString() || '')
    formData.append('dEndAt', data?.dEndAt?.toISOString() || '')
    formData.append('sCompanyName', data?.sCompanyName || '')
    formData.append('sAvatar', data?.sAvatar || '')
    formData.append('sPassword', data?.sPassword || '')
    formData.append('sMobile', data?.sMobile || '')

    mutate(formData)

    setTimeout(() => {
      setButtonDisabled(false)
    }, 5000)
  }, [isButtonDisabled, mutate, setButtonDisabled])

  const handleFileInputClick = useCallback(() => (fileInputRef.current) && fileInputRef.current.click(), [])
  const handleNewPasswordToggle = useCallback(() => setNewPassword(!showNewPassword), [showNewPassword, setNewPassword])

  useEffect(() => {
    document.title = 'Add Admin | Yantra Healthcare'
  }, [])

  return (
    <>
      <Form className='step-one' autoComplete='off' onSubmit={handleSubmit(onSubmit)} >
        <div className='personal-details'>
          <div className='game-form'>
            <Row className='justify-content-center'>
              <Col xxl={8}>
                <Wrapper>
                  <Row className='admin-profile-img'>
                    <Col lg={6} md={6} sm={12}>
                      <div className='fileinput'>
                        <div className='inputtypefile'>
                          <div className='inputMSG'>
                            {watch('sAvatar') ? <>
                              <div className="document-preview-group">
                                <div className='img-over' onClick={handleFileInputClick}>Change Profile</div>
                                {(watch('sAvatar')) && (
                                  typeof (watch('sAvatar')) !== 'string'
                                    ? <div className="document-preview"> <img src={URL.createObjectURL(watch('sAvatar'))} alt='altImage' /> </div>
                                    : <div className="document-preview"> <img src={watch('sAvatar')} alt='altImage' /> </div>)
                                }
                              </div>
                            </> : <span><FontAwesomeIcon icon={faCamera} /></span>}
                          </div>
                          <Controller
                            name={`sAvatar`}
                            control={control}
                            rules={{
                              required: "Please add admin profile",
                              validate: {
                                fileType: (value) => {
                                  if (value && typeof (watch(`sAvatar`)) !== 'string') {
                                    const allowedFormats = ['jpeg', 'png', 'jpg', 'JPEG', 'PNG', 'JPG'];
                                    const fileExtension = value.name.split('.').pop().toLowerCase();

                                    if (!allowedFormats.includes(fileExtension)) {
                                      return "Unsupported image format";
                                    }

                                    const maxSize = 1 * 1000 * 1000; // 1MB in bytes
                                    if (value.size >= maxSize) {
                                      return "Image size must be less than 1MB";
                                    }
                                  }
                                  return true;
                                },
                              }
                            }}
                            render={({ field: { onChange, value, ref } }) => {
                              return <>
                                <Form.Control
                                  ref={(e) => {
                                    ref(e);
                                    fileInputRef.current = e;
                                  }}
                                  type='file'
                                  name={`sAvatar`}
                                  accept='.jpg,.jpeg,.png,.JPEG,.JPG,.PNG'
                                  errors={errors}
                                  className={errors?.sAvatar && 'error'}
                                  onChange={(e) => {
                                    onChange(e.target.files[0])
                                  }}
                                />
                              </>
                            }}
                          />
                        </div>

                        <span className='card-error'>{errors && errors?.sAvatar && <Form.Control.Feedback type="invalid">{errors?.sAvatar.message}</Form.Control.Feedback>}</span>
                      </div>
                    </Col>
                  </Row>
                  <div className="line"></div>
                  <Row>
                    <Col lg={6} md={12}>
                      <CommonInput
                        type='text'
                        register={register}
                        errors={errors}
                        className={`form-control ${errors?.sUserName && 'error'}`}
                        name='sUserName'
                        label='Name'
                        placeholder='Enter the name'
                        required
                        onChange={(e) => {
                          e.target.value =
                            e.target.value?.trim() &&
                            e.target.value.replace(/^[0-9]+$/g, '')
                        }}
                        maxLength={50}
                        validation={{
                          required: {
                            value: true,
                            message: validationErrors.nameRequired
                          },
                          minLength: {
                            value: 2,
                            message: 'Please enter atleast 2 characters.'
                          },
                          maxLength: {
                            value: 50,
                            message: 'Name must be less than 50 char long.'
                          },
                          pattern: {
                            value: /^[a-zA-Z ]+$/,
                            message: 'Special characters and numbers are not allowed'
                          }
                        }}
                      />
                    </Col>

                    <Col lg={6} md={12} className='mt-lg-0 mt-2'>
                      <CommonInput
                        type='text'
                        register={register}
                        errors={errors}
                        className={`form-control ${errors?.sCompanyName && 'error'}`}
                        name='sCompanyName'
                        label='Company Name'
                        placeholder='Enter the company name'
                        required
                        onChange={(e) => {
                          e.target.value =
                            e.target.value?.trim() &&
                            e.target.value.replace(/^[0-9]+$/g, '')
                        }}
                        maxLength={20}
                        validation={{
                          required: {
                            value: true,
                            message: 'Company name is required.'
                          },
                          minLength: {
                            value: 5,
                            message: 'Company name must be atleast 5 char long.'
                          },
                          maxLength: {
                            value: 20,
                            message: 'Company name must be less than 20 char long.'
                          },
                          pattern: {
                            value: /^[a-zA-Z ]+$/,
                            message: 'Special characters and numbers are not allowed'
                          }
                        }}
                      />
                    </Col>

                    <Col lg={6} md={12} className='mt-2'>
                      <CommonInput
                        type='text'
                        register={register}
                        errors={errors}
                        className={`form-control ${errors?.sEmail && 'error'}`}
                        name='sEmail'
                        label='Email ID'
                        placeholder='Enter the email address'
                        required
                        validation={{
                          pattern: {
                            value: EMAIL,
                            message: 'Provide a valid email address.'
                          },
                          required: {
                            value: true,
                            message: validationErrors?.emailRequired
                          },
                          maxLength: {
                            value: 45,
                            message: 'Email address must be less than 45 char long.'
                          }
                        }}
                      />
                    </Col>

                    <Col lg={6} md={12} className='mt-2'>
                      <Form.Group className='form-group'>
                        <Form.Label>
                          <span>
                            <FormattedMessage id='Password' />
                            <span className='inputStar'>*</span>
                          </span>
                        </Form.Label>
                        <InputGroup>
                          <Controller
                            name='sPassword'
                            control={control}
                            render={({ field: { ref, value, onChange } }) => (
                              <Form.Control
                                className={`form-control ${errors.sPassword && 'error'}`}
                                placeholder='Enter new password'
                                type={!showNewPassword ? 'password' : 'text'}
                                name='sPassword'
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
                          <Button onClick={handleNewPasswordToggle} variant='link' className='icon-right'>
                            <i className={showNewPassword ? 'icon-visibility' : 'icon-visibility-off'}></i>
                          </Button>
                        </InputGroup>
                        {errors.sPassword && (<Form.Control.Feedback type='invalid'>{errors.sPassword.message}</Form.Control.Feedback>)}
                      </Form.Group>
                    </Col>

                    <Col lg={6} md={12} className='mt-2'>
                      <CommonInput
                        type='text'
                        register={register}
                        errors={errors}
                        className={`form-control ${errors?.sMobile && 'error'}`}
                        name='sMobile'
                        label='Mobile'
                        placeholder='Enter mobile number'
                        required
                        validation={{
                          pattern: {
                            value: /^[0-9]+$/,
                            message: 'Only numbers are allowed'
                          },
                          required: {
                            value: true,
                            message: 'Mobile number is required'
                          },
                          maxLength: {
                            value: 10,
                            message: 'Mobile number should be of 10 digits.'
                          }
                        }}
                        maxLength={10}
                        onChange={(e) => {
                          e.target.value =
                            e.target.value?.trim() &&
                            e.target.value.replace(/^[a-zA-z]+$/g, '')
                        }}
                      />
                    </Col>

                    <Col lg={6} md={12} className='mt-2'>
                      <Form.Group className='form-group'>
                        <Form.Label>
                          <span>
                            Games
                            <span className='inputStar'>*</span>
                          </span>
                        </Form.Label>
                        <Controller
                          name='aGamesName'
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'Game name(s) are required.'
                            }
                          }}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              placeholder='Select Games...'
                              ref={ref}
                              options={eGameDropdown}
                              components={makeAnimated()}
                              className={`react-select border-0 ${errors.aGamesName && 'error'}`}
                              classNamePrefix='select'
                              isSearchable={false}
                              value={value}
                              onChange={onChange}
                              isMulti={true}
                              getOptionLabel={(option) => option.sName}
                              getOptionValue={(option) => option._id}
                            />
                          )}
                        />
                        {errors.aGamesName && (
                          <Form.Control.Feedback type='invalid'>
                            {errors.aGamesName.message}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>

                    <Col lg={6} md={12} className='mt-2'>
                      <CommonInput
                        type='text'
                        register={register}
                        errors={errors}
                        className={`form-control ${errors?.nPrice && 'error'}`}
                        name='nPrice'
                        price={true}
                        hasTooltip={true}
                        tooltipMsg='Price must be INR base.'
                        label='Package Price'
                        placeholder='Enter the package price'
                        required
                        validation={{
                          pattern: {
                            value: /^[0-9]+$/,
                            message: 'Only numbers are allowed'
                          },
                          required: {
                            value: true,
                            message: 'Package price is required'
                          },
                        }}
                        onChange={(e) => {
                          e.target.value =
                            e.target.value?.trim() &&
                            e.target.value.replace(/^[a-zA-z]+$/g, '')
                        }}
                      />
                    </Col>

                    <Col lg={6} md={12} className='mt-2'>
                      <Form.Group className='form-group'>
                        <Form.Label className='date-lable'>
                          <span>
                            Purchase Date
                            <span className='inputStar'>*</span>
                          </span>
                        </Form.Label>
                        <Controller
                          name="dStartAt"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'Purchase date is required.'
                            }
                          }}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              selected={field.value}
                              placeholderText='Select Purchase Date'
                              onChange={(date) => field.onChange(date)}
                              className="datepicker-inputbox"
                              showIcon
                              toggleCalendarOnIconClick
                              minDate={new Date()}
                            />
                          )}
                        />
                      </Form.Group>
                      {errors.dStartAt && (
                        <Form.Control.Feedback type='invalid'>
                          {errors.dStartAt.message}
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col lg={6} md={12} className='mt-2'>
                      <Form.Group className='form-group'>
                        <Form.Label className='date-lable'>
                          <span>
                            Expiry Date
                            <span className='inputStar'>*</span>
                          </span>
                        </Form.Label>
                        <Controller
                          name="dEndAt"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'Expiry date is required.'
                            }
                          }}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              selected={field.value}
                              placeholderText='Select Expiry Date'
                              onChange={(date) => field.onChange(date)}
                              minDate={getValues('dStartAt')}
                              filterDate={(date) => date >= new Date(getValues('dStartAt'))}
                              className="datepicker-inputbox"
                              showIcon
                              toggleCalendarOnIconClick
                            />
                          )}
                        />
                      </Form.Group>
                      {errors.dEndAt && (
                        <Form.Control.Feedback type='invalid'>
                          {errors.dEndAt.message}
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Row className='mt-4'>
                      <Col sm={12}>
                        <Button variant='primary' type='submit' className='me-2 square' disabled={isButtonDisabled}>
                          Add Doctor {isLoading && <Spinner animation='border' size='sm' />}
                        </Button>
                        <Button variant='secondary' className='square' onClick={() => navigate(route.admin)}>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Row>
                </Wrapper>
              </Col>
            </Row>
          </div>
        </div>
      </Form >
    </>
  )
}

export default AddDoctor
