/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CommonInput from 'shared/components/CommonInput'
import Wrapper from 'shared/components/Wrap'
import { route } from 'shared/constants/AllRoutes'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { eDominantEyeOptions, eIsPresent } from 'shared/constants/TableHeaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQuery } from 'react-query'
import { getPatientById, getPatientDropdownList, joinRoom } from 'query/patient/patient.query'
import { getDirtyFormValues } from 'helper/helper'
import { ReactToastify } from 'shared/utils'
import { socket } from 'shared/socket'

const AdminGame = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, dirtyFields }, control, reset, watch } = useForm({ mode: 'all' })

  const [isDisabled, setButtonDisabled] = useState(false)

  // DROPDOWN PATIENT LIST
  const { data: ePatientDropdown } = useQuery('dropdownPatient', getPatientDropdownList, {
    select: (data) => data?.data?.data,
    onSuccess: (data) => {
      reset({
        ...data,
      })
    }
  })

  // SPEICIFC PATIENT
  const { data: patientDetails } = useQuery('patientDataById', () => getPatientById(watch('ePatientName')?._id), {
    enabled: !!watch('ePatientName')?._id,
    cacheTime: 0,
    select: (data) => data?.data?.data,
    onSuccess: (data) => {
      reset({
        sMobile: data?.sMobile,
        sAge: data?.sAge,
        eDominantEye: eDominantEyeOptions?.find(item => item?.value === data?.eDominantEye),
        eAmblyopia: eIsPresent?.find(item => item?.value === data?.eAmblyopia),
        eStrabismus: eIsPresent?.find(item => item?.value === data?.eStrabismus)
      })
    }
  })

  // JOINING THE ROOM
  const { mutate: joinRoomMutate, isLoading } = useMutation('joinGameRoom', joinRoom, {
    onSuccess: (data) => {
      navigate(route?.adminGameSettings(patientDetails?._id), { state: { patientSettings: data?.data?.data, patientDetails } })

      socket.emit('reqJoinRoom', { iUserId: data?.data?.data?._id }, (response) => {
        if (response?.oData) {
          console.log('%cJoin Room: ', 'color: orange', response?.oData)
        } else {
          console.log('%cJoin Room Error: ', 'color: red', response?.message)
        }
      })
    },
    onError: () => {
      ReactToastify('Oops! Something went wrong. Please try again later.', 'error')
    }
  })

  useEffect(() => {
    const isDirtyData = {
      ePatientName: watch('ePatientName')?._id,
    }

    const payloadData = getDirtyFormValues(dirtyFields, isDirtyData)
    if (Object.keys(payloadData).length !== 0) {
      setButtonDisabled(true)
    }
  }, [dirtyFields, watch('ePatientName')])

  const onSubmit = useCallback(() => {
    joinRoomMutate(patientDetails?._id)
    // patientDetails ? navigate(route?.adminGameSettings(patientDetails?._id), { state: patientDetails }) : toaster('Please fill the data', 'error'); reset({})
  }, [joinRoomMutate, patientDetails])

  useEffect(() => {
    document.title = 'Game Management | Yantra Healthcare'
  }, [])

  return (
    <>
      <Form className='step-one' autoComplete='off' onSubmit={handleSubmit(onSubmit)} >
        <div className='personal-details'>
          <div className='admin-game-form'>
            <Row className='justify-content-center'>
              <Col xxl={8} xl={12} md={12}>
                <Wrapper>
                  <Row>
                    <Col lg={6} md={12}>
                      <Form.Group className='form-group'>
                        <Form.Label> Patient Name </Form.Label>
                        <div className='patient-name'>
                          <div className='input-field'>
                            <Controller
                              name='ePatientName'
                              control={control}
                              render={({ field: { onChange, value, ref } }) => (
                                <Select
                                  placeholder="Enter patient name"
                                  ref={ref}
                                  options={ePatientDropdown}
                                  className={`react-select border-0 ${errors.ePatientName && 'error'}`}
                                  classNamePrefix='select'
                                  isSearchable={true}
                                  value={value}
                                  onChange={onChange}
                                  getOptionLabel={(option) => option.sUserName}
                                  getOptionValue={(option) => option._id}
                                />
                              )}
                            />
                          </div>
                          <div>
                            <Button variant='primary' type='button' className='add-patient' onClick={() => navigate(route?.addPatient)}>
                              <FontAwesomeIcon icon={faPlus} /> Add New Patient
                            </Button>
                          </div>
                        </div>
                      </Form.Group>
                    </Col>

                    <Col lg={6} md={6}>
                      <CommonInput
                        type='text'
                        register={register}
                        errors={errors}
                        className={`form-control ${errors?.sMobile && 'error'}`}
                        name='sMobile'
                        label='Mobile'
                        disabled
                        placeholder='Enter mobile number'
                      />
                    </Col>

                    <Col lg={6} md={6}>
                      <CommonInput
                        type='text'
                        register={register}
                        errors={errors}
                        className={`form-control ${errors?.sAge && 'error'}`}
                        name='sAge'
                        label='Age'
                        disabled
                        placeholder='Enter the patient age'
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Group className='form-group'>
                        <Form.Label> Dominant Eye </Form.Label>
                        <Controller
                          name='eDominantEye'
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              placeholder='Select Dominant Eye'
                              options={eDominantEyeOptions}
                              className={`react-select border-0 ${errors.eDominantEye && 'error'}`}
                              classNamePrefix='select'
                              isDisabled
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className='form-group'>
                        <Form.Label> Has Amblyopia? </Form.Label>
                        <Controller
                          name='eAmblyopia'
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              placeholder="Select patient's Amblyopia status"
                              options={eIsPresent}
                              className={`react-select border-0 ${errors.eAmblyopia && 'error'}`}
                              classNamePrefix='select'
                              isDisabled
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className='form-group'>
                        <Form.Label> Has Strabisums? </Form.Label>
                        <Controller
                          name='eStrabismus'
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              placeholder="Select patient's Strabisums status"
                              options={eIsPresent}
                              className={`react-select border-0 ${errors.eStrabismus && 'error'}`}
                              classNamePrefix='select'
                              isDisabled
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>

                    <Row className='mt-2'>
                      <Col sm={12}>
                        <Button variant='primary' type='submit' className='me-2 next-button square' disabled={isDisabled === false}>
                          Next {isLoading && <Spinner animation='border' size='sm' />}
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

export default AdminGame
