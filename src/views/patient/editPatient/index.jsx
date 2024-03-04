/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { getDirtyFormValues } from 'helper/helper'
import { updatePatient } from 'query/patient/patient.mutation'
import { getPatientById } from 'query/patient/patient.query'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useMutation, useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CommonInput from 'shared/components/CommonInput'
import Wrapper from 'shared/components/Wrap'
import { route } from 'shared/constants/AllRoutes'
import { eAmblyopiaTypeOptions, eDominantEyeOptions, eGenderOptions, eIsPresent, eVisualAcuityOptions } from 'shared/constants/TableHeaders'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { ReactToastify } from 'shared/utils'
import { FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons'

const EditPatient = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const { register, handleSubmit, formState: { errors, isDirty, dirtyFields }, control, reset, watch } = useForm({ mode: 'all' })

    const [isButtonDisabled, setButtonDisabled] = useState(false)
    const [payload, setPayload] = useState()
    const [buttonToggle, setButtonToggle] = useState({
        left: true,
        right: false
    })

    const tabs = [
        { key: 'left', label: 'Left' },
        { key: 'right', label: 'Right' },
    ]

    // SPEICIFC PATIENT
    const { data } = useQuery('patientDataById', () => getPatientById(id), {
        enabled: !!id,
        select: (data) => data?.data?.data,
    })

    useEffect(() => {
        reset({
            ...data,
            sUserName: data?.sUserName || '',
            sMobile: data?.sMobile || '',
            sAge: data?.sAge || '',
            eDominantEye: eDominantEyeOptions?.find(item => item?.value === data?.eDominantEye),
            eAmblyopia: eIsPresent?.find(item => item?.value === data?.eAmblyopia),
            eStrabismus: eIsPresent?.find(item => item?.value === data?.eStrabismus),
        })
    }, [data])

    // EDIT PATIENT
    const { mutate: updateMutate } = useMutation(updatePatient, {
        onSettled: (response, err) => {
            if (response) {
                ReactToastify('Patient Record Updated Successfully!', 'success')
                navigate(route.patient)

                reset()
            } else {
                ReactToastify(err?.data?.message, 'error')
            }
        }
    })

    useEffect(() => {
        const isDirtyData = {
            sUserName: watch('sUserName'),
            sMobile: watch('sMobile'),
            sAge: watch('sAge'),
            eDominantEye: watch('eDominantEye')?.value,
            eAmblyopia: watch('eAmblyopia')?.value,
            eStrabismus: watch('eStrabismus')?.value
        }

        const payloadData = getDirtyFormValues(dirtyFields, isDirtyData)
        setPayload(payloadData)
    }, [dirtyFields, watch('sUserName'), watch('sMobile'), watch('sAge'), watch('eDominantEye'), watch('eAmblyopia'), watch('eStrabismus')])

    const onSubmit = useCallback((data) => {
        if (isButtonDisabled) {
            return;
        }

        setButtonDisabled(true)

        updateMutate({ ...payload, id })

        setTimeout(() => {
            setButtonDisabled(false)
        }, 5000)
    }, [isButtonDisabled, setButtonDisabled, updateMutate])

    useEffect(() => {
        document.title = 'Edit Patient | Yantra Healthcare'
    }, [])
    return (
        <>
            <Form className='step-one' autoComplete='off' onSubmit={handleSubmit(onSubmit)} >
                <div className='personal-details'>
                    <div className='patient-form'>
                        <Row className='d-flex justify-content-center'>
                            <Col xxl={8}>
                                <Wrapper>
                                    <div className='profile_icon'><FontAwesomeIcon icon={faUser} /></div>
                                    <p>Patient Details</p>
                                    <Row>
                                        <Col lg={6} md={12}>
                                            <CommonInput
                                                type='text'
                                                register={register}
                                                errors={errors}
                                                className={`form-control ${errors?.sUserName && 'error'}`}
                                                name='sUserName'
                                                label='Patient Name'
                                                placeholder='Enter patient name'
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
                                                        message: 'Patient name is required.'
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
                                                        message: 'Special characters & numbers are not allowed'
                                                    }
                                                }}
                                            />
                                        </Col>

                                        <Col lg={6} md={12} className='mt-lg-0 mt-2'>
                                            <CommonInput
                                                type='text'
                                                register={register}
                                                errors={errors}
                                                className={`form-control ${errors?.sMobile && 'error'}`}
                                                name='sMobile'
                                                label='Phone Number'
                                                disabled={location?.state === 'edit'}
                                                placeholder='Enter phone number'
                                                required
                                                validation={{
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: 'Only numbers are allowed'
                                                    },
                                                    required: {
                                                        value: true,
                                                        message: 'Phone number is required'
                                                    },
                                                    // minLength: {
                                                    //     value: 10,
                                                    //     message: 'Mobile number must be atleast 10 digits.'
                                                    // },
                                                    maxLength: {
                                                        value: 10,
                                                        message: 'Mobile number should be of 10 digits.'
                                                    }
                                                }}
                                                maxLength={10}
                                                onChange={(e) => {
                                                    e.target.value =
                                                        e.target.value?.trim() &&
                                                        e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
                                                }}
                                            />
                                        </Col>

                                        <Col lg={6} md={12} className='mt-2'>
                                            <CommonInput
                                                type='text'
                                                register={register}
                                                errors={errors}
                                                className={`form-control ${errors?.sAge && 'error'}`}
                                                name='sAge'
                                                label='Age'
                                                disabled={location?.state === 'edit'}
                                                placeholder='Enter the patient age'
                                                required
                                                max={100}
                                                validation={{
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: 'Only numbers are allowed'
                                                    },
                                                    max: {
                                                        value: 100,
                                                        message: 'Age should be less than 100 years.'
                                                    },
                                                    required: {
                                                        value: true,
                                                        message: 'Patient Age is required.'
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
                                                <Form.Label>
                                                    <span>
                                                        Gender
                                                        <span className='inputStar'>*</span>
                                                    </span>
                                                </Form.Label>
                                                <Controller
                                                    name='eGender'
                                                    control={control}
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: 'Patient gender is required'
                                                        }
                                                    }}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Select
                                                            placeholder='Select the gender'
                                                            ref={ref}
                                                            options={eGenderOptions}
                                                            className={`react-select border-0 ${errors.eGender && 'error'}`}
                                                            classNamePrefix='select'
                                                            isSearchable={false}
                                                            value={value}
                                                            onChange={onChange}
                                                            getOptionLabel={(option) => option.label}
                                                            getOptionValue={(option) => option.value}
                                                        />
                                                    )}
                                                />
                                                {errors.eGender && (
                                                    <Form.Control.Feedback type='invalid'>
                                                        {errors.eGender.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6} md={12} className='mt-2'>
                                            <Form.Group className='form-group'>
                                                <Form.Label>
                                                    <span>
                                                        Dominant Eye
                                                        <span className='inputStar'>*</span>
                                                    </span>
                                                </Form.Label>
                                                <Controller
                                                    name='eDominantEye'
                                                    control={control}
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: 'Dominant Eye is required'
                                                        }
                                                    }}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Select
                                                            placeholder='Select Dominant Eye'
                                                            ref={ref}
                                                            options={eDominantEyeOptions}
                                                            className={`react-select border-0 ${errors.eDominantEye && 'error'}`}
                                                            classNamePrefix='select'
                                                            isSearchable={false}
                                                            value={value}
                                                            onChange={onChange}
                                                            getOptionLabel={(option) => option.label}
                                                            getOptionValue={(option) => option.value}
                                                        />
                                                    )}
                                                />
                                                {errors.eDominantEye && (
                                                    <Form.Control.Feedback type='invalid'>
                                                        {errors.eDominantEye.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6} md={12} className='mt-2'>
                                            <Form.Group className='form-group'>
                                                <Form.Label>
                                                    <span>
                                                        Has Amblyopia?
                                                        <span className='inputStar'>*</span>
                                                    </span>
                                                </Form.Label>
                                                <Controller
                                                    name='eAmblyopia'
                                                    control={control}
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: 'Amblyopia field is required'
                                                        }
                                                    }}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Select
                                                            placeholder="Select patient's Amblyopia status"
                                                            ref={ref}
                                                            options={eIsPresent}
                                                            className={`react-select border-0 ${errors.eAmblyopia && 'error'}`}
                                                            classNamePrefix='select'
                                                            isSearchable={false}
                                                            value={value}
                                                            onChange={onChange}
                                                            getOptionLabel={(option) => option.label}
                                                            getOptionValue={(option) => option.value}
                                                        />
                                                    )}
                                                />
                                                {errors.eAmblyopia && (
                                                    <Form.Control.Feedback type='invalid'>
                                                        {errors.eAmblyopia.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>

                                        {watch('eAmblyopia')?.value === 'yes' &&
                                            <Col lg={6} md={12} className='mt-2'>
                                                <Form.Group className='form-group'>
                                                    <Form.Label>
                                                        <span>
                                                            Amblyopia Type
                                                            <span className='inputStar'>*</span>
                                                        </span>
                                                    </Form.Label>
                                                    <Controller
                                                        name='eAmblyopiaType'
                                                        control={control}
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message: 'Amblyopia type is required'
                                                            }
                                                        }}
                                                        render={({ field: { onChange, value, ref } }) => (
                                                            <Select
                                                                placeholder="Select Amblyopia type"
                                                                ref={ref}
                                                                options={eAmblyopiaTypeOptions}
                                                                className={`react-select border-0 ${errors.eAmblyopiaType && 'error'}`}
                                                                classNamePrefix='select'
                                                                isSearchable={false}
                                                                value={value}
                                                                onChange={onChange}
                                                                getOptionLabel={(option) => option.label}
                                                                getOptionValue={(option) => option.value}
                                                            />
                                                        )}
                                                    />
                                                    {errors.eAmblyopiaType && (
                                                        <Form.Control.Feedback type='invalid'>
                                                            {errors.eAmblyopiaType.message}
                                                        </Form.Control.Feedback>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        }

                                        <Col lg={6} md={12} className='mt-2'>
                                            <Form.Group className='form-group'>
                                                <Form.Label>
                                                    <span>
                                                        Has Strabisums?
                                                        <span className='inputStar'>*</span>
                                                    </span>
                                                </Form.Label>
                                                <Controller
                                                    name='eStrabismus'
                                                    control={control}
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: 'Strabisums field is required'
                                                        }
                                                    }}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Select
                                                            placeholder="Select patient's Strabisums status"
                                                            ref={ref}
                                                            options={eIsPresent}
                                                            className={`react-select border-0 ${errors.eStrabismus && 'error'}`}
                                                            classNamePrefix='select'
                                                            isSearchable={false}
                                                            value={value}
                                                            onChange={onChange}
                                                            getOptionLabel={(option) => option.label}
                                                            getOptionValue={(option) => option.value}
                                                        />
                                                    )}
                                                />
                                                {errors.eStrabismus && (
                                                    <Form.Control.Feedback type='invalid'>
                                                        {errors.eStrabismus.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6} md={12} className='mt-2'>
                                            <CommonInput
                                                type='textarea'
                                                register={register}
                                                errors={errors}
                                                className={`for m-control ${errors?.sClinicalDiagnosis && 'error'}`}
                                                name='sClinicalDiagnosis'
                                                label='Clinical Diagnosis'
                                                placeholder='Enter the clinical diagnosis'
                                                required
                                                style={{ height: '90px' }}
                                                validation={{
                                                    required: {
                                                        value: true,
                                                        message: 'Clinical Diagnosis is required'
                                                    },
                                                }}
                                                onChange={(e) => {
                                                    e.target.value =
                                                        e.target.value?.trim() &&
                                                        e.target.value.replace(/^[0-9]+$/g, '')
                                                }}
                                            />
                                        </Col>

                                        <h3 className='data-title mt-3'><FontAwesomeIcon icon={faEye} color='var(--secondary-500)' size='sm' /> Visual Acuity</h3>
                                        <Col sm={12}>
                                            <div className='visual-acuity'>
                                                <Row>
                                                    <Col lg={12} md={12}>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>
                                                                <span>
                                                                    Eye Type
                                                                    <span className='inputStar'>*</span>
                                                                </span>
                                                            </Form.Label>
                                                            <div className='mt-2 tabs'>
                                                                {tabs?.map(tab => (
                                                                    <div key={tab.key}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        className='tab-wrapper'>
                                                                        <Button key={tab.key} type='button' className={`${buttonToggle[tab?.key] ? 'checked' : ''}`} onClick={() => setButtonToggle({ [tab?.key]: true })}>
                                                                            <span className='tab'>{tab?.label}</span>
                                                                        </Button>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {buttonToggle?.left && <div className='mt-2'>
                                                                <Row>
                                                                    <Col lg={6} md={12} className=''>
                                                                        <Form.Group className='form-group'>
                                                                            <Form.Label>
                                                                                <span>
                                                                                    Left Visual Acuity
                                                                                    <span className='inputStar'>*</span>
                                                                                </span>
                                                                                <span className='subTitle'>(LOGMAR BASES)</span>
                                                                            </Form.Label>
                                                                            <Controller
                                                                                name='eLeftVisualAcuity'
                                                                                control={control}
                                                                                rules={{
                                                                                    required: {
                                                                                        value: true,
                                                                                        message: 'Left Visual Acuity is required'
                                                                                    }
                                                                                }}
                                                                                render={({ field: { onChange, value, ref } }) => (
                                                                                    <Select
                                                                                        placeholder='Select Visual Acuity'
                                                                                        ref={ref}
                                                                                        options={eVisualAcuityOptions}
                                                                                        className={`react-select border-0 ${errors.eLeftVisualAcuity && 'error'}`}
                                                                                        classNamePrefix='select'
                                                                                        isSearchable={false}
                                                                                        value={value}
                                                                                        onChange={onChange}
                                                                                        getOptionLabel={(option) => option.label}
                                                                                        getOptionValue={(option) => option.value}
                                                                                    />
                                                                                )}
                                                                            />
                                                                            {errors.eLeftVisualAcuity && (
                                                                                <Form.Control.Feedback type='invalid'>
                                                                                    {errors.eLeftVisualAcuity.message}
                                                                                </Form.Control.Feedback>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col lg={6} md={12} className=''>
                                                                        <CommonInput
                                                                            type='text'
                                                                            register={register}
                                                                            errors={errors}
                                                                            className={`form-control ${errors?.sLeftPartialEye && 'error'}`}
                                                                            name='sLeftPartialEye'
                                                                            label='Left Partial Eye'
                                                                            placeholder='Enter left partial eye data'
                                                                            required
                                                                            onChange={(e) => {
                                                                                e.target.value =
                                                                                    e.target.value?.trim() &&
                                                                                    e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
                                                                            }}
                                                                            maxLength={10}
                                                                            validation={{
                                                                                required: {
                                                                                    value: true,
                                                                                    message: 'Left Partial eye is required.'
                                                                                },
                                                                                pattern: {
                                                                                    value: /^[0-9]+(\.[0-9]+)?$/,
                                                                                    message: 'Only integer or float values are allowed'
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </div>}

                                                            {buttonToggle?.right && <div className='mt-2'>
                                                                <Row>
                                                                    <Col lg={6} md={12} className=''>
                                                                        <Form.Group className='form-group'>
                                                                            <Form.Label>
                                                                                <span>
                                                                                    Right Visual Acuity
                                                                                    <span className='inputStar'>*</span>
                                                                                </span>
                                                                                <span className='subTitle'>(LOGMAR BASES)</span>
                                                                            </Form.Label>
                                                                            <Controller
                                                                                name='eRightVisualAcuity'
                                                                                control={control}
                                                                                rules={{
                                                                                    required: {
                                                                                        value: true,
                                                                                        message: 'Visual Acuity is required'
                                                                                    }
                                                                                }}
                                                                                render={({ field: { onChange, value, ref } }) => (
                                                                                    <Select
                                                                                        placeholder='Select Visual Acuity'
                                                                                        ref={ref}
                                                                                        options={eVisualAcuityOptions}
                                                                                        className={`react-select border-0 ${errors.eRightVisualAcuity && 'error'}`}
                                                                                        classNamePrefix='select'
                                                                                        isSearchable={false}
                                                                                        value={value}
                                                                                        onChange={onChange}
                                                                                        getOptionLabel={(option) => option.label}
                                                                                        getOptionValue={(option) => option.value}
                                                                                    />
                                                                                )}
                                                                            />
                                                                            {errors.eRightVisualAcuity && (
                                                                                <Form.Control.Feedback type='invalid'>
                                                                                    {errors.eRightVisualAcuity.message}
                                                                                </Form.Control.Feedback>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col lg={6} md={12} className=''>
                                                                        <CommonInput
                                                                            type='text'
                                                                            register={register}
                                                                            errors={errors}
                                                                            className={`form-control ${errors?.sRightPartialEye && 'error'}`}
                                                                            name='sRightPartialEye'
                                                                            label='Right Partial Eye'
                                                                            placeholder='Enter right partial eye data'
                                                                            required
                                                                            onChange={(e) => {
                                                                                e.target.value =
                                                                                    e.target.value?.trim() &&
                                                                                    e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
                                                                            }}
                                                                            maxLength={10}
                                                                            validation={{
                                                                                required: {
                                                                                    value: true,
                                                                                    message: 'Right Partial eye is required.'
                                                                                },
                                                                                pattern: {
                                                                                    value: /^[0-9]+(\.[0-9]+)?$/,
                                                                                    message: 'Only integer or float values are allowed'
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </div>}
                                                        </Form.Group>
                                                    </Col>

                                                </Row>
                                            </div>
                                        </Col>

                                        <Row className='mt-3'>
                                            <Col sm={12}>
                                                <Button variant='primary' type='submit' className='me-2 square' disabled={!isDirty || isButtonDisabled}>
                                                    <FormattedMessage id='updatePatient' />
                                                </Button>
                                                <Button variant='secondary' onClick={() => navigate(route.patient)} className='square'>
                                                    <FormattedMessage id='cancel' />
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

export default EditPatient
