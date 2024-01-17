/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

const AdminListFilters = ({ defaultValue, setRequestParams }) => {
    const { control, reset } = useForm({})

    const eStatusOption = [
        { label: 'All', value: '' },
        { label: 'Active', value: 'y' },
        { label: 'In-Active', value: 'n' },
    ]

    useEffect(() => {
        reset({
            eStatus: eStatusOption?.find(item => item?.value === defaultValue?.eStatus),
        })
    }, [defaultValue])
    return (
        <>
            <Form className='patient-filter' autoComplete='off'>
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

export default AdminListFilters
