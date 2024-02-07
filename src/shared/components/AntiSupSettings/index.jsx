import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Slider } from '@mui/material'
import { SLIDER_STYLE } from 'shared/constants'

const AntiSupSettings = ({ control, settings, setSettings }) => {
    const LABELS = {
        TITLE: 'Anti Suppresion',
        CONTRAST_LEVEL: 'Contrast Level',
        OCCLUSION_LEVEL: 'Occlusion Level',
        BLUR_LEVEL: 'Blur Level'
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

            <div className='slider-input mt-2'>
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

            <div className='slider-input mt-2'>
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
                                max={10}
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
