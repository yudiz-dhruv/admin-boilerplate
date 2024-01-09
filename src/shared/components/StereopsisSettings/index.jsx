import React from 'react'
import Wrapper from '../Wrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaPlay } from "react-icons/fa"
import { eBallSpeed, eBubbleDistance, eRingRunnerLevels } from 'shared/constants/TableHeaders'
import Select from 'react-select'
import { Controller } from 'react-hook-form'

const StereopsisSettings = ({ buttonToggle, setButtonToggle, control, errors }) => {
    const tab_buttons = [
        { key: 'bubble', label: 'Bubble' },
    ]

    const LABELS = {
        TITLE: 'Stereopsis',
        BUBBLE_SIZE: 'Bubble Size',
        BUBBLE_DISTANCE: 'Bubble Distance',
        GABBER_PATCH: 'No. of Gabber Patch',
        ARM_LENGTH: 'Arm Length'
    }
    return (
        <>
            <Wrapper>
                <h3 className='game-title'><FontAwesomeIcon icon={faCube} color='var(--secondary-500)' /> {LABELS?.TITLE}</h3>
                <div className='line'></div>

                <div className='antisuppresion-details-button-group'>
                    {tab_buttons?.map((tab, index) => (
                        <Button key={index} className={buttonToggle[tab.key] ? 'square btn-primary' : 'square btn-secondary'} variant={buttonToggle[tab.key] ? 'primary' : 'secondary'} onClick={() => setButtonToggle({ [tab.key]: true })}>
                            <FaPlay color='var(--text-hover)' /> {tab?.label}
                        </Button>
                    ))}

                    {buttonToggle?.bubble && (
                        <div className='mt-3'>
                            <Wrapper>
                                <Row>
                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.BUBBLE_SIZE}</Form.Label>
                                            <Controller
                                                name='eBubbleSize'
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder='Select bubble size'
                                                        options={eRingRunnerLevels}
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
                                            <Form.Label>{LABELS?.BUBBLE_DISTANCE}</Form.Label>
                                            <Controller
                                                name='sBubbleDistance'
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder='Select bubble distance'
                                                        options={eBubbleDistance}
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
                                            <Form.Label>{LABELS?.GABBER_PATCH}</Form.Label>
                                            <Controller
                                                name='nTargetDuration'
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder='Select targeting duration'
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

                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.ARM_LENGTH}</Form.Label>
                                            <Row className='mt-2'>
                                                <Col sm={6}>
                                                    <Controller
                                                        name='sChildArmLength'
                                                        control={control}
                                                        render={({ field: { ref, value, onChange } }) => (
                                                            <Form.Check
                                                                className='form-check checkbox-wrap m-0'
                                                                type='checkbox'
                                                                ref={ref}
                                                                id='child'
                                                                name='child'
                                                                value={value}
                                                                onChange={onChange}
                                                                checked={value}
                                                                label='Child'
                                                            />
                                                        )}
                                                    />
                                                </Col>
                                                <Col sm={6}>
                                                    <Controller
                                                        name='sAdultArmLength'
                                                        control={control}
                                                        render={({ field: { ref, value, onChange } }) => (
                                                            <Form.Check
                                                                className='form-check checkbox-wrap m-0'
                                                                type='checkbox'
                                                                id='adult'
                                                                ref={ref}
                                                                value={value}
                                                                onChange={onChange}
                                                                name='adult'
                                                                checked={value}
                                                                label='Adult'
                                                            />
                                                        )}
                                                    />
                                                </Col>
                                            </Row>
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

export default StereopsisSettings
