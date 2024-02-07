/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Wrapper from '../Wrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaPlay } from "react-icons/fa"
import { eBubbleGameMode, eBubbleImageSize, eBubblePattern, eSpawnRate } from 'shared/constants/TableHeaders'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import CommonInput from '../CommonInput'
import { motion } from 'framer-motion'

const StereopsisSettings = ({ buttonToggle, setButtonToggle, control, errors, register, games, isLoading, gameStarted, setGameStarted }) => {
    const [tabButtons, setTabButtons] = useState([])

    useEffect(() => {
        if (!games) {
            return;
        }

        const gameTabs = games?.filter(game => game?.eCategory === 'stereopsis')?.map(game => ({ key: game?.sName?.toLowerCase(), label: game?.sName }))
        console.log('gameTabs: ', gameTabs);
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
        DISPARITY: 'Disparity'
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
                        <Button key={index} className={buttonToggle[tab.key] ? 'square btn-primary' : 'square btn-secondary'} variant={buttonToggle[tab.key] ? 'primary' : 'secondary'} onClick={() => setButtonToggle({ [tab.key]: true })} disabled={buttonToggle[tab.key] !== true && gameStarted}>
                            <FaPlay color='var(--text-hover)' /> {tab?.label}
                        </Button>
                    ))}

                {buttonToggle?.bubbles && (
                    <motion.div className='mt-3 form-content' initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: buttonToggle?.bubbles ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}>
                        <Wrapper>
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
                                        maxLength={2}
                                        onChange={(e) => {
                                            e.target.value =
                                                e.target.value?.trim() &&
                                                e.target.value.replace(/^[a-zA-z]+$/g, '')
                                        }}
                                    />
                                </Col>
                                <Col xxl={6} xl={12} lg={6} sm={12}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.GAME_MODE}</Form.Label>
                                        <Controller
                                            name='sBubbleGameMode'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder='Select bubble size'
                                                    defaultValue={eBubbleGameMode[0]}
                                                    options={eBubbleGameMode}
                                                    className={`react-select border-0 ${errors.sBubbleGameMode && 'error'}`}
                                                    classNamePrefix='select'
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

                                <Col xxl={6} xl={12} lg={6} sm={12}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.PATTERN}</Form.Label>
                                        <Controller
                                            name='sBubblePattern'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder='Select bubble distance'
                                                    options={eBubblePattern}
                                                    defaultValue={eBubblePattern[0]}
                                                    className={`react-select border-0 ${errors.sBubblePattern && 'error'}`}
                                                    classNamePrefix='select'
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

                                <Col xxl={6} xl={12} lg={6} sm={12}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.STIMULUS_SIZE} <span className='subTitle'>(LogMAR bases)</span></Form.Label>
                                        <Controller
                                            name='nBubbleImageSize'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder='Select bubble distance'
                                                    options={eBubbleImageSize}
                                                    defaultValue={eBubbleImageSize[0]}
                                                    className={`react-select border-0 ${errors.nBubbleImageSize && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.nBubbleImageSize && (<Form.Control.Feedback type='invalid'>{errors.nBubbleImageSize.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col xxl={6} xl={12} lg={6} sm={12}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.SEPERATION}</Form.Label>
                                        <Controller
                                            name='sBubbleSeperation'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder='Select bubble distance'
                                                    options={eSpawnRate}
                                                    defaultValue={eSpawnRate[0]}
                                                    className={`react-select border-0 ${errors.sBubbleSeperation && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.sBubbleSeperation && (<Form.Control.Feedback type='invalid'>{errors.sBubbleSeperation.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Col xxl={6} xl={12} lg={6} sm={12}>
                                    <Form.Group className='form-group'>
                                        <Form.Label>{LABELS?.DISPARITY}</Form.Label>
                                        <Controller
                                            name='sBubbleDisparity'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder='Select bubble distance'
                                                    options={eSpawnRate}
                                                    defaultValue={eSpawnRate[0]}
                                                    className={`react-select border-0 ${errors.sBubbleDisparity && 'error'}`}
                                                    classNamePrefix='select'
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                        {errors.sBubbleDisparity && (<Form.Control.Feedback type='invalid'>{errors.sBubbleDisparity.message}</Form.Control.Feedback>)}
                                    </Form.Group>
                                </Col>

                                <Row className='mt-1'>
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
            </div>
        </>
    )
}

export default StereopsisSettings
