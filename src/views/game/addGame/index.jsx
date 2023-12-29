import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useMutation, useQuery } from 'react-query'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CommonInput from 'shared/components/CommonInput'
import Wrapper from 'shared/components/Wrap'
import { URL_REGEX } from 'shared/constants'
import { route } from 'shared/constants/AllRoutes'
import { validationErrors } from 'shared/constants/ValidationErrors'
import { fileToDataUri, toaster } from 'helper/helper'
import { addGame, updateGame } from 'query/game/game.mutation'
import { getGameById } from 'query/game/game.query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

const AddGame = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    
    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm({ mode: 'all' })
    const fileInputRef = useRef(null)

    const [show, setShow] = useState(false)
    const target = useRef(null)

    // SPEICIFC GAME
    useQuery('gameDataById', () => getGameById(id), {
        enabled: !!id,
        select: (data) => data?.data?.data,
        onSuccess: (data) => {
            reset({
                ...data,
            })
        }
    })

    // ADD GAME
    const { mutate } = useMutation(addGame, {
        onSuccess: (res) => {
            toaster('New Game Added Successfully.', 'success')
            navigate(route.game)
            reset()
        }
    })

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

    async function onSubmit (data) {
        let addData = {
            sName: data?.sName || '',
            sDescription: data?.sDescription || '',
            sUrl: data?.sUrl || '',
            sAvatar: '',
        };

        let editData = {
            sName: data?.sName || '',
            sAvatar: '',
            id
        }
        const sAvatarFile = data?.sAvatar;

        if (sAvatarFile) {
            const dataUri = await fileToDataUri(sAvatarFile);
            addData.sAvatar = dataUri;
            editData.sAvatar = dataUri
        }

        location?.state === 'edit' ? updateMutate(editData) : mutate(addData)
    }

    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const renderTooltip = (props) => {
        const tooltip = 'Image upload limit: 1 MB. Please ensure your file size is within this limit.'
        return (
            <Tooltip id="game-logo-tooltip" {...props}>
                <span style={{ fontSize: '10px', display: 'block' }}>{tooltip}</span>
            </Tooltip>
        )
    }

    useEffect(() => {
        document.title = location?.state === 'edit' ? 'Edit Game | Vivid Vision' : 'Add Game | Vivid Vision'
    }, [location])

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
                                                        disabled={location?.state === 'edit'}
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
                                                disabled={location?.state === 'edit'}
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
                                                <label className='d-flex justify-content-between'>
                                                    <span>Add Game Logo<span className='inputStar'>*</span></span>
                                                    <OverlayTrigger
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={renderTooltip}
                                                    >
                                                        <span ref={target} onClick={() => setShow(!show)} className='information'><FontAwesomeIcon icon={faCircleInfo} color='var(--primary-color)' size='lg' /></span>
                                                    </OverlayTrigger>
                                                </label>
                                                <div className='inputtypefile'>
                                                    <div className='inputMSG'>
                                                        {!errors?.sAvatar && watch('sAvatar') ? <>
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
                                                <Button variant='primary' type='submit' className='me-2'>
                                                    {location?.state === 'edit' ? 'Update Game' : 'Add Game'}
                                                </Button>
                                                <Button variant='secondary' onClick={() => navigate(route.game)}>
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

export default AddGame
