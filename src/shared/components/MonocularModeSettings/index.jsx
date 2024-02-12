import React, { useEffect, useState } from 'react'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'

const MonocularModeSettings = ({ control, errors, defaultData, reset }) => {
    const [monocularMode, setMonocularMode] = useState('y')

    const handleMonocularMode = (status, id) => {
        status ? setMonocularMode('y') : setMonocularMode('n')
    }

    useEffect(() => {
        reset({
            bMonocularMode: defaultData?.oSetting?.bMonocularMode
        })
    }, [defaultData, reset])
    return (
        <>
            <h3 className='data-title'><FontAwesomeIcon icon={faEye} color='var(--secondary-500)' size='sm' /> Monocular Mode</h3>
            <div className='line'></div>

            <div className='monocular-mode mt-2'>
                <Form.Group className='content'>
                    <Form.Label className='data-label'>Mode</Form.Label><br />
                    <Controller
                        name='bMonocularMode'
                        control={control}
                        render={({ field: { ref, onChange, value } }) => (
                            <Form.Check
                                ref={ref}
                                type='switch'
                                layout
                                name='bMonocularMode'
                                className='d-inline-block'
                                checked={monocularMode === 'y'}
                                value={value}
                                onChange={(e) => {
                                    handleMonocularMode(e.target.checked)
                                    onChange(e)
                                }}
                            />
                        )}
                    />
                    {errors.bMonocularMode && (<Form.Control.Feedback type='invalid'>{errors.bMonocularMode.message}</Form.Control.Feedback>)}
                </Form.Group>
            </div>
        </>
    )
}

export default MonocularModeSettings
