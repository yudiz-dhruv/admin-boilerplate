/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { eGameCategoryFilter } from 'shared/constants/TableHeaders'

const GamelistFilters = ({ defaultValue, setRequestParams }) => {
    const { control, reset } = useForm({})

    const eStatusOption = [
        { label: 'All', value: '' },
        { label: 'Active', value: 'y' },
        { label: 'In-Active', value: 'n' },
        { label: 'Deleted', value: 'd' },
    ]

    useEffect(() => {
        reset({
            eStatus: eStatusOption?.find(item => item?.value === defaultValue?.eStatus),
            eCategory: eGameCategoryFilter?.find(item => item?.value === defaultValue?.eCategory),
        })
    }, [defaultValue])

    return (
        <>
            <Form className='patient-filter' autoComplete='off'>
                <Form.Group className='form-group'>
                    <Form.Label>
                        Category
                    </Form.Label>
                    <Controller
                        name='eCategory'
                        control={control}
                        render={({ field: { onChange, value = [], ref } }) => (
                            <Select
                                ref={ref}
                                value={value}
                                options={eGameCategoryFilter}
                                className='react-select'
                                classNamePrefix='select'
                                closeMenuOnSelect={true}
                                onChange={(e) => {
                                    setRequestParams({ ...defaultValue, eCategory: e?.value })
                                    onChange(e)
                                }}
                            />
                        )}
                    />
                </Form.Group>
            </Form>

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

GamelistFilters.propTypes = {
    setRequestParams: PropTypes.func,
    defaultValue: PropTypes.object,
}

export default GamelistFilters
