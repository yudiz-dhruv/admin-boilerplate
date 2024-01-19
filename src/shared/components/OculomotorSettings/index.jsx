/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Wrapper from '../Wrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot } from '@fortawesome/free-regular-svg-icons'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { eHeadlockType, eRingRunnerLevels, eTurboGameType } from 'shared/constants/TableHeaders'
import { FaPlay } from "react-icons/fa"
import CommonInput from '../CommonInput'
import Skeleton from 'react-loading-skeleton'

const OculomotorSettings = ({ buttonToggle, setButtonToggle, control, errors, watch, register, games, isLoading }) => {

    const tab_buttons = [
        { key: 'turbo', label: 'Turbo' },
    ]

    const [tabButtons, setTabButtons] = useState(tab_buttons)

    useEffect(() => {
        if (!games) {
            return;
        }

        const gameTabs = games?.filter(game => game?.eCategory === 'oculomotor')?.map(game => ({ key: game?.sName?.toLowerCase(), label: game?.sName }))
        const modifiedTabs = [...tab_buttons, ...(gameTabs || [])]
        setTabButtons(modifiedTabs)
    }, [games])

    const LABELS = {
        TITLE: 'Oculomotor',
        GAME_TYPE: 'Game Type',
        HEADLOCK_TYPE: 'Headlock Type',
        BUTTON_SIZE: 'Button Size',
        TARGET_DURATION: 'Target Duration',
        TARGET_SPREAD: 'Target Spread'
    }
    return (
        <>
            <Wrapper>
                <h3 className='game-title'><FontAwesomeIcon icon={faCircleDot} color='var(--secondary-500)' size='sm' /> {LABELS?.TITLE}</h3>
                <div className='line'></div>

                <div className='antisuppresion-details-button-group mt-4'>
                    {isLoading ? <>
                        <div className='skeleton-button'>
                            <Skeleton count={1} width='110px' height={37} />
                        </div>
                        <div className='skeleton-button'>
                            <Skeleton count={1} width='110px' height={37} />
                        </div>
                        <div className='skeleton-button'>
                            <Skeleton count={1} width='110px' height={37} />
                        </div>
                    </>
                        : tabButtons?.map((tab, index) => (
                            <Button key={index} className={buttonToggle[tab.key] ? 'square btn-primary' : 'square btn-secondary'} variant={buttonToggle[tab.key] ? 'primary' : 'secondary'} onClick={() => setButtonToggle({ [tab.key]: true })}>
                                <FaPlay color='var(--text-hover)' /> {tab?.label}
                            </Button>
                        ))
                    }

                    {buttonToggle?.turbo && (
                        <div className='mt-3 form-content'>
                            <Wrapper>
                                <Row>
                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.GAME_TYPE}</Form.Label>
                                            <Controller
                                                name='eGameType'
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder='Select game type'
                                                        options={eTurboGameType}
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

                                    {watch('eGameType')?.value === 'headlock' && (
                                        <Col xxl={6} xl={12} lg={6} sm={12}>
                                            <Form.Group className='form-group'>
                                                <Form.Label>{LABELS?.HEADLOCK_TYPE}</Form.Label>
                                                <Controller
                                                    name='eHeadlockType'
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            placeholder='Select game type'
                                                            options={eHeadlockType}
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
                                    )}

                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.BUTTON_SIZE}</Form.Label>
                                            <Controller
                                                name='sButtonSize'
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder='Select button size'
                                                        options={eRingRunnerLevels}
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
                                            <CommonInput
                                                label={LABELS?.TARGET_DURATION}
                                                type='text'
                                                register={register}
                                                errors={errors}
                                                className={`form-control ${errors?.sAge && 'error'}`}
                                                name='sActiveDuration'
                                                placeholder='Enter targeting duration (i.e.: in seconds)'
                                                validation={{
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: 'Only numbers are allowed'
                                                    },
                                                    max: {
                                                        value: 10,
                                                        message: 'Target duration should be less than 10 seconds.'
                                                    },
                                                }}
                                                onChange={(e) => {
                                                    e.target.value =
                                                        e.target.value?.trim() &&
                                                        e.target.value.replace(/^[a-zA-z]+$/g, '')
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xxl={6} xl={12} lg={6} sm={12}>
                                        <Form.Group className='form-group'>
                                            <Form.Label>{LABELS?.TARGET_SPREAD}</Form.Label>
                                            <Controller
                                                name='nTargetSpread'
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        placeholder='Select targeting spread size'
                                                        options={eRingRunnerLevels}
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
                </div>
            </Wrapper>
        </>
    )
}

export default OculomotorSettings
