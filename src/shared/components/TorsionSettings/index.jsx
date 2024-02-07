import React from 'react'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import { Slider } from '@mui/material'
import { SLIDER_STYLE } from 'shared/constants'

const TorsionSettings = ({ control, settings, setSettings, errors }) => {
    return (
        <>
            <h3 className='data-title'><FontAwesomeIcon icon={faArrowsRotate} color='var(--secondary-500)' size='sm' /> Torsion</h3>
            <div className='line'></div>

            <div className='slider-input mt-3'>
                <Form.Group>
                    <Form.Label className='slider-label'>
                        <span>Left Eye</span>
                        <span className='value'>{settings?.left}</span>
                    </Form.Label>
                    <Controller
                        name='nTorsionLeft'
                        control={control}
                        defaultValue={settings?.left}
                        render={({ field: { onChange, value } }) => (
                            <Slider
                                defaultValue={settings?.left}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={e => {
                                    setSettings({ ...settings, left: +e.target.value })
                                    onChange(e)
                                }}
                                min={-20}
                                max={20}
                                sx={SLIDER_STYLE}
                            />
                        )}
                    />
                </Form.Group>
            </div>

            <div className='slider-input'>
                <Form.Group>
                    <Form.Label className='slider-label'>
                        <span>Right Eye</span>
                        <span className='value'>{settings?.right}</span>
                    </Form.Label>
                    <Controller
                        name='nTorsionRight'
                        control={control}
                        defaultValue={settings?.right}
                        render={({ field: { onChange, value } }) => (
                            <Slider
                                defaultValue={settings?.right}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={e => {
                                    setSettings({ ...settings, right: +e.target.value })
                                    onChange(e)
                                }}
                                min={-20}
                                max={20}
                                sx={SLIDER_STYLE}
                            />
                        )}
                    />
                </Form.Group>
            </div>
        </>
    )
}

export default TorsionSettings
