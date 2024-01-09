import React from 'react'
import Wrapper from '../Wrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { eBallSpeed, eHoopSize, eHoopieLevels, eOrientation, eRingRunnerLevels, eStimulusSizes } from 'shared/constants/TableHeaders'
import CommonInput from '../CommonInput'
import { FaPlay } from "react-icons/fa"

const AntiSupGameSettings = ({ buttonToggle, setButtonToggle, control, errors, register }) => {
    const tab_buttons = [
        { key: 'hoopie', label: 'Hoopie' },
        { key: 'ringRunner', label: 'Ring Runner' },
    ]

    const LABELS = {
        TITLE: 'Anti-Suppression',
        LEVEL_SELECTION: 'Level Selection',
        HOOP_SIZE: 'Hoop Size',
        BALL_SPEED: 'Ball Speed',
        STIMULUS_SIZE: 'Stimulus Size',
        SPACESHIP_SPEED: 'Spaceship Speed',
        ACTIVE_DURATION: 'Active Duration',
        GABBER_PATCH: 'No. of Gabber Patch',
        ORIENTATION: 'Orientation'
    }

    return (
        <>
            <Wrapper>
                <h3 className='game-title'><FontAwesomeIcon icon={faGamepad} color='var(--secondary-500)' /> {LABELS?.TITLE}</h3>
                <div className='line'></div>

                <div className='antisuppresion-details-button-group mt-4'>
                    {tab_buttons?.map((tab, index) => (
                        <Button key={index} className={buttonToggle[tab.key] ? 'square btn-primary' : 'square btn-secondary'} variant={buttonToggle[tab.key] ? 'primary' : 'secondary'} onClick={() => setButtonToggle({ [tab.key]: true })}>
                            <FaPlay color='var(--text-hover)' /> {tab?.label}
                        </Button>
                    ))}

                    {buttonToggle?.hoopie && (
                        <div className='mt-3'>
                            <Wrapper>
                                <Row>
                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.LEVEL_SELECTION}</Form.Label>
                                            <Controller
                                                name='sLevelSelection'
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder='Select Game Level'
                                                        options={eHoopieLevels}
                                                        className={`react-select border-0 ${errors.sLevelSelection && 'error'}`}
                                                        classNamePrefix='select'
                                                        isSearchable={false}
                                                        isMulti={false}
                                                        getOptionLabel={(option) => option.label}
                                                        getOptionValue={(option) => option.value}
                                                    />
                                                )}
                                            />
                                            {errors.sLevelSelection && (<Form.Control.Feedback type='invalid'>{errors.sLevelSelection.message}</Form.Control.Feedback>)}
                                        </Form.Group>
                                    </Col>

                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.HOOP_SIZE}</Form.Label>
                                            <Controller
                                                name='sHoopSize'
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder='Select Hoop Size'
                                                        options={eHoopSize}
                                                        className={`react-select border-0 ${errors.sHoopSize && 'error'}`}
                                                        classNamePrefix='select'
                                                        isSearchable={false}
                                                        isMulti={false}
                                                        getOptionLabel={(option) => option.label}
                                                        getOptionValue={(option) => option.value}
                                                    />
                                                )}
                                            />
                                            {errors.sHoopSize && (<Form.Control.Feedback type='invalid'>{errors.sHoopSize.message}</Form.Control.Feedback>)}
                                        </Form.Group>
                                    </Col>

                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.BALL_SPEED}</Form.Label>
                                            <Controller
                                                name='sBallSpeed'
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder='Select Ball Speed'
                                                        options={eBallSpeed}
                                                        className={`react-select border-0 ${errors.sBallSpeed && 'error'}`}
                                                        classNamePrefix='select'
                                                        isSearchable={false}
                                                        isMulti={false}
                                                        getOptionLabel={(option) => option.label}
                                                        getOptionValue={(option) => option.value}
                                                    />
                                                )}
                                            />
                                            {errors.sBallSpeed && (<Form.Control.Feedback type='invalid'>{errors.sBallSpeed.message}</Form.Control.Feedback>)}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Wrapper>
                        </div>
                    )}

                    {buttonToggle?.ringRunner && (
                        <div className='mt-3'>
                            <Wrapper>
                                <Row>
                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.LEVEL_SELECTION}</Form.Label>
                                            <Controller
                                                name='sLevelSelection'
                                                control={control}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <Select
                                                        placeholder='Select Game Level'
                                                        ref={ref}
                                                        options={eRingRunnerLevels}
                                                        className={`react-select border-0 ${errors.sLevelSelection && 'error'}`}
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
                                            {errors.sLevelSelection && (<Form.Control.Feedback type='invalid'>{errors.sLevelSelection.message}</Form.Control.Feedback>)}
                                        </Form.Group>
                                    </Col>

                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.STIMULUS_SIZE}</Form.Label>
                                            <Controller
                                                name='nStimulusSize'
                                                control={control}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <Select
                                                        placeholder='Select size of stimulus'
                                                        ref={ref}
                                                        options={eStimulusSizes}
                                                        className={`react-select border-0 ${errors.sLevelSelection && 'error'}`}
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
                                            {errors.sLevelSelection && (<Form.Control.Feedback type='invalid'>{errors.sLevelSelection.message}</Form.Control.Feedback>)}
                                        </Form.Group>
                                    </Col>

                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.SPACESHIP_SPEED}</Form.Label>
                                            <Controller
                                                name='nSpaceshipSpeed'
                                                control={control}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <Select
                                                        placeholder='Select speed of spaceship'
                                                        ref={ref}
                                                        options={eHoopieLevels}
                                                        className={`react-select border-0 ${errors.sLevelSelection && 'error'}`}
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
                                            {errors.sLevelSelection && (<Form.Control.Feedback type='invalid'>{errors.sLevelSelection.message}</Form.Control.Feedback>)}
                                        </Form.Group>
                                    </Col>

                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <CommonInput
                                            label={LABELS?.ACTIVE_DURATION}
                                            type='text'
                                            register={register}
                                            errors={errors}
                                            className={`form-control ${errors?.sAge && 'error'}`}
                                            name='sActiveDuration'
                                            placeholder='Power up active duration (i.e.: in seconds)'
                                            validation={{
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'Only numbers are allowed'
                                                },
                                                max: {
                                                    value: 30,
                                                    message: 'Power up duration should be less than 30 seconds.'
                                                },
                                            }}
                                            onChange={(e) => {
                                                e.target.value =
                                                    e.target.value?.trim() &&
                                                    e.target.value.replace(/^[a-zA-z]+$/g, '')
                                            }}
                                        />
                                    </Col>

                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <CommonInput
                                            type='text'
                                            register={register}
                                            errors={errors}
                                            className={`form-control ${errors?.sAge && 'error'}`}
                                            name='nGabberPatch'
                                            label={LABELS?.GABBER_PATCH}
                                            placeholder='Enter no. of gabber patch in last level'
                                            validation={{
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'Only numbers are allowed'
                                                },
                                                // max: {
                                                //     value: 100,
                                                //     message: 'Age should be less than 100 years.'
                                                // },
                                            }}
                                            onChange={(e) => {
                                                e.target.value =
                                                    e.target.value?.trim() &&
                                                    e.target.value.replace(/^[a-zA-z]+$/g, '')
                                            }}
                                        />
                                    </Col>

                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.ORIENTATION}</Form.Label>
                                            <Controller
                                                name='eOrientation'
                                                control={control}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <Select
                                                        placeholder='Select the orientation'
                                                        ref={ref}
                                                        options={eOrientation}
                                                        className={`react-select border-0 ${errors.sLevelSelection && 'error'}`}
                                                        classNamePrefix='select'
                                                        isSearchable={false}
                                                        value={value}
                                                        onChange={onChange}
                                                        isMulti={false}
                                                        getOptionLabel={(option) => option.label + ` (${option?.angle})`}
                                                        getOptionValue={(option) => option.value}
                                                    />
                                                )}
                                            />
                                            {errors.sLevelSelection && (<Form.Control.Feedback type='invalid'>{errors.sLevelSelection.message}</Form.Control.Feedback>)}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Wrapper>
                        </div>
                    )}
                </div>
            </Wrapper>
        </>
    )
}

export default AntiSupGameSettings
