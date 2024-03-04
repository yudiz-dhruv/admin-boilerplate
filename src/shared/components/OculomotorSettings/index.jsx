/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Wrapper from '../Wrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot } from '@fortawesome/free-regular-svg-icons'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { eButtonCount, eButtonSize, eHorizontalBiasOption, eTargetSpawnType, eTargetSpeed, eTargetStayDurationOption, eTurboGameType, eTurboHammerType, eVerticalBiasOption } from 'shared/constants/TableHeaders'
import { FaPause, FaPlay } from "react-icons/fa"
import CommonInput from '../CommonInput'
import Skeleton from 'react-loading-skeleton'
import { motion } from 'framer-motion'
import { FormattedMessage } from 'react-intl'
import { useTurboSettings } from 'shared/hooks/useTurboSettings'

const OculomotorSettings = (props) => {
    const { buttonToggle, setButtonToggle, control, errors, register, games, isLoading, turboGameMode, setTurboGameMode, gameStarted, headLockMode, setHeadLockMode, handleStartGame, handleEndGame, modal, setModal, watch } = props

    const [tabButtons, setTabButtons] = useState([])

    const { TURBO_GAME_STRUCTURE } = useTurboSettings(watch)

    const LABELS = {
        TITLE: 'Oculomotor',
        GAME_DURATION: 'Game Duration',
        BUTTON_SIZE: 'Button Size',
        BUTTON_COUNT: 'Button Count',
        HORIZONTAL_BIAS: 'Horizontal Bias',
        VERTICAL_BIAS: 'Vertical Bias',
        TARGET_STAY_DURATION: 'Target Stay Duration',
        NEXT_TARGET_DELAY: 'Next Target Delay',
        TARGET_SPREAD: 'Target Spread',
        HEADLOCK: 'Headlock',
        GAME_TYPE: 'Game Type',
        HAMMER_TYPE: 'Hammer Type',
        TARGET_SPAWN_TYPE: 'Target Spawn Type',
        TARGET_COLOR_TYPE: 'Target Color Type',
        TARGET_SPEED: 'Target Speed',
    }

    useEffect(() => {
        if (!games) {
            return;
        }

        const gameTabs = games?.filter(game => game?.eCategory === 'oculomotor')?.map(game => ({ key: game?.sName?.toLowerCase(), label: game?.sName }))
        const modifiedTabs = [...(gameTabs || [])]
        setTabButtons(modifiedTabs)
    }, [games])

    const handleConfirmStatus = (status, id) => status ? (setHeadLockMode('y')) : (setHeadLockMode('n'))

    const handleTabs = (e, tab) => {
        e?.preventDefault()

        setButtonToggle({ [tab.key]: true })
        setModal({ open: true, type: tab?.key, data: tab })
    }

    const handleClose = (e) => {
        e?.preventDefault()

        setModal({ open: false, type: '', data: modal?.data })
    }
    return (
        <>
            <h3 className='game-title'><FontAwesomeIcon icon={faCircleDot} color='var(--secondary-500)' size='sm' /> {LABELS?.TITLE}</h3>
            <div className='line'></div>

            <div className='antisuppresion-details-button-group mt-4'>
                {isLoading ? (<>
                    <div className='skeleton-button'>
                        <Skeleton count={1} width='110px' height={37} />
                    </div>
                    <div className='skeleton-button'>
                        <Skeleton count={1} width='110px' height={37} />
                    </div>
                    <div className='skeleton-button'>
                        <Skeleton count={1} width='110px' height={37} />
                    </div>
                </>)
                    : (tabButtons?.length > 0) ? (tabButtons?.map((tab, index) => (
                        <Button
                            key={index}
                            className={(buttonToggle[tab.key] && gameStarted) ? 'startedGame' : 'tabButton'}
                            variant={buttonToggle[tab.key] ? 'primary' : 'secondary'}
                            onClick={(e) => handleTabs(e, tab)}
                            disabled={buttonToggle[tab.key] !== true && gameStarted}
                        >
                            {(buttonToggle[tab.key] && gameStarted) ? (<><FaPause color='var(--text-hover)' /> {tab?.label}</>) : (<><FaPlay color='var(--text-hover)' /> {tab?.label}</>)}
                        </Button>
                    ))) : (<span className='no-games'><FormattedMessage id='noOculomotorGame' /></span>)
                }

                <Modal show={modal?.type === 'turbo'} onHide={(e) => handleClose(e)} id='game-setting-modal' size='lg'>
                    <Form className='step-one form-content' autoComplete='off'>
                        <Modal.Header closeButton>
                            <Modal.Title className='game-setting-modal-header'>{modal?.data?.label} Game Settings</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {buttonToggle?.turbo &&
                                (<>
                                    <Row>
                                        <Col md={6} sm={12}>
                                            <CommonInput
                                                label={LABELS?.GAME_DURATION}
                                                type='text'
                                                register={register}
                                                errors={errors}
                                                className={`form-control ${errors?.nTurboGameDuration && 'error'}`}
                                                name='nTurboGameDuration'
                                                defaultValue={TURBO_GAME_STRUCTURE?.nDuration}
                                                placeholder='Game duration (i.e.: in minutes)'
                                                disabled={gameStarted}
                                                validation={{
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: 'Only numbers are allowed'
                                                    },
                                                    max: {
                                                        value: 30,
                                                        message: 'Game duration must be less than 30 minutes.'
                                                    },
                                                    min: {
                                                        value: 1,
                                                        message: 'Game duration should be atleast 1 minute.'
                                                    }
                                                }}
                                                min={1}
                                                maxLength={2}
                                                onChange={(e) => {
                                                    e.target.value =
                                                        e.target.value?.trim() &&
                                                        e.target.value.replace(/^[a-zA-z]+$/g, '')

                                                    // if (gameStarted) {
                                                    //     setGameStarted(false)
                                                    // }
                                                }}
                                            />
                                        </Col>
                                        <Col md={6} sm={12} className='mt-md-0 mt-2'>
                                            <div className=''>
                                                <Form.Group className='form-group ringRunner'>
                                                    <Form.Label>Game Mode</Form.Label>

                                                    <div className='tabs'>
                                                        <motion.div
                                                            whileTap={{ scale: 0.9 }}>
                                                            <Button type='button' className={`${turboGameMode?.turbo ? 'checked' : ''}`} onClick={() => {
                                                                setTurboGameMode({ turbo: true })
                                                                // if (gameStarted) {
                                                                //     setGameStarted(false)
                                                                // }
                                                            }}
                                                                disabled={gameStarted}
                                                            >
                                                                <span className='tab'>Turbo</span>
                                                            </Button>
                                                        </motion.div>

                                                        <motion.div
                                                            whileTap={{ scale: 0.9 }}>
                                                            <Button type='button' className={`${turboGameMode?.hammer ? 'checked' : ''}`} onClick={() => {
                                                                setTurboGameMode({ hammer: true })
                                                                // if (gameStarted) {
                                                                //     setGameStarted(false)
                                                                // }
                                                            }}
                                                                disabled={gameStarted}
                                                            >
                                                                <span className='tab'>Hammer</span>
                                                            </Button>
                                                        </motion.div>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>

                                    {turboGameMode?.turbo && <>
                                        <motion.div initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                                            className='mt-3'>
                                            <Wrapper>
                                                <Row>
                                                    <Col md={6} sm={12}>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.BUTTON_SIZE}</Form.Label>
                                                            <Controller
                                                                name='sTurboButtonSize'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select button size'
                                                                        ref={ref}
                                                                        defaultValue={eButtonSize?.find(size => size?.value === TURBO_GAME_STRUCTURE?.sButtonSize)}
                                                                        options={eButtonSize}
                                                                        className={`react-select border-0 ${errors.sTurboButtonSize && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sTurboButtonSize && (<Form.Control.Feedback type='invalid'>{errors.sTurboButtonSize.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-md-0 mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.BUTTON_COUNT}</Form.Label>
                                                            <Controller
                                                                name='sTurboButtonCount'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select button counts'
                                                                        ref={ref}
                                                                        defaultValue={eButtonCount?.find(count => count?.value === TURBO_GAME_STRUCTURE?.sButtonCount)}
                                                                        options={eButtonCount}
                                                                        className={`react-select border-0 ${errors.sTurboButtonCount && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sTurboButtonCount && (<Form.Control.Feedback type='invalid'>{errors.sTurboButtonCount.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.HORIZONTAL_BIAS}</Form.Label>
                                                            <Controller
                                                                name='sHorizontalBias'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select horizontal bias'
                                                                        ref={ref}
                                                                        defaultValue={eHorizontalBiasOption?.find(bias => bias?.value === TURBO_GAME_STRUCTURE?.eHorizontalBias)}
                                                                        options={eHorizontalBiasOption}
                                                                        className={`react-select border-0 ${errors.sHorizontalBias && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sHorizontalBias && (<Form.Control.Feedback type='invalid'>{errors.sHorizontalBias.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.VERTICAL_BIAS}</Form.Label>
                                                            <Controller
                                                                name='sVerticalBias'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select vertical bias'
                                                                        ref={ref}
                                                                        defaultValue={eVerticalBiasOption?.find(bias => bias?.value === TURBO_GAME_STRUCTURE?.eVerticalBias)}
                                                                        options={eVerticalBiasOption}
                                                                        className={`react-select border-0 ${errors.sVerticalBias && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sVerticalBias && (<Form.Control.Feedback type='invalid'>{errors.sVerticalBias.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.TARGET_STAY_DURATION}</Form.Label>
                                                            <Controller
                                                                name='sTurboTargetStayDuration'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select target stay duration'
                                                                        ref={ref}
                                                                        defaultValue={eTargetStayDurationOption?.find(duration => duration?.value === TURBO_GAME_STRUCTURE?.eTargetStayDuration)}
                                                                        options={eTargetStayDurationOption}
                                                                        className={`react-select border-0 ${errors.sTurboTargetStayDuration && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }

                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sTurboTargetStayDuration && (<Form.Control.Feedback type='invalid'>{errors.sTurboTargetStayDuration.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.NEXT_TARGET_DELAY}</Form.Label>
                                                            <Controller
                                                                name='sTurboNextTargetDelay'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select gabor frequency'
                                                                        ref={ref}
                                                                        defaultValue={eTargetStayDurationOption?.find(duration => duration?.value === TURBO_GAME_STRUCTURE?.sNextTargetDelay)}
                                                                        options={eTargetStayDurationOption}
                                                                        className={`react-select border-0 ${errors.sTurboNextTargetDelay && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sTurboNextTargetDelay && (<Form.Control.Feedback type='invalid'>{errors.sTurboNextTargetDelay.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.TARGET_SPREAD}</Form.Label>
                                                            <Controller
                                                                name='sTurboTargetSpread'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select gabor frequency'
                                                                        ref={ref}
                                                                        defaultValue={eButtonSize?.find(size => size?.value === TURBO_GAME_STRUCTURE?.sTargetSpread)}
                                                                        options={eButtonSize}
                                                                        className={`react-select border-0 ${errors.sTurboTargetSpread && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sTurboTargetSpread && (<Form.Control.Feedback type='invalid'>{errors.sTurboTargetSpread.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.HEADLOCK}</Form.Label>
                                                            <Controller
                                                                name='bHeadlock'
                                                                control={control}
                                                                render={({ field: { ref, onChange, value } }) => (
                                                                    <Form.Check
                                                                        ref={ref}
                                                                        type='switch'
                                                                        name='bHeadlock'
                                                                        className='d-inline-block mt-2'
                                                                        checked={headLockMode === 'y'}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            handleConfirmStatus(e.target.checked)
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.bHeadlock && (<Form.Control.Feedback type='invalid'>{errors.bHeadlock.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Wrapper>
                                        </motion.div>
                                    </>}

                                    {turboGameMode?.hammer && <>
                                        <motion.div initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                                            className='mt-3'>
                                            <Wrapper>
                                                <Row>
                                                    <Col md={6} sm={12}>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.TARGET_STAY_DURATION}</Form.Label>
                                                            <Controller
                                                                name='nHammerTargetStayDuration'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select gabor frequency'
                                                                        ref={ref}
                                                                        defaultValue={eTargetStayDurationOption?.find(duration => duration?.value === TURBO_GAME_STRUCTURE?.eTargetStayDuration)}
                                                                        options={eTargetStayDurationOption}
                                                                        className={`react-select border-0 ${errors.nHammerTargetStayDuration && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.nHammerTargetStayDuration && (<Form.Control.Feedback type='invalid'>{errors.nHammerTargetStayDuration.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-md-0 mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.GAME_TYPE}</Form.Label>
                                                            <Controller
                                                                name='sHammerGameType'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select gabor frequency'
                                                                        ref={ref}
                                                                        defaultValue={eTurboGameType?.find(type => type?.value === TURBO_GAME_STRUCTURE?.eGameType)}
                                                                        options={eTurboGameType}
                                                                        className={`react-select border-0 ${errors.sHammerGameType && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sHammerGameType && (<Form.Control.Feedback type='invalid'>{errors.sHammerGameType.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.HAMMER_TYPE}</Form.Label>
                                                            <Controller
                                                                name='sHammerType'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select gabor frequency'
                                                                        ref={ref}
                                                                        defaultValue={eTurboHammerType?.find(type => type?.value === TURBO_GAME_STRUCTURE?.eHammerType)}
                                                                        options={eTurboHammerType}
                                                                        className={`react-select border-0 ${errors.sHammerType && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sHammerType && (<Form.Control.Feedback type='invalid'>{errors.sHammerType.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.TARGET_SPAWN_TYPE}</Form.Label>
                                                            <Controller
                                                                name='sTargetSpawnType'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select gabor frequency'
                                                                        ref={ref}
                                                                        defaultValue={eTargetSpawnType?.find(type => type?.value === TURBO_GAME_STRUCTURE?.eMobSpawnType)}
                                                                        options={eTargetSpawnType}
                                                                        className={`react-select border-0 ${errors.sTargetSpawnType && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sTargetSpawnType && (<Form.Control.Feedback type='invalid'>{errors.sTargetSpawnType.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.TARGET_COLOR_TYPE}</Form.Label>
                                                            <Controller
                                                                name='sTargetColorType'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select gabor frequency'
                                                                        ref={ref}
                                                                        defaultValue={eTurboHammerType?.find(type => type?.value === TURBO_GAME_STRUCTURE?.eMobColorType)}
                                                                        options={eTurboHammerType}
                                                                        className={`react-select border-0 ${errors.sTargetColorType && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sTargetColorType && (<Form.Control.Feedback type='invalid'>{errors.sTargetColorType.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6} sm={12} className='mt-2'>
                                                        <Form.Group className='form-group'>
                                                            <Form.Label>{LABELS?.TARGET_SPEED}</Form.Label>
                                                            <Controller
                                                                name='sHammerTargetSpeed'
                                                                control={control}
                                                                render={({ field: { onChange, value, ref } }) => (
                                                                    <Select
                                                                        placeholder='Select gabor frequency'
                                                                        ref={ref}
                                                                        defaultValue={eTargetSpeed?.find(speed => speed?.value === TURBO_GAME_STRUCTURE?.sTargetSpeed)}
                                                                        options={eTargetSpeed}
                                                                        className={`react-select border-0 ${errors.sHammerTargetSpeed && 'error'}`}
                                                                        classNamePrefix='select'
                                                                        isSearchable={false}
                                                                        value={value}
                                                                        onChange={(e) => {
                                                                            // if (gameStarted) {
                                                                            //     setGameStarted(false)
                                                                            // }
                                                                            onChange(e)
                                                                        }}
                                                                        isMulti={false}
                                                                        getOptionLabel={(option) => option.label}
                                                                        getOptionValue={(option) => option.value}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sHammerTargetSpeed && (<Form.Control.Feedback type='invalid'>{errors.sHammerTargetSpeed.message}</Form.Control.Feedback>)}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Wrapper>
                                        </motion.div>
                                    </>}
                                </>)}
                        </Modal.Body>
                        <Modal.Footer className='mt-4'>
                            <Button variant='primary' type='button' className='me-2 square' disabled={gameStarted || Object.keys(errors)?.length > 0} onClick={(e) => handleStartGame(e, buttonToggle)}>
                                <FormattedMessage id='startGame' />
                            </Button>
                            <Button variant='secondary' type='button' className='square' disabled={!gameStarted} onClick={(e) => handleEndGame(e, buttonToggle)}>
                                <FormattedMessage id='endGame' />
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        </>
    )
}

export default OculomotorSettings
