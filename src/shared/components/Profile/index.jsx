import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import { validationErrors } from 'shared/constants/ValidationErrors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Controller } from 'react-hook-form'
function EditProfileComponent ({ register, errors, profileData, handleChange, control, updateFlag }) {
  const genderOption = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Others', value: 'others' }
  ]
  return (
    <Row>
      <Col md={6}>
        <Form.Group className='form-group'>
          <Form.Label className='light-font'>
            <FormattedMessage id='User Name' />
          </Form.Label>
          <div className='profile-input'>
            <Form.Control
              type='text'
              name='sUserName'
              disabled={!updateFlag}
              {...register('sUserName', {
                required: validationErrors.userNameRequired,
                maxLength: { value: 10, message: validationErrors.rangeLength(2, 10) },
                minLength: { value: 2, message: validationErrors.rangeLength(2, 10) },
                pattern: {
                  value: /^[a-zA-Z ]+$/,
                  message: 'Special characters and numbers are not allowed'
                }
              })}
              maxLength={10}
              errors={errors}
              className={`form-control ${errors.sUserName && 'error'}`}
              value={profileData?.sUserName}
              onChange={(e) => {
                e.target.value = e.target.value?.trim()
                handleChange(e)
              }}
            />
            {updateFlag && <FontAwesomeIcon icon={faPen} />}
          </div>
          {errors.sUserName && <Form.Control.Feedback type='invalid'>{errors.sUserName.message}</Form.Control.Feedback>}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className='form-group'>
          <Form.Label className='light-font'>
            <FormattedMessage id='fullName' />
          </Form.Label>
          <div className='profile-input'>
            <Form.Control
              type='text'
              name='sFullName'
              disabled={!updateFlag}
              {...register('sFullName', {
                required: validationErrors.fullNameRequired,
              })}
              errors={errors}
              className={`form-control ${errors.sFullName && 'error'}`}
              value={profileData?.sFullName}
              onChange={(e) => {
                handleChange(e)
              }}
            />
            {updateFlag && <FontAwesomeIcon icon={faPen} />}
          </div>
          {errors.sFullName && <Form.Control.Feedback type='invalid'>{errors.sFullName.message}</Form.Control.Feedback>}
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group className='form-group'>
          <Form.Label className='light-font'>
            <FormattedMessage id='emailAddress' />
          </Form.Label>
          <Form.Control type='text' name='sRole' value={profileData?.sEmail} disabled />
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group className='form-group'>
          <Form.Label className='light-font'>
            <FormattedMessage id='phoneNumber' />
          </Form.Label>
          <div className='profile-input'>
            <Form.Control
              name='sMobile'
              disabled={!updateFlag}
              {...register('sMobile', {
                required: validationErrors.mobileNoRequired,
                pattern: {
                  value: /^\+?[6-9][0-9]{8,12}$/,
                  message: 'Invalid Mobile Number'
                },

                validate: (value) => value !== '0000000000' || 'Invalid Mobile Number'
              })}
              min={0}
              max={9999999999}
              maxLength='12'
              minLength='10'
              type='text'
              value={profileData?.sMobile}
              className={errors.sMobile && 'error'}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D+/g, '')
                handleChange(e)
              }}
            />
            {updateFlag && <FontAwesomeIcon icon={faPen} />}
          </div>
          {errors.sMobile && <Form.Control.Feedback type='invalid'>{errors.sMobile.message}</Form.Control.Feedback>}
        </Form.Group>
      </Col>
      <Col lg={6}>
        <Form.Group className='form-group'>
          <Form.Label className='light-font'>
            Gender
          </Form.Label>
          <div className='profile-input'>
            <Controller
              name='eGender'
              control={control}
              rules={{ required: 'gender require' }}
              render={({ field: { onChange, value, ref } }) => {
                return <Select
                  inputRef={ref}
                  value={genderOption?.find(item => item?.value === value)}
                  options={genderOption}
                  className={`react-select ${errors.eGender && 'error'} `}
                  classNamePrefix='select'
                  isSearchable={false}
                  isDisabled={!updateFlag}
                  onChange={onChange}
                />
              }
              }
            />
            {updateFlag && <FontAwesomeIcon icon={faPen} />}
          </div>
          {errors.eGender && <Form.Control.Feedback type='invalid'>{errors.eGender.message}</Form.Control.Feedback>}
        </Form.Group>
      </Col>
    </Row>
  )
}

EditProfileComponent.propTypes = {
  register: PropTypes.func,
  values: PropTypes.object,
  control: PropTypes.object,
  errors: PropTypes.object,
  clearErrors: PropTypes.func,
  trigger: PropTypes.func,
  sProfilePicture: PropTypes.string,
  profileData: PropTypes.object,
  sBankDetailPic: PropTypes.string,
  sPanPicture: PropTypes.string,
  handleChange: PropTypes.func,
  setValue: PropTypes.func
}

export default EditProfileComponent
