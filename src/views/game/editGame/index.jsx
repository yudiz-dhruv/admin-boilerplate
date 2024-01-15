/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Wrapper from 'shared/components/Wrap';
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query';
import { getGameById } from 'query/game/game.query';
import { eGameCategoryOption } from 'shared/constants/TableHeaders';
import { updateGame } from 'query/game/game.mutation';
import { fileToDataUri, getDirtyFormValues, toaster } from 'helper/helper';
import { route } from 'shared/constants/AllRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import CommonInput from 'shared/components/CommonInput';
import { validationErrors } from 'shared/constants/ValidationErrors';
import Select from 'react-select'

const EditGame = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { register, handleSubmit, formState: { errors, isDirty, dirtyFields }, control, reset, watch } = useForm({ mode: 'all' })

    const [isButtonDisabled, setButtonDisabled] = useState(false)
    const [payload, setPayload] = useState()
    const [assetFile, setAssetFile] = useState()

    // SPEICIFC GAME
    const { data } = useQuery('gameDataById', () => getGameById(id), {
        enabled: !!id,
        select: (data) => data?.data?.data,
    })

    useEffect(() => {
        reset({
            ...data,
            eCategory: eGameCategoryOption?.find(item => item?.value === data?.eCategory),
            sUrl: data?.sUrl?.split('/')?.slice(-1)?.[0]
        })
    }, [data])

    // EDIT GAME
    const { mutate: updateMutate } = useMutation(updateGame, {
        onSettled: (response, err) => {
            if (response) {
                toaster('Game Updated Successfully.', 'success')
                navigate(route.game)

                reset()
            } else {
                toaster(err.data.message, 'error')
            }
        }
    })

    useEffect(() => {
        const isDirtyData = {
            sName: watch('sName'),
            sUrl: watch('sUrl'),
            sDescription: watch('sDescription'),
            eCategory: watch('eCategory')?.value,
        }

        const payloadData = getDirtyFormValues(dirtyFields, isDirtyData)
        setPayload(payloadData)
    }, [dirtyFields, watch('sName'), watch('sDescription'), watch('sUrl'), watch('eCategory')])

    async function onSubmit (data) {
        if (isButtonDisabled) {
            return;
        }

        setButtonDisabled(true)

        const sBundleFile = data?.sUrl ? data?.sUrl : assetFile?.previousFile;

        updateMutate({ ...payload, sUrl: sBundleFile && await fileToDataUri(sBundleFile), id })

        setTimeout(() => {
            setButtonDisabled(false)
        }, 5000)
    }

    useEffect(() => {
        document.title = 'Edit Game | Yantra Healthcare'
    }, [])

    return (
        <>
            <Form className='step-one' autoComplete='off' onSubmit={handleSubmit(onSubmit)} >
                <div className='personal-details'>
                    <div className='game-form'>
                        <Row className='justify-content-center'>
                            <Col xxl={8}>
                                <Wrapper>
                                    <Row>
                                        <Col lg={4} md={12}>
                                            <Row>
                                                <Col sm={12} className='admin-profile-img'>
                                                    <div className='fileinput'>
                                                        <div className='inputtypefile'>
                                                            <div className='inputMSG'>
                                                                {!errors?.sAvatar && watch('sAvatar') ? <>
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
                                                <Col sm={12} className=''>
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
                                            </Row>
                                        </Col>
                                        <Col lg={8} md={12}>
                                            <Row className='mt-lg-0 mt-md-2 mt-2'>
                                                <Col sm={12}>
                                                    <Row>
                                                        <Col sm={6}>
                                                            <div className='fileinput'>
                                                                <label className='d-flex justify-content-between'>
                                                                    <span>Game Assets File<span className='inputStar'>*</span></span>
                                                                </label>
                                                                <div className='inputtypefile'>
                                                                    <div className='inputMSG'>
                                                                        {watch('sUrl') || assetFile?.previousFile ?
                                                                            <span className='bundle-name'>File: {assetFile?.previousFile ? assetFile?.previousFile?.name : typeof watch('sUrl') === 'string' ? watch('sUrl') : watch('sUrl')?.name}</span> : <span>Upload Game Assets file</span>
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
                                                                                        const fileExtension = value.name?.split('.').pop().toLowerCase();

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
                                                                                    title={typeof watch('sUrl') === 'string' ? watch('sUrl') : watch('sUrl')?.name}
                                                                                    defaultValue={assetFile?.previousFile ? assetFile?.previousFile?.name : (assetFile?.currentFile?.name || watch('sUrl')?.name)}
                                                                                    accept='.bundle,.BUNDLE'
                                                                                    errors={errors}
                                                                                    className={errors?.sUrl && 'error'}
                                                                                    onChange={(e) => {
                                                                                        setAssetFile((prev) => ({
                                                                                            ...prev,
                                                                                            previousFile: prev?.currentFile,
                                                                                            currentFile: e.target.files?.[0],
                                                                                        }))
                                                                                        onChange(e.target.files?.[0])
                                                                                    }}
                                                                                />
                                                                            </>
                                                                        }}
                                                                    />
                                                                </div>

                                                                <span className='card-error'>{assetFile?.previousFile ? '' : errors && errors?.sUrl && <Form.Control.Feedback type="invalid">{errors?.sUrl.message}</Form.Control.Feedback>}</span>
                                                            </div>
                                                        </Col>
                                                        <Col sm={6} className='category-selection'>
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
                                                                            placeholder='Select Games...'
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

                                                <Col sm={12}>
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
                                            </Row>
                                        </Col>

                                        <Row className='mt-3'>
                                            <Col sm={12}>
                                                <Button variant='primary' type='submit' className='me-2 square' disabled={!isDirty || isButtonDisabled}>
                                                    Update Game
                                                </Button>
                                                <Button variant='secondary' className='square' onClick={() => navigate(route.game)}>
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

export default EditGame
