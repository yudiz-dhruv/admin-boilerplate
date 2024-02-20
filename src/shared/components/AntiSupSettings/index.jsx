import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Slider } from '@mui/material'
import { SLIDER_STYLE } from 'shared/constants'
import { useGlobalSettings } from 'shared/hooks/useGlobalSettings'

const AntiSupSettings = ({ control, watch }) => {
    const { antiSupSettings, setAntiSupSettings } = useGlobalSettings(watch)

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
                        <span className='value'>{antiSupSettings?.contrast}</span>
                    </Form.Label>
                    <Controller
                        name='nContrast'
                        control={control}
                        defaultValue={antiSupSettings?.contrast}
                        render={({ field: { onChange, value } }) => (
                            <Slider
                                defaultValue={antiSupSettings?.contrast}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={e => {
                                    setAntiSupSettings({ ...antiSupSettings, contrast: +e.target.value })
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
                        <span className='value'>{antiSupSettings?.occlusion}</span>
                    </Form.Label>
                    <Controller
                        name='nOcclusion'
                        control={control}
                        defaultValue={antiSupSettings?.occlusion}
                        render={({ field: { onChange, value } }) => (
                            <Slider
                                defaultValue={antiSupSettings?.occlusion}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={e => {
                                    setAntiSupSettings({ ...antiSupSettings, occlusion: +e.target.value })
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
                        <span className='value'>{antiSupSettings?.blur}</span>
                    </Form.Label>
                    <Controller
                        name='nBlur'
                        control={control}
                        defaultValue={antiSupSettings?.blur}
                        render={({ field: { onChange, value } }) => (
                            <Slider
                                defaultValue={antiSupSettings?.blur}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={e => {
                                    setAntiSupSettings({ ...antiSupSettings, blur: +e.target.value })
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
    antiSupSettings: PropTypes.object,
    setAntiSupSettings: PropTypes.func
}

export default AntiSupSettings
