/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Wrapper from '../Wrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faHandsHolding, faShuffle, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { eBallSpeed, eGaborFrequency, eHoopSize, eHoopieStimulusSizes, ePowerUpDelay, ePowerUpDuration, eShipSpeed, eSpawnRate, eStimulusSizes, eTargetRadius } from 'shared/constants/TableHeaders'
import CommonInput from '../CommonInput'
import { FaPlay } from "react-icons/fa"
import Skeleton from 'react-loading-skeleton'
import { motion } from 'framer-motion'
import { MdFormatAlignCenter } from "react-icons/md"

const AntiSupGameSettings = ({ buttonToggle, setButtonToggle, control, errors, register, games, isLoading, gameModeToggle, setGameModeToggle, textPositionToggle, setTextPositionToggle, ringrunnerMode, setRingRunnerMode, gameStarted, setGameStarted }) => {
    const [tabButtons, setTabButtons] = useState([])
    const [tachMode, setTachMode] = useState('y')

    useEffect(() => {
        if (!games) {
            return;
        }

        const gameTabs = games?.filter(game => game?.eCategory === 'antiSupression')?.map(game => ({ key: game?.sName?.toLowerCase(), label: game?.sName }))
        const modifiedTabs = [...(gameTabs || [])]
        setTabButtons(modifiedTabs)
    }, [games])

    const LABELS = {
        TITLE: 'Anti-Suppression',
        GAME_MODE: 'Game Mode',
        TACH_MODE: 'Tachistoscopic Mode',
        HOOP_SIZE: 'Hoop Size',
        BALL_SPEED: 'Ball Speed',
        STIMULUS_SIZE: 'Stimulus Size',
        SHIP_SPEED: 'Ship Speed',
        POWERUP_DURATION: 'PowerUp Duration',
        GABOR_PATCH: 'No. of Gabor Patch',
        ORIENTATION: 'Orientation',
        TARGET_RADIUS: 'Target Radius',
        SPAWN_RATE: 'Next Target Delay',
        TEXT_POSITION: 'Text Position',
        POWERUP_DELAY: 'Next PowerUp Delay',
        OBSTACLE_DELAY: 'Next Obstacle Delay',
        LOCAL_ORIENTATION: 'Local Orientation',
        GLOBAL_ORIENTATION: 'Global Orientation',
        GABOR_FREQUENCY: 'Gabor Frequency',
        GAME_DURATION: 'Game Duration'
    }

    const handleConfirmStatus = (status, id) => {
        status ? setTachMode('y') : setTachMode('n')
    }

    const renderTooltip = (text) => <Tooltip id='tab-tooltip'>{text}</Tooltip>

    return (
        <>
            <h3 className='game-title'><FontAwesomeIcon icon={faGamepad} color='var(--secondary-500)' size='sm' /> {LABELS?.TITLE}</h3>
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
                        <Button key={index} className={buttonToggle[tab.key] ? 'square btn-primary' : 'square btn-secondary'} variant={buttonToggle[tab.key] ? 'primary' : 'secondary'} onClick={() => setButtonToggle({ [tab.key]: true })} disabled={buttonToggle[tab.key] !== true && gameStarted}>
                            <FaPlay color='var(--text-hover)' /> {tab?.label}
                        </Button>
                    ))}

                {buttonToggle?.hoopie && (
                    <motion.div className='mt-3 form-content' initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: buttonToggle?.hoopie ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}>
                        <Wrapper>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.GAME_MODE}</Form.Label><br />
                                        <Controller
                                            name='sMode'
                                            control={control}
                                            render={({ field: { ref, onClick, value } }) => (
                                                <>
                                                    <div className='mt-2 tabs'>
                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={renderTooltip('Head')}
                                                            // show={gameModeToggle.head === true}
                                                            delay={{ show: 250, hide: 250 }}
                                                        >
                                                            <Button
                                                                ref={ref}
                                                                type='button'
                                                                name='eHeadMode'
                                                                className={`${gameModeToggle?.head ? 'checked' : ''}`}
                                                                value={value}
                                                                onClick={(e) => {
                                                                    setGameModeToggle({ head: true })
                                                                    onClick(e)
                                                                }}
                                                            >
                                                                <span className='tab'><FontAwesomeIcon icon={faVrCardboard} /></span>
                                                            </Button>
                                                        </OverlayTrigger>

                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={renderTooltip('Hand')}
                                                            // show={gameModeToggle.hand === true}
                                                            delay={{ show: 250, hide: 250 }}
                                                        >
                                                            <Button
                                                                ref={ref}
                                                                type='button'
                                                                name='eHandMode'
                                                                className={`${gameModeToggle?.hand ? 'checked' : ''}`}
                                                                value={value}
                                                                onClick={(e) => {
                                                                    setGameModeToggle({ hand: true })
                                                                    onClick(e)
                                                                }}
                                                            >
                                                                <span className='tab'><FontAwesomeIcon icon={faHandsHolding} /></span>
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </>
                                            )}
                                        />
                                        {errors.sMode && (<Form.Control.Feedback type='invalid'>{errors.sMode.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col xs={6}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.TACH_MODE}</Form.Label><br />
                                        <Controller
                                            name='bTachMode'
                                            control={control}
                                            render={({ field: { ref, onChange, value } }) => (
                                                <Form.Check
                                                    ref={ref}
                                                    type='switch'
                                                    name='bTachMode'
                                                    className='d-inline-block mt-2'
                                                    checked={tachMode === 'y'}
                                                    value={value}
                                                    onChange={(e) => {
                                                        handleConfirmStatus(e.target.checked)
                                                        onChange(e)
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.bTachMode && (<Form.Control.Feedback type='invalid'>{errors.bTachMode.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <CommonInput
                                        label={LABELS?.GAME_DURATION}
                                        type='text'
                                        register={register}
                                        errors={errors}
                                        className={`form-control ${errors?.sHoopieGameDuration && 'error'}`}
                                        name='sHoopieGameDuration'
                                        placeholder='Game duration (i.e.: in minutes)'
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
                                        }}
                                    />
                                </Col>

                                <Col sm={6}>
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
                                                    defaultValue={eHoopSize[0]}
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

                                <Col sm={6}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.TARGET_RADIUS}</Form.Label>
                                        <Controller
                                            name='nHoopieTargetRadius'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder='Select target radius'
                                                    options={eTargetRadius}
                                                    defaultValue={eTargetRadius[0]}
                                                    className={`react-select border-0 ${errors.nHoopieTargetRadius && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.nHoopieTargetRadius && (<Form.Control.Feedback type='invalid'>{errors.nHoopieTargetRadius.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.BALL_SPEED}</Form.Label>
                                        <Controller
                                            name='nHoopieBallSpeed'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder='Select Ball Speed'
                                                    options={eBallSpeed}
                                                    defaultValue={eBallSpeed[0]}
                                                    className={`react-select border-0 ${errors.nHoopieBallSpeed && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.nHoopieBallSpeed && (<Form.Control.Feedback type='invalid'>{errors.nHoopieBallSpeed.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.SPAWN_RATE}</Form.Label>
                                        <Controller
                                            name='sHoopieSpawnRate'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder='Select spawn rate'
                                                    options={eSpawnRate}
                                                    defaultValue={eSpawnRate[0]}
                                                    className={`react-select border-0 ${errors.sHoopieSpawnRate && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.sHoopieSpawnRate && (<Form.Control.Feedback type='invalid'>{errors.sHoopieSpawnRate.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.STIMULUS_SIZE} <span className='subTitle'>(LogMAR bases)</span></Form.Label>
                                        <Controller
                                            name='nHoopieStimulusSize'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder='Select Stimulus Size'
                                                    options={eHoopieStimulusSizes}
                                                    defaultValue={eHoopieStimulusSizes[0]}
                                                    className={`react-select border-0 ${errors.nHoopieStimulusSize && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.nHoopieStimulusSize && (<Form.Control.Feedback type='invalid'>{errors.nHoopieStimulusSize.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col xs={6}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.TEXT_POSITION}</Form.Label><br />
                                        <Controller
                                            name='sTextPosition'
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <div className='mt-2 tabs'>
                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={renderTooltip('Center')}
                                                            // show={gameModeToggle.head === true}
                                                            delay={{ show: 250, hide: 250 }}
                                                        >
                                                            <Button
                                                                {...field}
                                                                type='button'
                                                                name='sTextCenter'
                                                                className={`${textPositionToggle?.center ? 'checked' : ''}`}
                                                                onClick={() => setTextPositionToggle({ center: true })}
                                                            >
                                                                <span className='tab'><MdFormatAlignCenter /></span>
                                                            </Button>
                                                        </OverlayTrigger>

                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={renderTooltip('Random')}
                                                            // show={gameModeToggle.hand === true}
                                                            delay={{ show: 250, hide: 250 }}
                                                        >
                                                            <Button
                                                                {...field}
                                                                type='button'
                                                                name='sTextRandom'
                                                                className={`${textPositionToggle?.random ? 'checked' : ''}`}
                                                                onClick={() => setTextPositionToggle({ random: true })}
                                                            >
                                                                <span className='tab'><FontAwesomeIcon icon={faShuffle} /></span>
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </>
                                            )}
                                        />
                                        {errors.sTextPosition && (<Form.Control.Feedback type='invalid'>{errors.sTextPosition.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Row className='mt-2'>
                                    <Col sm={12}>
                                        <Button variant='primary' type='button' className='me-2 square' disabled={gameStarted} onClick={() => setGameStarted(true)}>
                                            Start Game
                                        </Button>
                                        <Button variant='secondary' type='button' className='square' disabled={!gameStarted} onClick={() => setGameStarted(false)}>
                                            End Game
                                        </Button>
                                    </Col>
                                </Row>
                            </Row>
                        </Wrapper>
                    </motion.div>
                )}

                {buttonToggle?.ringrunner && (
                    <>
                        <motion.div className='mt-3 form-content' initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: buttonToggle?.ringrunner ? 1 : 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}>
                            <Wrapper>
                                <Row>
                                    <Col xxl={6} xl={6} lg={6} sm={12}>
                                        <CommonInput
                                            label={LABELS?.GAME_DURATION}
                                            type='text'
                                            register={register}
                                            errors={errors}
                                            className={`form-control ${errors?.sRRGameDuration && 'error'}`}
                                            name='sRRGameDuration'
                                            placeholder='Game duration (i.e.: in minutes)'
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
                                            }}
                                        />
                                    </Col>
                                    <Col xxl={6} xl={6} lg={6} sm={12}>
                                        <div className='ringRunner'>
                                            <Form.Group className='form-group'>
                                                <Form.Label>Game Mode</Form.Label>
                                                <div className='tabs'>
                                                    <motion.div
                                                        whileTap={{ scale: 0.9 }}>
                                                        <Button type='button' className={`${ringrunnerMode?.normal ? 'checked' : ''}`} onClick={() => setRingRunnerMode({ normal: true })}>
                                                            <span className='tab'>Normal</span>
                                                        </Button>
                                                    </motion.div>

                                                    <motion.div
                                                        whileTap={{ scale: 0.9 }}>
                                                        <Button type='button' className={`${ringrunnerMode?.gabor ? 'checked' : ''}`} onClick={() => setRingRunnerMode({ gabor: true })}>
                                                            <span className='tab'>Gabor</span>
                                                        </Button>
                                                    </motion.div>
                                                </div>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                </Row>

                                {ringrunnerMode?.normal &&
                                    <motion.div initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: ringrunnerMode?.normal ? 1 : 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}>
                                        <Wrapper>
                                            <Row>
                                                <Col xxl={6} xl={6} lg={6} sm={12}>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{LABELS?.STIMULUS_SIZE} <span className='subTitle'>(LogMAR bases)</span></Form.Label>
                                                        <Controller
                                                            name='nRRStimulusSize'
                                                            control={control}
                                                            render={({ field: { onChange, value, ref } }) => (
                                                                <Select
                                                                    placeholder='Select size of stimulus'
                                                                    ref={ref}
                                                                    defaultValue={eStimulusSizes[0]}
                                                                    options={eStimulusSizes}
                                                                    className={`react-select border-0 ${errors.nRRStimulusSize && 'error'}`}
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
                                                        {errors.nRRStimulusSize && (<Form.Control.Feedback type='invalid'>{errors.nRRStimulusSize.message}</Form.Control.Feedback>)}
                                                    </Form.Group>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} sm={12}>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{LABELS?.SHIP_SPEED}</Form.Label>
                                                        <Controller
                                                            name='nShipSpeed'
                                                            control={control}
                                                            render={({ field: { onChange, value, ref } }) => (
                                                                <Select
                                                                    placeholder='Select speed of ship'
                                                                    ref={ref}
                                                                    options={eShipSpeed}
                                                                    defaultValue={eShipSpeed[0]}
                                                                    className={`react-select border-0 ${errors.nShipSpeed && 'error'}`}
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
                                                        {errors.nShipSpeed && (<Form.Control.Feedback type='invalid'>{errors.nShipSpeed.message}</Form.Control.Feedback>)}
                                                    </Form.Group>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} sm={12}>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{LABELS?.POWERUP_DURATION}</Form.Label>
                                                        <Controller
                                                            name='sPowerDuration'
                                                            control={control}
                                                            render={({ field: { onChange, value, ref } }) => (
                                                                <Select
                                                                    placeholder='Select power up duration'
                                                                    ref={ref}
                                                                    options={ePowerUpDuration}
                                                                    defaultValue={ePowerUpDuration[0]}
                                                                    className={`react-select border-0 ${errors.sPowerDuration && 'error'}`}
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
                                                        {errors.sPowerDuration && (<Form.Control.Feedback type='invalid'>{errors.sPowerDuration.message}</Form.Control.Feedback>)}
                                                    </Form.Group>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} sm={12}>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{LABELS?.POWERUP_DELAY}</Form.Label>
                                                        <Controller
                                                            name='sPowerUpDelay'
                                                            control={control}
                                                            render={({ field: { onChange, value, ref } }) => (
                                                                <Select
                                                                    placeholder='Select next power up delay'
                                                                    ref={ref}
                                                                    options={ePowerUpDelay}
                                                                    defaultValue={ePowerUpDelay[0]}
                                                                    className={`react-select border-0 ${errors.sPowerUpDelay && 'error'}`}
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
                                                        {errors.sPowerUpDelay && (<Form.Control.Feedback type='invalid'>{errors.sPowerUpDelay.message}</Form.Control.Feedback>)}
                                                    </Form.Group>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} sm={12}>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{LABELS?.OBSTACLE_DELAY}</Form.Label>
                                                        <Controller
                                                            name='sObstacleDelay'
                                                            control={control}
                                                            render={({ field: { onChange, value, ref } }) => (
                                                                <Select
                                                                    placeholder='Select next obstacle delay'
                                                                    ref={ref}
                                                                    options={ePowerUpDelay}
                                                                    defaultValue={ePowerUpDelay[0]}
                                                                    className={`react-select border-0 ${errors.sObstacleDelay && 'error'}`}
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
                                                        {errors.sObstacleDelay && (<Form.Control.Feedback type='invalid'>{errors.sObstacleDelay.message}</Form.Control.Feedback>)}
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Wrapper>
                                    </motion.div>
                                }

                                {ringrunnerMode?.gabor &&
                                    <motion.div initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: ringrunnerMode?.gabor ? 1 : 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}>
                                        <Wrapper>
                                            <Row>
                                                <Col xxl={6} xl={6} lg={6} sm={12}>
                                                    <CommonInput
                                                        type='text'
                                                        register={register}
                                                        errors={errors}
                                                        className={`form-control ${errors?.sLocalOrientation && 'error'}`}
                                                        name='sLocalOrientation'
                                                        label={LABELS?.LOCAL_ORIENTATION}
                                                        placeholder='Enter local orientation in degree'
                                                        defaultValue='0'
                                                        validation={{
                                                            pattern: {
                                                                value: /^[0-9]+$/,
                                                                message: 'Only numbers are allowed'
                                                            },
                                                            max: {
                                                                value: 360,
                                                                message: 'Orientation must be less than 360 degree.'
                                                            }
                                                        }}
                                                        max={360}
                                                        maxLength={3}
                                                        onChange={(e) => {
                                                            e.target.value =
                                                                e.target.value?.trim() &&
                                                                e.target.value.replace(/^[a-zA-z]+$/g, '')
                                                        }}
                                                    />
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} sm={12}>
                                                    <CommonInput
                                                        type='text'
                                                        register={register}
                                                        errors={errors}
                                                        className={`form-control ${errors?.sGlobalOrientation && 'error'}`}
                                                        name='sGlobalOrientation'
                                                        label={LABELS?.GLOBAL_ORIENTATION}
                                                        placeholder='Enter global orientation in degree'
                                                        defaultValue='0'
                                                        validation={{
                                                            pattern: {
                                                                value: /^[0-9]+$/,
                                                                message: 'Only numbers are allowed'
                                                            },
                                                            max: {
                                                                value: 360,
                                                                message: 'Orientation must be less than 360 degree.'
                                                            }
                                                        }}
                                                        max={360}
                                                        maxLength={3}
                                                        onChange={(e) => {
                                                            e.target.value =
                                                                e.target.value?.trim() &&
                                                                e.target.value.replace(/^[a-zA-z]+$/g, '')
                                                        }}
                                                    />
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} sm={12}>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{LABELS?.GABOR_FREQUENCY}</Form.Label>
                                                        <Controller
                                                            name='nGaborFrequency'
                                                            control={control}
                                                            render={({ field: { onChange, value, ref } }) => (
                                                                <Select
                                                                    placeholder='Select gabor frequency'
                                                                    ref={ref}
                                                                    defaultValue={eGaborFrequency[0]}
                                                                    options={eGaborFrequency}
                                                                    className={`react-select border-0 ${errors.nGaborFrequency && 'error'}`}
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
                                                        {errors.nGaborFrequency && (<Form.Control.Feedback type='invalid'>{errors.nGaborFrequency.message}</Form.Control.Feedback>)}
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Wrapper>
                                    </motion.div>
                                }
                                <Row className='mt-3'>
                                    <Col sm={12}>
                                        <Button variant='primary' type='button' className='me-2 square' disabled={gameStarted} onClick={() => setGameStarted(true)}>
                                            Start Game
                                        </Button>
                                        <Button variant='secondary' type='button' className='square' disabled={!gameStarted} onClick={() => setGameStarted(false)}>
                                            End Game
                                        </Button>
                                    </Col>
                                </Row>
                            </Wrapper>
                        </motion.div>
                    </>
                )}
            </div >
        </>
    )
}

export default AntiSupGameSettings
