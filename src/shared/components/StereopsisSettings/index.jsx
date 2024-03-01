/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { FaPause, FaPlay } from "react-icons/fa"
import { eBubbleImageSize, eBubblePattern, eShipSpeed, eSpawnRate } from 'shared/constants/TableHeaders'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import CommonInput from '../CommonInput'
import { useBubbleSetting } from 'shared/hooks/useBubbleSettings'
import { motion } from 'framer-motion'
import { FormattedMessage } from 'react-intl'

const StereopsisSettings = ({ buttonToggle, setButtonToggle, control, errors, register, games, isLoading, gameStarted, handleStartGame, handleEndGame, modal, setModal, watch, bubbleMode, setBubbleMode }) => {
    const [tabButtons, setTabButtons] = useState([])

    const { BUBBLES_GAME_STRUCTURE } = useBubbleSetting(watch)

    useEffect(() => {
        if (!games) {
            return;
        }

        const gameTabs = games?.filter(game => game?.eCategory === 'stereopsis')?.map(game => ({ key: game?.sName?.toLowerCase(), label: game?.sName }))
        const modifiedTabs = [...(gameTabs || [])]
        setTabButtons(modifiedTabs)
    }, [games])

    const LABELS = {
        TITLE: 'Stereopsis',
        GAME_DURATION: 'Game Duration',
        GAME_MODE: 'Game Mode',
        PATTERN: 'Pattern',
        STIMULUS_SIZE: 'Stimulus Size',
        SEPERATION: 'Seperation',
        DISPARITY: 'Disparity',
        PANEL_DISTANCE: 'Panel Distance'
    }

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
            <h3 className='game-title'><FontAwesomeIcon icon={faCube} color='var(--secondary-500)' size='sm' /> {LABELS?.TITLE}</h3>
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
                    : (tabButtons?.length > 0) ? tabButtons?.map((tab, index) => (
                        <Button key={index} className={buttonToggle[tab.key] ? 'startedGame' : 'tabButton'} variant={buttonToggle[tab.key] ? 'primary' : 'secondary'} onClick={(e) => handleTabs(e, tab)} disabled={buttonToggle[tab.key] !== true && gameStarted}>
                            {(buttonToggle[tab.key] && gameStarted) ? (<><FaPause color='var(--text-hover)' /> {tab?.label}</>) : (<><FaPlay color='var(--text-hover)' /> {tab?.label}</>)}
                        </Button>
                    )) : <span className='no-games'><FormattedMessage id='noStereopsisGame' /></span>
                }

            </div>

            {buttonToggle?.bubbles && (
                <Modal show={modal?.type === 'bubbles'} onHide={(e) => handleClose(e)} id='game-setting-modal' size='lg'>
                    <Form className='step-one form-content' autoComplete='off'>
                        <Modal.Header closeButton>
                            <Modal.Title className='game-setting-modal-header'>{modal?.data?.label} Game Settings</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col md={6} sm={12}>
                                    <CommonInput
                                        label={LABELS?.GAME_DURATION}
                                        type='text'
                                        register={register}
                                        errors={errors}
                                        className={`form-control ${errors?.sGameDuration && 'error'}`}
                                        name='sBubbleGameDuration'
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
                                        }}
                                        disabled={gameStarted}
                                        defaultValue={BUBBLES_GAME_STRUCTURE?.nDuration}
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
                                    <Form.Group className='form-group ringRunner'>
                                        <Form.Label>{LABELS?.GAME_MODE}</Form.Label>
                                        <div className='tabs'>
                                            <motion.div
                                                whileTap={{ scale: 0.9 }}>
                                                <Button type='button' className={`${bubbleMode?.series ? 'checked' : ''}`} onClick={() => {
                                                    setBubbleMode({ series: true, oddOneOut: false })
                                                    // if (gameStarted) {
                                                    //     setGameStarted(false)
                                                    // }
                                                }}
                                                    disabled={gameStarted}
                                                >
                                                    <span className='tab'>Series</span>
                                                </Button>
                                            </motion.div>

                                            <motion.div
                                                whileTap={{ scale: 0.9 }}>
                                                <Button type='button' className={`${bubbleMode?.oddOneOut ? 'checked' : ''}`} onClick={() => {
                                                    setBubbleMode({ series: false, oddOneOut: true })
                                                    // if (gameStarted) {
                                                    //     setGameStarted(false)
                                                    // }
                                                }}
                                                    disabled={gameStarted}
                                                >
                                                    <span className='tab'>Odd One Out</span>
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </Form.Group>
                                </Col>

                                <Col md={6} sm={12} className='mt-2'>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.PATTERN}</Form.Label>
                                        <Controller
                                            name='sBubblePattern'
                                            control={control}
                                            render={({ field: { ref, onChange, value } }) => (
                                                <Select
                                                    ref={ref}
                                                    placeholder='Select bubble distance'
                                                    options={bubbleMode?.series ? eBubblePattern : eBubblePattern?.slice(1)}
                                                    defaultValue={eBubblePattern?.find(mode => mode?.value === BUBBLES_GAME_STRUCTURE?.sPattern)}
                                                    className={`react-select border-0 ${errors.sBubblePattern && 'error'}`}
                                                    classNamePrefix='select'
                                                    onChange={(e) => {
                                                        // if (gameStarted) {
                                                        //     setGameStarted(false)
                                                        // }
                                                        onChange(e)
                                                    }}
                                                    value={value}
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.sBubblePattern && (<Form.Control.Feedback type='invalid'>{errors.sBubblePattern.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col md={6} sm={12} className='mt-2'>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.STIMULUS_SIZE} <span className='subTitle'>(LogMAR bases)</span></Form.Label>
                                        <Controller
                                            name='nBubbleStimulusSize'
                                            control={control}
                                            render={({ field: { ref, onChange, value } }) => (
                                                <Select
                                                    ref={ref}
                                                    placeholder='Select bubble distance'
                                                    options={eBubbleImageSize}
                                                    defaultValue={eBubbleImageSize?.find(size => size?.value === BUBBLES_GAME_STRUCTURE?.nStimulusSize)}
                                                    className={`react-select border-0 ${errors.nBubbleStimulusSize && 'error'}`}
                                                    classNamePrefix='select'
                                                    onChange={(e) => {
                                                        // if (gameStarted) {
                                                        //     setGameStarted(false)
                                                        // }
                                                        onChange(e)
                                                    }}
                                                    value={value}
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.nBubbleStimulusSize && (<Form.Control.Feedback type='invalid'>{errors.nBubbleStimulusSize.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col md={6} sm={12} className='mt-2'>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.SEPERATION}</Form.Label>
                                        <Controller
                                            name='sBubbleSeperation'
                                            control={control}
                                            render={({ field: { ref, onChange, value } }) => (
                                                <Select
                                                    ref={ref}
                                                    placeholder='Select bubble distance'
                                                    options={eSpawnRate}
                                                    defaultValue={eSpawnRate?.find(size => size?.value === BUBBLES_GAME_STRUCTURE?.sSepration)}
                                                    className={`react-select border-0 ${errors.sBubbleSeperation && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    onChange={(e) => {
                                                        // if (gameStarted) {
                                                        //     setGameStarted(false)
                                                        // }
                                                        onChange(e)
                                                    }}
                                                    value={value}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.sBubbleSeperation && (<Form.Control.Feedback type='invalid'>{errors.sBubbleSeperation.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col md={6} sm={12} className='mt-2'>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.DISPARITY}</Form.Label>
                                        <Controller
                                            name='sBubbleDisparity'
                                            control={control}
                                            render={({ field: { ref, onChange, value } }) => (
                                                <Select
                                                    ref={ref}
                                                    placeholder='Select bubble distance'
                                                    options={eSpawnRate}
                                                    defaultValue={eSpawnRate?.find(size => size?.value === BUBBLES_GAME_STRUCTURE?.sDisparity)}
                                                    className={`react-select border-0 ${errors.sBubbleDisparity && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    onChange={(e) => {
                                                        // if (gameStarted) {
                                                        //     setGameStarted(false)
                                                        // }
                                                        onChange(e)
                                                    }}
                                                    value={value}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.sBubbleDisparity && (<Form.Control.Feedback type='invalid'>{errors.sBubbleDisparity.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col md={6} sm={12} className='mt-2'>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.PANEL_DISTANCE}</Form.Label>
                                        <Controller
                                            name='nPanelDistance'
                                            control={control}
                                            render={({ field: { ref, onChange, value } }) => (
                                                <Select
                                                    ref={ref}
                                                    placeholder='Select panel distance'
                                                    options={eShipSpeed}
                                                    defaultValue={eShipSpeed?.find(speed => speed?.value === BUBBLES_GAME_STRUCTURE?.nPanelDistance)}
                                                    className={`react-select border-0 ${errors.nPanelDistance && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    onChange={(e) => {
                                                        // if (gameStarted) {
                                                        //     setGameStarted(false)
                                                        // }
                                                        onChange(e)
                                                    }}
                                                    value={value}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.nPanelDistance && (<Form.Control.Feedback type='invalid'>{errors.nPanelDistance.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>
                            </Row>
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
            )}
        </>
    )
}

export default StereopsisSettings
