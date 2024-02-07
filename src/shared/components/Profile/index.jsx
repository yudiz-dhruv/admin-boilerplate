import React from 'react'
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { validationErrors } from 'shared/constants/ValidationErrors'
import { EMAIL } from 'shared/constants'
import CommonInput from '../CommonInput'
function EditProfileComponent ({ register, errors, updateFlag }) {
  return (
    <Row>
      <Col md={6}>
        <CommonInput
          type='text'
          register={register}
          errors={errors}
          className={`form-control ${errors?.sUserName && 'error'}`}
          name='sUserName'
          label='User Name'
          disabled={!updateFlag}
          updateFlag={updateFlag}
          placeholder='Enter the user name'
          validation={{
            required: {
              value: true,
              message: validationErrors.userNameRequired,
            },
            maxLength: { value: 10, message: validationErrors.rangeLength(2, 10) },
            minLength: { value: 2, message: validationErrors.rangeLength(2, 10) },
            pattern: {
              value: /^[a-zA-Z ]+$/,
              message: 'Special characters and numbers are not allowed'
            }
          }}
          maxLength={10}
        />
      </Col>

      <Col md={6}>
        <CommonInput
          type='text'
          register={register}
          errors={errors}
          className={`form-control ${errors?.sEmail && 'error'}`}
          name='sEmail'
          label='Email'
          disabled={!updateFlag}
          updateFlag={updateFlag}
          placeholder='Enter email address'
          validation={{
            pattern: {
              value: EMAIL,
              message: 'Provide a valid email format.'
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

      <Col md={6}>
        <CommonInput
          type='text'
          register={register}
          errors={errors}
          className={`form-control ${errors?.sMobile && 'error'}`}
          name='sMobile'
          label='Phone Number'
          disabled={!updateFlag}
          updateFlag={updateFlag}
          placeholder='Enter the phone number'
          validation={{
            required: {
              value: true,
              message: validationErrors.mobileNoRequired,
            },
            validate: (value) => value !== '0000000000' || 'Invalid Mobile Number',
            pattern: {
              value: /^\+?[6-9][0-9]{8,12}$/,
              message: 'Invalid Mobile Number'
            },
            minLength: {
              value: 10,
              message: 'Please enter a valid mobile number.'
            },
            maxLength: {
              value: 10,
              message: 'Mobile number should be of 10 digits.'
            }
          }}
          min={0}
          max={9999999999}
          maxLength='12'
          minLength='10'
        />
      </Col>

      <Col md={6}>
        <CommonInput
          type='text'
          register={register}
          errors={errors}
          className={`form-control ${errors?.eUserType && 'error'}`}
          name='eUserType'
          label='User Type'
          disabled={!updateFlag}
          updateFlag={updateFlag}
          placeholder='Enter the user type'
        />
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
