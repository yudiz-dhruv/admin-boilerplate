/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CommonInput from 'shared/components/CommonInput'
import Wrapper from 'shared/components/Wrap'
import { route } from 'shared/constants/AllRoutes'
import { validationErrors } from 'shared/constants/ValidationErrors'
import { fileToDataUri, toaster } from 'helper/helper'
import { addGame } from 'query/game/game.mutation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { eGameCategoryOption } from 'shared/constants/TableHeaders'
import Select from 'react-select'

const AddGame = () => {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm({ mode: 'all' })
    const fileInputRef = useRef(null)

    const [isButtonDisabled, setButtonDisabled] = useState(false)

    // ADD GAME
    const { mutate } = useMutation(addGame, {
        onSuccess: (res) => {
            toaster('New Game Added Successfully.', 'success')
            navigate(route.game)
            reset()
        }
    })

    async function onSubmit (data) {
        if (isButtonDisabled) {
            return;
        }

        setButtonDisabled(true)

        let addData = {
            sName: data?.sName || '',
            sDescription: data?.sDescription || '',
            sUrl: '',
            sAvatar: '',
            eCategory: data?.eCategory?.value
        }

        const sAvatarFile = data?.sAvatar

        if (sAvatarFile) {
            const dataAvatar = await fileToDataUri(sAvatarFile);
            addData.sAvatar = dataAvatar;
        }

        const sBundleFile = data?.sUrl

        if (sBundleFile) {
            const dataUri = await fileToDataUri(sBundleFile);
            addData.sUrl = dataUri;
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
        document.title = 'Add Game | Yantra Healthcare'
    }, [])

    return (
        <>
            <Form className='step-one' autoComplete='off' onSubmit={handleSubmit(onSubmit)} >
                <div className='personal-details'>
                    <div className='game-form'>
                        <Row className='justify-content-center'>
                            <Col xxl={8}>
                                <Wrapper>
                                    <Row sm={12} className='admin-profile-img'>
                                        <Col sm={12}>
                                            <div className='fileinput'>
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
                                                        </> : <span><FontAwesomeIcon icon={faCamera} /></span>}
                                                    </div>
                                                    <Controller
                                                        name={`sAvatar`}
                                                        control={control}
                                                        rules={{
                                                            required: "Please upload game logo",
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
                                        <Col lg={6} md={12} sm={12} className=''>
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
                                                        maxLength={20}
                                                        validation={{
                                                            required: {
                                                                value: true,
                                                                message: validationErrors.gameNameRequired
                                                            },
                                                            maxLength: {
                                                                value: 20,
                                                                message: 'Game name must be less than 20 char long.'
                                                            },
                                                            pattern: {
                                                                value: /^[a-zA-Z ]+$/,
                                                                message: 'Special characters & numbers are not allowed'
                                                            }
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg={12} md={6} sm={12} className='category-selection mt-lg-2 mt-md-0 mt-2'>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>
                                                            <span>
                                                                Category
                                                                <span className='inputStar'>*</span>
                                                            </span>
                                                        </Form.Label>
                                                        <Controller
                                                            name='eCategory'
                                                            control={control}
                                                            rules={{
                                                                required: {
                                                                    value: true,
                                                                    message: 'Game category is required.'
                                                                }
                                                            }}
                                                            render={({ field: { onChange, value, ref } }) => (
                                                                <Select
                                                                    placeholder='Select Games'
                                                                    ref={ref}
                                                                    options={eGameCategoryOption}
                                                                    className={`react-select border-0 ${errors.eCategory && 'error'}`}
                                                                    classNamePrefix='select'
                                                                    isSearchable={false}
                                                                    value={value}
                                                                    onChange={onChange}
                                                                    isMulti={false}
                                                                    getOptionLabel={(option) => option.label}
                                                                    getOptionValue={(option) => option.value}
                                                                />
                                                            )}
                                                        />
                                                        {errors.eCategory && (
                                                            <Form.Control.Feedback type='invalid'>
                                                                {errors.eCategory.message}
                                                            </Form.Control.Feedback>
                                                        )}
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col lg={6} md={12} sm={12} className='mt-lg-0 mt-md-2'>
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

                                        <Col xl={6} lg={6} className='mt-2'>
                                            <div className='fileinput'>
                                                <label className='d-flex justify-content-between'>
                                                    <span>Game Assets File<span className='inputStar'>*</span></span>
                                                </label>
                                                <div className='inputtypefile'>
                                                    <div className='inputMSG'>
                                                        {watch('sUrl') ?
                                                            <span className='bundle-name'>File: {watch('sUrl')?.name}</span> : <span>Upload Game Assets file</span>
                                                        }
                                                    </div>
                                                    <Controller
                                                        name={`sUrl`}
                                                        control={control}
                                                        rules={{
                                                            required: "Please add game assets bundle file",
                                                            validate: {
                                                                fileType: (value) => {
                                                                    if (value && typeof (watch(`sUrl`)) !== 'string') {
                                                                        const allowedFormats = ['bundle', 'BUNDLE'];
                                                                        const fileExtension = value.name.split('.').pop().toLowerCase();

                                                                        if (!allowedFormats.includes(fileExtension)) {
                                                                            return "Unsupported file format";
                                                                        }

                                                                        // const maxSize = 1 * 1000 * 1000; // 1MB in bytes
                                                                        // if (value.size >= maxSize) {
                                                                        //     return "File size must be less than 1MB";
                                                                        // }
                                                                    }
                                                                    return true;
                                                                },
                                                            }
                                                        }}
                                                        render={({ field: { onChange, value, ref } }) => {
                                                            return <>
                                                                <Form.Control
                                                                    ref={ref}
                                                                    type='file'
                                                                    name={`sUrl`}
                                                                    accept='.bundle,.BUNDLE'
                                                                    errors={errors}
                                                                    className={errors?.sUrl && 'error'}
                                                                    onChange={(e) => {
                                                                        onChange(e.target.files[0])
                                                                    }}
                                                                />
                                                            </>
                                                        }}
                                                    />
                                                </div>

                                                <span className='card-error'>{errors && errors?.sUrl && <Form.Control.Feedback type="invalid">{errors?.sUrl.message}</Form.Control.Feedback>}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className='mt-3'>
                                        <Col sm={12}>
                                            <Button variant='primary' type='submit' className='me-2 square' disabled={isButtonDisabled}>
                                                Add Game
                                            </Button>
                                            <Button variant='secondary' className='square' onClick={() => navigate(route.game)}>
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </Wrapper>
                            </Col >
                        </Row >
                    </div >
                </div >
            </Form >
        </>
    )
}

export default AddGame
