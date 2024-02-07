import React from 'react'
import { faArrowsToEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Slider } from '@mui/material'
import { Button, Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import { SLIDER_STYLE } from 'shared/constants'
import { motion } from 'framer-motion'

const VergenceSettings = ({ control, vergenceToggle, setVergenceToggle, horizontalSettings, setHorizontalSettings, verticalSettings, setVerticalSettings }) => {
    const tabs = [
        { key: 'horizontal', label: 'Horizontal' },
        { key: 'vertical', label: 'Vertical' },
    ]
    return (
        <>
            <h3 className='data-title'><FontAwesomeIcon icon={faArrowsToEye} color='var(--secondary-500)' size='sm' /> Vergence</h3>
            <div className='line'></div>

            <div className='d-flex justify-content-center'>
                <div className='tabs'>
                    {tabs?.map(tab => (
                        <motion.div key={tab.key}
                            whileTap={{ scale: 0.9 }}
                            className='tab-wrapper'>
                            <Button type='button' className={`${vergenceToggle[tab?.key] ? 'checked' : ''}`} onClick={() => setVergenceToggle({ [tab?.key]: true })}>
                                <span className='tab'>{tab?.label}</span>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {vergenceToggle?.horizontal && <motion.div className='horizontal-content' initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: vergenceToggle?.horizontal ? 1 : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}>
                <div className='slider-input mt-3'>
                    <Form.Group>
                        <Form.Label className='slider-label'>
                            <span>Left Eye</span>
                            <span className='value'>{horizontalSettings?.left}</span>
                        </Form.Label>
                        <Controller
                            name='nHorizontalLeft'
                            control={control}
                            defaultValue={horizontalSettings?.left}
                            render={({ field: { onChange, value, ref } }) => (
                                <Slider
                                    ref={ref}
                                    defaultValue={horizontalSettings?.left}
                                    valueLabelDisplay="auto"
                                    value={value}
                                    onChange={e => {
                                        setHorizontalSettings({ ...horizontalSettings, left: +e.target.value })
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
                            <span className='value'>{horizontalSettings?.right}</span>
                        </Form.Label>
                        <Controller
                            name='nHorizontalRight'
                            control={control}
                            defaultValue={horizontalSettings?.right}
                            render={({ field: { onChange, value, ref } }) => (
                                <Slider
                                    ref={ref}
                                    defaultValue={horizontalSettings?.right}
                                    valueLabelDisplay="auto"
                                    value={value}
                                    onChange={e => {
                                        setHorizontalSettings({ ...horizontalSettings, right: +e.target.value })
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
            </motion.div>}

            {vergenceToggle?.vertical && <motion.div className='vertical-content' initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: vergenceToggle?.vertical ? 1 : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}>
                <div className='slider-input mt-3'>
                    <Form.Group>
                        <Form.Label className='slider-label'>
                            <span>Left Eye</span>
                            <span className='value'>{verticalSettings?.left}</span>
                        </Form.Label>
                        <Controller
                            name='nVerticalLeft'
                            control={control}
                            defaultValue={verticalSettings?.left}
                            render={({ field: { onChange, value, ref } }) => (
                                <Slider
                                    ref={ref}
                                    defaultValue={verticalSettings?.left}
                                    valueLabelDisplay="auto"
                                    value={value}
                                    onChange={e => {
                                        setVerticalSettings({ ...verticalSettings, left: +e.target.value })
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
                            <span className='value'>{verticalSettings?.right}</span>
                        </Form.Label>
                        <Controller
                            name='nVerticalRight'
                            control={control}
                            defaultValue={verticalSettings?.right}
                            render={({ field: { onChange, value, ref } }) => (
                                <Slider
                                    ref={ref}
                                    defaultValue={verticalSettings?.right}
                                    valueLabelDisplay="auto"
                                    value={value}
                                    onChange={e => {
                                        setVerticalSettings({ ...verticalSettings, right: +e.target.value })
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
            </motion.div>}
        </>
    )
}

export default VergenceSettings
