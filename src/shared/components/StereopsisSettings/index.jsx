/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Wrapper from '../Wrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaPlay } from "react-icons/fa"
import { eBubbleDistance, eHoopSize } from 'shared/constants/TableHeaders'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import CommonInput from '../CommonInput'

const StereopsisSettings = ({ buttonToggle, setButtonToggle, control, errors, register, games, isLoading }) => {
    const tab_buttons = [
        { key: 'bubble', label: 'Bubble' },
    ]

    const [tabButtons, setTabButtons] = useState(tab_buttons)

    useEffect(() => {
        if (!games) {
            return;
        }

        const gameTabs = games?.filter(game => game?.eCategory === 'stereopsis')?.map(game => ({ key: game?.sName?.toLowerCase(), label: game?.sName }))
        const modifiedTabs = [...tab_buttons, ...(gameTabs || [])]
        setTabButtons(modifiedTabs)
    }, [games])

    const LABELS = {
        TITLE: 'Stereopsis',
        BUBBLE_SIZE: 'Bubble Size',
        BUBBLE_DISTANCE: 'Bubble Distance',
        GABOR_PATCH: 'No. of Gabor Patch',
        ARM_LENGTH: 'Arm Length'
    }
    return (
        <>
            <Wrapper>
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
                            <Button key={index} className={buttonToggle[tab.key] ? 'square btn-primary' : 'square btn-secondary'} variant={buttonToggle[tab.key] ? 'primary' : 'secondary'} onClick={() => setButtonToggle({ [tab.key]: true })}>
                                <FaPlay color='var(--text-hover)' /> {tab?.label}
                            </Button>
                        ))}

                    {buttonToggle?.bubble && (
                        <div className='mt-3 form-content'>
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
                                                        options={eHoopSize}
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
                                        <CommonInput
                                            type='text'
                                            register={register}
                                            errors={errors}
                                            className={`form-control ${errors?.sAge && 'error'}`}
                                            name='nGaborPatch'
                                            label={LABELS?.GABOR_PATCH}
                                            placeholder='Enter no. of gabor patch in last level'
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
                                            <Form.Label>{LABELS?.ARM_LENGTH}</Form.Label>
                                            <Row className='mt-2'>
                                                <Col sm={6}>
                                                    <Controller
                                                        name='sChildArmLength'
                                                        control={control}
                                                        render={({ field: { ref, value, onChange } }) => {
                                                            return (
                                                                <Form.Check
                                                                    className='form-check checkbox-wrap m-0'
                                                                    type='radio'
                                                                    ref={ref}
                                                                    id='child'
                                                                    name='armLength'
                                                                    value={value}
                                                                    checked={value === true}
                                                                    onChange={() => onChange(true)}
                                                                    label='Child'
                                                                />
                                                            )
                                                        }
                                                        }
                                                    />
                                                </Col>
                                                <Col sm={6}>
                                                    <Controller
                                                        name='sAdultArmLength'
                                                        control={control}
                                                        render={({ field: { ref, value, onChange } }) => {
                                                            return (
                                                                <Form.Check
                                                                    className='form-check checkbox-wrap m-0'
                                                                    type='radio'
                                                                    id='adult'
                                                                    ref={ref}
                                                                    value={value}
                                                                    name='armLength'
                                                                    checked={value === true}
                                                                    onChange={() => onChange(true)}
                                                                    label='Adult'
                                                                />
                                                            )
                                                        }}
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
