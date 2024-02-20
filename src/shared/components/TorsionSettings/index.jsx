import React from 'react'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import { Slider } from '@mui/material'
import { SLIDER_STYLE } from 'shared/constants'
import { useGlobalSettings } from 'shared/hooks/useGlobalSettings'

const TorsionSettings = ({ control, watch }) => {
    const { torsionSettings, setTorsionSettings } = useGlobalSettings(watch)

    return (
        <>
            <h3 className='data-title'><FontAwesomeIcon icon={faArrowsRotate} color='var(--secondary-500)' size='sm' /> Torsion</h3>
            <div className='line'></div>

            <div className='slider-input mt-3'>
                <Form.Group>
                    <Form.Label className='slider-label'>
                        <span>Left Eye</span>
                        <span className='value'>{torsionSettings?.left}</span>
                    </Form.Label>
                    <Controller
                        name='nTorsionLeft'
                        control={control}
                        defaultValue={torsionSettings?.left}
                        render={({ field: { onChange, value } }) => (
                            <Slider
                                defaultValue={torsionSettings?.left}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={e => {
                                    setTorsionSettings({ ...torsionSettings, left: +e.target.value })
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
                        <span className='value'>{torsionSettings?.right}</span>
                    </Form.Label>
                    <Controller
                        name='nTorsionRight'
                        control={control}
                        defaultValue={torsionSettings?.right}
                        render={({ field: { onChange, value } }) => (
                            <Slider
                                defaultValue={torsionSettings?.right}
                                valueLabelDisplay="auto"
                                value={value}
                                onChange={e => {
                                    setTorsionSettings({ ...torsionSettings, right: +e.target.value })
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
