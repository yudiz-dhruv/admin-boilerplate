import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Slider } from '@mui/material'

const AntiSupSettings = ({ control, settings, setSettings }) => {
    const LABELS = {
        TITLE: 'Anti Suppresion',
        CONTRAST_LEVEL: 'Contrast Level',
        OCCLUSION_LEVEL: 'Occlusion Level',
        BLUR_LEVEL: 'Blur Level'
    }

    const SLIDER_STYLE = {
        width: '96%',
        margin: '0 8px',
        color: '#008d74',
        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-thumb': {
            border: '2px solid #008d74',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
            },
            '&::before': {
                display: 'none',
            },
        },
        '& .MuiSlider-valueLabel': {
            lineHeight: 1.2,
            fontSize: 12,
            background: 'unset',
            padding: 0,
            width: 32,
            height: 32,
            fontWeight: 'bolder',
            borderRadius: '50% 50% 50% 0',
            backgroundColor: 'rgb(0, 191, 127)',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&::before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -90%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        },
    }
    return (
        <>
            <h3 className='data-title'><FontAwesomeIcon icon={faGear} color='var(--secondary-500)' size='sm' /> {LABELS?.TITLE}</h3>
            <div className='line'></div>

            <div className='slider-input'>
                <Form.Group>
                    <Form.Label className='slider-label'>
                        <span>{LABELS?.CONTRAST_LEVEL}</span>
                        <span className='value'>{settings?.contrast}</span>
                    </Form.Label>
                    <Controller
                        name='nContrast'
                        control={control}
                        defaultValue={settings?.contrast}
                        render={({ field: { onChange, value } }) => (
                            <Slider
                                defaultValue={settings?.contrast}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={e => {
                                    setSettings({ ...settings, contrast: +e.target.value })
                                    onChange(e)
                                }}
                                min={0}
                                max={100}
                                sx={SLIDER_STYLE}
                            />
                        )}
                    />
                </Form.Group>
            </div>

            <div className='slider-input mt-3'>
                <Form.Group>
                    <Form.Label className='slider-label'>
                        <span>{LABELS?.OCCLUSION_LEVEL}</span>
                        <span className='value'>{settings?.occlusion}</span>
                    </Form.Label>
                    <Controller
                        name='nOcclusion'
                        control={control}
                        defaultValue={settings?.occlusion}
                        render={({ field: { onChange, value } }) => (
                            <Slider
                                defaultValue={settings?.occlusion}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={e => {
                                    setSettings({ ...settings, occlusion: +e.target.value })
                                    onChange(e)
                                }}
                                min={0}
                                max={100}
                                sx={SLIDER_STYLE}
                            />
                        )}
                    />
                </Form.Group>
            </div>

            <div className='slider-input mt-3'>
                <Form.Group>
                    <Form.Label className='slider-label'>
                        <span>{LABELS?.BLUR_LEVEL}</span>
                        <span className='value'>{settings?.blur}</span>
                    </Form.Label>
                    <Controller
                        name='nBlur'
                        control={control}
                        defaultValue={settings?.blur}
                        render={({ field: { onChange, value } }) => (
                            <Slider
                                defaultValue={settings?.blur}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={e => {
                                    setSettings({ ...settings, blur: +e.target.value })
                                    onChange(e)
                                }}
                                min={0}
                                max={100}
                                sx={SLIDER_STYLE}
                            />
                        )}
                    />
                </Form.Group>
            </div>
        </>
    )
}

AntiSupSettings.propTypes = {
    settings: PropTypes.object,
    setSettings: PropTypes.func
}

export default AntiSupSettings
