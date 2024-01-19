import React from 'react'
import Wrapper from '../Wrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

const AntiSupSettings = ({ control, settings, setSettings }) => {
    const LABELS = {
        TITLE: 'Anti Suppresion',
        CONTRAST_LEVEL: 'Contrast Level',
        OCCLUSION_LEVEL: 'Occlusion Level',
        BLUR_LEVEL: 'Blur Level'
    }
    return (
        <>
            <Wrapper>
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
                            render={({ field: { onChange, value } }) => (
                                <RangeSlider
                                    value={value}
                                    onChange={e => {
                                        setSettings({ ...settings, contrast: +e.target.value })
                                        onChange(e)
                                    }}
                                    defaultValue={settings?.contrast}
                                    min={0}
                                    max={100}
                                    tooltipLabel={currentValue => `${currentValue || 0}%`}
                                    tooltipPlacement='top'
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
                            render={({ field: { onChange, value } }) => (
                                <RangeSlider
                                    value={value}
                                    onChange={e => {
                                        setSettings({ ...settings, occlusion: +e.target.value })
                                        onChange(e)
                                    }}
                                    min={0}
                                    max={100}
                                    defaultValue={settings?.occlusion}
                                    tooltipLabel={currentValue => `${currentValue || 0}%`}
                                    tooltipPlacement='top'
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
                            render={({ field: { onChange, value } }) => (
                                <RangeSlider
                                    value={value}
                                    onChange={e => {
                                        setSettings({ ...settings, nBlur: +e.target.value })
                                        onChange(e)
                                    }}
                                    min={0}
                                    max={100}
                                    defaultValue={settings?.blur}
                                    tooltipLabel={currentValue => `${currentValue || 0}%`}
                                    tooltipPlacement='top'
                                />
                            )}
                        />
                    </Form.Group>
                </div>
            </Wrapper>
        </>
    )
}

AntiSupSettings.propTypes = {
    settings: PropTypes.object,
    setSettings: PropTypes.func
}

export default AntiSupSettings
