/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { getDirtyFormValues, toaster } from 'helper/helper'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import Wrapper from 'shared/components/Wrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import CommonInput from 'shared/components/CommonInput'
import { validationErrors } from 'shared/constants/ValidationErrors'
import { route } from 'shared/constants/AllRoutes'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import { useMutation, useQuery } from 'react-query'
import { getAdminById } from 'query/admin/admin.query'
import makeAnimated from 'react-select/animated'
import { updateAdmin } from 'query/admin/admin.mutation'
import { getGameDropdownList } from 'query/game/game.query'
import { FormattedMessage } from 'react-intl'
import { PASSWORD } from 'shared/constants'

const EditAdmin = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { register, handleSubmit, formState: { errors, isDirty, dirtyFields }, control, reset, watch, getValues } = useForm({ mode: 'all' })

  const [payload, setPayload] = useState()
  const [showNewPassword, setNewPassword] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  // DROPDOWN GAME LIST
  const { data: eGameDropdown } = useQuery('dropdownGame', getGameDropdownList, {
    select: (data) => data?.data?.data,
  })

  // SPECIFIC ADMIN
  const { data } = useQuery('adminDataById', () => getAdminById(id), {
    enabled: !!id,
    select: (data) => data?.data?.data,
  })

  useEffect(() => {
    if (data && eGameDropdown?.length > 0) {
      const temp = data ? [...data?.aGamesName] : []

      const gameData = []
      for (let key of eGameDropdown) {
        if (temp?.filter(item => item === key?.sName)?.length > 0) {
          gameData?.push(key)
        }
      }
      reset({
        ...data,
        aGamesName: gameData,
        dStartAt: new Date(data?.oGameValidity?.dStartAt) || '',
        dEndAt: new Date(data?.oGameValidity?.dEndAt) || '',
        sPassword: ''
      })
    }
  }, [data, eGameDropdown, reset])

  // EDIT ADMIN
  const { mutate: updateMutate } = useMutation(updateAdmin, {
    onSettled: (response, err) => {
      if (response) {
        toaster('Admin Updated Successfully.', 'success')
        navigate(route.admin)

        reset()
      } else {
        toaster(err.data.message, 'error')
      }
    }
  })

  useEffect(() => {
    const isDirtyData = {
      sUserName: watch('sUserName'),
      sCompanyName: watch('sCompanyName'),
      aGamesName: watch('aGamesName')?.map(item => item?.sName),
      nPrice: +watch('nPrice'),
      dStartAt: watch('dStartAt')?.toISOString(),
      dEndAt: watch('dEndAt')?.toISOString(),
      sAvatar: watch('sAvatar'),
      sPassword: watch('sPassword'),
      sMobile: watch('sMobile')
    }

    const payloadData = getDirtyFormValues(dirtyFields, isDirtyData)
    setPayload(payloadData)
  }, [dirtyFields, watch('sUserName'), watch('sCompanyName'), watch('aGamesName'), watch('nPrice'), watch('dStartAt'), watch('dEndAt'), watch('sAvatar'), watch('sPassword'), watch('sMobile')])

  async function onSubmit (data) {
    if (isButtonDisabled) {
      return;
    }

    setButtonDisabled(true)
    updateMutate({ ...payload, id })

    setTimeout(() => {
      setButtonDisabled(false)
    }, 5000)
  }

  const handleNewPasswordToggle = () => {
    setNewPassword(!showNewPassword)
  }

  useEffect(() => {
    document.title = 'Edit Admin | Yantra Healthcare'
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
                                {watch('sAvatar') && (
                                  typeof (watch('sAvatar')) !== 'string'
                                    ? <div className="document-preview"> <img src={URL.createObjectURL(watch('sAvatar'))} alt='altImage' /> </div>
                                    : <div className="document-preview"> <img src={watch('sAvatar')} alt='altImage' /> </div>)
                                }
                              </div>
                            </> : <span><FontAwesomeIcon icon={faCamera} /></span>}
                          </div>
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
                        defaultValue={data?.sUserName}
                        label='Name'
                        placeholder='Enter the name'
                        required
                        maxLength={50}
                        onChange={(e) => {
                          e.target.value =
                            e.target.value?.trim() &&
                            e.target.value.replace(/^[0-9]+$/g, '')
                        }}
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

                    <Col lg={6} md={12}>
                      <CommonInput
                        type='text'
                        register={register}
                        errors={errors}
                        className={`form-control ${errors?.sCompanyName && 'error'}`}
                        name='sCompanyName'
                        label='Company Name'
                        maxLength={20}
                        placeholder='Enter the company name'
                        required
                        onChange={(e) => {
                          e.target.value =
                            e.target.value?.trim() &&
                            e.target.value.replace(/^[0-9]+$/g, '')
                        }}
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
                        disabled
                      />
                    </Col>

                    <Col lg={6} md={12} className='mt-2'>
                      <Form.Group className='form-group'>
                        <Form.Label>
                          <FormattedMessage id='Password' />
                          <span className='inputStar'>*</span>
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

                    <Col md={6} className='mt-2'>
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
                              message: 'Game name(s) are required'
                            }
                          }}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              placeholder='Select Games...'
                              ref={ref}
                              options={eGameDropdown}
                              className={`react-select border-0 ${errors.aGamesName && 'error'}`}
                              classNamePrefix='select'
                              isSearchable={true}
                              value={value}
                              components={makeAnimated()}
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
                        <Button variant='primary' type='submit' className='me-2 square' disabled={!isDirty || isButtonDisabled}>
                          Update Admin
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

export default EditAdmin
