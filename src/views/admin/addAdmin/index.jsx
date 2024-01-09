import React, { useEffect, useRef, useState } from 'react'
import { fileToDataUri, toaster } from 'helper/helper'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Wrapper from 'shared/components/Wrap'
import CommonInput from 'shared/components/CommonInput'
import { validationErrors } from 'shared/constants/ValidationErrors'
import { EMAIL } from 'shared/constants'
import { route } from 'shared/constants/AllRoutes'
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { addAdmin } from 'query/admin/admin.mutation'
import { getGameDropdownList } from 'query/game/game.query'

const AddAdmin = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, control, reset, watch, getValues } = useForm({ mode: 'all' })
  const fileInputRef = useRef(null)

  const [isButtonDisabled, setButtonDisabled] = useState(false)

  // DROPDOWN GAME LIST
  const { data: eGameDropdown } = useQuery('dropdownGame', getGameDropdownList, {
    select: (data) => data?.data?.data,
  })

  // ADD ADMIN
  const { mutate } = useMutation(addAdmin, {
    onSuccess: (res) => {
      toaster('New Admin Added Successfully.', 'success')
      navigate(route.admin)
      reset()
    }
  })

  async function onSubmit (data) {
    if (isButtonDisabled) {
      return;
    }

    setButtonDisabled(true)

    let addData = {
      sUserName: data?.sUserName || '',
      sEmail: data?.sEmail || '',
      aGamesName: data?.aGamesName?.map(item => item?.sName) || '',
      nPrice: +data?.nPrice || '',
      dStartAt: data?.dStartAt?.toISOString() || '',
      dEndAt: data?.dEndAt?.toISOString() || '',
      sCompanyName: data?.sCompanyName || '',
      sAvatar: '',
    }
    const sAvatarFile = data?.sAvatar;

    if (sAvatarFile) {
      const dataUri = await fileToDataUri(sAvatarFile);
      addData.sAvatar = dataUri
    }

    mutate(addData)

    setTimeout(() => {
      setButtonDisabled(false)
    }, 5000)
  }

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

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
                                {watch('sAvatar') && (
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
                                      return "Unsupported file format";
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
                          }
                        }}
                      />
                    </Col>
                    <Col lg={6} md={12} className=''>
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
                          }
                        }}
                      />
                    </Col>

                    <Col lg={6} md={12} className='mt-2'>
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
                          }
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
                        label='Price'
                        placeholder='Enter the price'
                        required
                        validation={{
                          pattern: {
                            value: /^[0-9]+$/,
                            message: 'Only numbers are allowed'
                          },
                          required: {
                            value: true,
                            message: 'Price is required'
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
                            Start Date
                            <span className='inputStar'>*</span>
                          </span>
                        </Form.Label>
                        <Controller
                          name="dStartAt"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'Start date is required.'
                            }
                          }}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              selected={field.value}
                              placeholderText='Select Start Date'
                              onChange={(date) => field.onChange(date)}
                              className="datepicker-inputbox"
                              showIcon
                              toggleCalendarOnIconClick
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
                            End Date
                            <span className='inputStar'>*</span>
                          </span>
                        </Form.Label>
                        <Controller
                          name="dEndAt"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'End date is required.'
                            }
                          }}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              selected={field.value}
                              placeholderText='Select End Date'
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
                          Add Admin
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

export default AddAdmin
