import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CommonInput from 'shared/components/CommonInput'
import Wrapper from 'shared/components/Wrap'
import { EMAIL, PASSWORD, URL_REGEX } from 'shared/constants'
import { route } from 'shared/constants/AllRoutes'
import { validationErrors } from 'shared/constants/ValidationErrors'
import Select from 'react-select'
import { fileToDataUri, toaster } from 'helper/helper'
import { addGame } from 'query/game/game.mutation'

const AddGame = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, control, reset, getValues, resetField, setError, clearErrors, watch } = useForm({ mode: 'all' })
    const fileInputRef = useRef(null)

    const eGenderOptions = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
    ]

    const [showPassword, setShowPassword] = useState(true)
    const [modal, setModal] = useState(false)
    const [formData, setFormData] = useState()

    // ADD GAME
    const { mutate } = useMutation(addGame, {
        onSuccess: (res) => {
            toaster('New Game Added Successfully.', 'success')
            navigate(route.game)
            reset()
        }
    })

    async function onSubmit (data) {
        let addData = {
            sName: data?.sName || '',
            sDescription: data?.sDescription || '',
            sUrl: data?.sUrl || '',
            sAvatar: '',
        };
        const sAvatarFile = data?.sAvatar;

        if (sAvatarFile) {
            const dataUri = await fileToDataUri(sAvatarFile);
            addData.sAvatar = dataUri;
        }

        mutate(addData)
    }

    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    useEffect(() => {
        document.title = 'Add Game | Vivid Vision'
    }, [])

    return (
        <>
            <Form className='step-one' autoComplete='off' onSubmit={handleSubmit(onSubmit)} >
                <div className='personal-details'>
                    <div className='game-form'>
                        <Row>
                            <Col xxl={8}>
                                <Wrapper>
                                    <Row>
                                        <Col lg={6} md={12}>
                                            <Row>
                                                <Col lg={12} md={6} sm={12}>
                                                    <CommonInput
                                                        type='text'
                                                        register={register}
                                                        errors={errors}
                                                        className={`form-control ${errors?.sName && 'error'}`}
                                                        name='sName'
                                                        label='Game Name'
                                                        placeholder='Enter game name'
                                                        required
                                                        onChange={(e) => {
                                                            e.target.value =
                                                                e.target.value?.trim() &&
                                                                e.target.value.replace(/^[0-9]+$/g, '')
                                                        }}
                                                        validation={{
                                                            required: {
                                                                value: true,
                                                                message: validationErrors.gameNameRequired
                                                            },
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg={12} md={6} sm={12} className='mt-lg-2 mt-md-0 mt-2'>
                                                    <CommonInput
                                                        type='text'
                                                        register={register}
                                                        errors={errors}
                                                        className={`form-control ${errors?.sUrl && 'error'}`}
                                                        name='sUrl'
                                                        label='URL'
                                                        placeholder='Enter game URL'
                                                        required
                                                        onChange={(e) => {
                                                            e.target.value =
                                                                e.target.value?.trim() &&
                                                                e.target.value.replace(/^[0-9]+$/g, '')
                                                        }}
                                                        validation={{
                                                            pattern: {
                                                                value: URL_REGEX,
                                                                message: 'Provide a valid URL.'
                                                            },
                                                            required: {
                                                                value: true,
                                                                message: validationErrors.gameURLRequired
                                                            },
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col lg={6} md={12} className='mt-lg-0 mt-md-2'>
                                            <CommonInput
                                                type='textarea'
                                                register={register}
                                                errors={errors}
                                                className={`for m-control ${errors?.sDescription && 'error'}`}
                                                name='sDescription'
                                                label='Description'
                                                placeholder='Enter game description...'
                                                required
                                                validation={{
                                                    required: {
                                                        value: true,
                                                        message: 'Description is required'
                                                    },
                                                }}
                                                onChange={(e) => {
                                                    e.target.value =
                                                        e.target.value?.trim() &&
                                                        e.target.value.replace(/^[0-9]+$/g, '')
                                                }}
                                            />
                                        </Col>

                                        <Col lg={6} md={6} sm={12} className='mt-md-2'>
                                            <div className='fileinput'>
                                                <label>Add Game Logo<span className='inputStar'>*</span></label>
                                                <div className='inputtypefile'>
                                                    <div className='inputMSG'>
                                                        {watch('sAvatar') ? <>
                                                            <div className="document-preview-group">
                                                                <div className='img-over' onClick={handleFileInputClick}>Change Game Logo</div>
                                                                {watch('sAvatar') && (
                                                                    typeof (watch('sAvatar')) !== 'string'
                                                                        ? <div className="document-preview"> <img src={URL.createObjectURL(watch('sAvatar'))} alt='altImage' /> </div>
                                                                        : <div className="document-preview"> <img src={watch('sAvatar')} alt='altImage' /> </div>)
                                                                }
                                                            </div>
                                                        </> : <span>Upload Game Logo</span>}
                                                    </div>
                                                    <Controller
                                                        name={`sAvatar`}
                                                        control={control}
                                                        rules={{
                                                            required: "Please add game logo",
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
                                                                            return "File size must be less than 1MB";
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
                                                                    // disabled={updateFlag}
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

                                        <Row className='mt-3'>
                                            <Col sm={12}>
                                                <Button variant='secondary' className='me-2' onClick={() => navigate(route.game)}>
                                                    Cancel
                                                </Button>
                                                <Button variant='primary' type='submit'>
                                                    Add Game
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

export default AddGame
