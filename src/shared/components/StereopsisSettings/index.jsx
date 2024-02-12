/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { FaPlay } from "react-icons/fa"
import { eBubbleGameMode, eBubbleImageSize, eBubblePattern, eShipSpeed, eSpawnRate } from 'shared/constants/TableHeaders'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import CommonInput from '../CommonInput'

const StereopsisSettings = ({ buttonToggle, setButtonToggle, control, errors, register, games, isLoading, gameStarted, setGameStarted, data }) => {
    const [tabButtons, setTabButtons] = useState([])
    const [modal, setModal] = useState(false)

    const BUBBLE_BURST_GAME_STRUCTURE = data?.find(item => item?.sName === 'bubbleBurst')

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
                    : tabButtons?.map((tab, index) => (
                        <Button key={index} className={buttonToggle[tab.key] ? 'square btn-primary' : 'square btn-secondary'} variant={buttonToggle[tab.key] ? 'primary' : 'secondary'} onClick={(e) => handleTabs(e, tab)} disabled={buttonToggle[tab.key] !== true && gameStarted}>
                            <FaPlay color='var(--text-hover)' /> {tab?.label}
                        </Button>
                    ))}

            </div>

            {buttonToggle?.bubbles && (
                <Modal show={modal?.type === 'bubbles'} onHide={(e) => handleClose(e)} id='game-setting-modal' size='lg'>
                    <Form className='step-one form-content' autoComplete='off'>
                        <Modal.Header closeButton>
                            <Modal.Title className='game-setting-modal-header'>{modal?.data?.label} Game Settings</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col xxl={6} xl={12} lg={6} sm={12}>
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
                                        defaultValue={BUBBLE_BURST_GAME_STRUCTURE?.nDuration}
                                        maxLength={2}
                                        onChange={(e) => {
                                            e.target.value =
                                                e.target.value?.trim() &&
                                                e.target.value.replace(/^[a-zA-z]+$/g, '')

                                            if (gameStarted) {
                                                setGameStarted(false)
                                            }
                                        }}
                                    />
                                </Col>
                                <Col xxl={6} xl={12} lg={6} sm={12}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.GAME_MODE}</Form.Label>
                                        <Controller
                                            name='sBubbleGameMode'
                                            control={control}
                                            render={({ field: { ref, onChange, value } }) => (
                                                <Select
                                                    ref={ref}
                                                    placeholder='Select bubble size'
                                                    defaultValue={eBubbleGameMode?.find(mode => mode?.value === BUBBLE_BURST_GAME_STRUCTURE?.sMode)}
                                                    options={eBubbleGameMode}
                                                    className={`react-select border-0 ${errors.sBubbleGameMode && 'error'}`}
                                                    classNamePrefix='select'
                                                    onChange={(e) => {
                                                        if (gameStarted) {
                                                            setGameStarted(false)
                                                        }
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
                                        {errors.sBubbleGameMode && (<Form.Control.Feedback type='invalid'>{errors.sBubbleGameMode.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col xxl={6} xl={12} lg={6} sm={12} className='mt-2'>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.PATTERN}</Form.Label>
                                        <Controller
                                            name='sBubblePattern'
                                            control={control}
                                            render={({ field: { ref, onChange, value } }) => (
                                                <Select
                                                    ref={ref}
                                                    placeholder='Select bubble distance'
                                                    options={eBubblePattern}
                                                    defaultValue={eBubblePattern?.find(mode => mode?.value === BUBBLE_BURST_GAME_STRUCTURE?.sPattern)}
                                                    className={`react-select border-0 ${errors.sBubblePattern && 'error'}`}
                                                    classNamePrefix='select'
                                                    onChange={(e) => {
                                                        if (gameStarted) {
                                                            setGameStarted(false)
                                                        }
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

                                <Col xxl={6} xl={12} lg={6} sm={12} className='mt-2'>
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
                                                    defaultValue={eBubbleImageSize?.find(size => size?.value === BUBBLE_BURST_GAME_STRUCTURE?.nImageSize)}
                                                    className={`react-select border-0 ${errors.nBubbleStimulusSize && 'error'}`}
                                                    classNamePrefix='select'
                                                    onChange={(e) => {
                                                        if (gameStarted) {
                                                            setGameStarted(false)
                                                        }
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

                                <Col xxl={6} xl={12} lg={6} sm={12} className='mt-2'>
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
                                                    defaultValue={eSpawnRate?.find(size => size?.value === BUBBLE_BURST_GAME_STRUCTURE?.sSepration)}
                                                    className={`react-select border-0 ${errors.sBubbleSeperation && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    onChange={(e) => {
                                                        if (gameStarted) {
                                                            setGameStarted(false)
                                                        }
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

                                <Col xxl={6} xl={12} lg={6} sm={12} className='mt-2'>
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
                                                    defaultValue={eSpawnRate?.find(size => size?.value === BUBBLE_BURST_GAME_STRUCTURE?.sDisparity)}
                                                    className={`react-select border-0 ${errors.sBubbleDisparity && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    onChange={(e) => {
                                                        if (gameStarted) {
                                                            setGameStarted(false)
                                                        }
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

                                <Col xxl={6} xl={12} lg={6} sm={12} className='mt-2'>
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
                                                    defaultValue={eShipSpeed?.find(speed => speed?.value === BUBBLE_BURST_GAME_STRUCTURE?.sDisparity)}
                                                    className={`react-select border-0 ${errors.nPanelDistance && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    onChange={(e) => {
                                                        if (gameStarted) {
                                                            setGameStarted(false)
                                                        }
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
                            <Button variant='primary' type='button' className='me-2 square' disabled={gameStarted} onClick={() => setGameStarted(true)}>
                                Start Game
                            </Button>
                            <Button variant='secondary' type='button' className='square' disabled={!gameStarted} onClick={() => setGameStarted(false)}>
                                End Game
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            )}
        </>
    )
}

export default StereopsisSettings
