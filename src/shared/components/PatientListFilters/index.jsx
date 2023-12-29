/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { eDominantEyeOptions } from 'shared/constants/TableHeaders'

const PatientListFilters = ({ defaultValue, setRequestParams }) => {
    const { control, reset } = useForm({})

    const eStatusOption = [
        { label: 'All', value: '' },
        { label: 'Active', value: 'y' },
        { label: 'In-Active', value: 'n' },
        { label: 'Deleted', value: 'd' },
    ]

    useEffect(() => {
        reset({
            eDominantEye: eDominantEyeOptions?.find(item => item?.value === defaultValue?.eDominantEye),
            eStatus: eStatusOption?.find(item => item?.value === defaultValue?.eStatus)
        })
    }, [defaultValue])

    return (
        <>
            <Form className='patient-filter' autoComplete='off'>
                <Form.Group className='form-group'>
                    <Form.Label>
                        Dominant Eye
                    </Form.Label>
                    <Controller
                        name='eDominantEye'
                        control={control}
                        render={({ field: { onChange, value = [], ref } }) => (
                            <Select
                                ref={ref}
                                value={value}
                                options={eDominantEyeOptions}
                                className='react-select'
                                classNamePrefix='select'
                                closeMenuOnSelect={true}
                                onChange={(e) => {
                                    setRequestParams({ ...defaultValue, eDominantEye: e?.value })
                                    onChange(e)
                                }}
                            />
                        )}
                    />
                </Form.Group>

                <Form.Group className='form-group'>
                    <Form.Label>
                        Status
                    </Form.Label>
                    <Controller
                        name='eStatus'
                        control={control}
                        render={({ field: { onChange, value = [], ref } }) => (
                            <Select
                                ref={ref}
                                value={value}
                                options={eStatusOption}
                                className='react-select'
                                classNamePrefix='select'
                                closeMenuOnSelect={true}
                                onChange={(e) => {
                                    setRequestParams({ ...defaultValue, eStatus: e?.value })
                                    onChange(e)
                                }}
                            />
                        )}
                    />
                </Form.Group>
            </Form>
        </>
    )
}

PatientListFilters.propTypes = {
    setRequestParams: PropTypes.func,
    defaultValue: PropTypes.object,
}

export default PatientListFilters
