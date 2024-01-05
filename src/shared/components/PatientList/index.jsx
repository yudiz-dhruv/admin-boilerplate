import React, { useState } from 'react'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { route } from 'shared/constants/AllRoutes'

const PatientList = ({ key, index, patient, onDelete, updateMutate }) => {
    const navigate = useNavigate()

    const [isButtonDisabled, setButtonDisabled] = useState(false)

    const handleConfirmStatus = (status, id) => {
        if (isButtonDisabled) {
            return;
        }

        setButtonDisabled(true)
        updateMutate({ id, eStatus: status ? 'y' : 'n' })

        setTimeout(() => {
            setButtonDisabled(false)
        }, 1000)
    }
    return (
        <>
            <tr key={key}>
                <td>{index + 1}</td>
                <td><span className='single-line patient-name' onClick={() => navigate(route.viewPatient(patient?._id))}>{patient?.sUserName || ''}</span></td>
                <td className='dominant-eye'>{patient?.eDominantEye || ''}</td>
                <td className='disease'>{patient?.eAmblyopia === 'yes' ? <span className='present'>{patient?.eAmblyopia || ''}</span> : <span className='not-present'>{patient?.eAmblyopia || ''}</span>}</td>
                <td className='disease'>{patient?.eStrabismus === 'yes' ? <span className='present'>{patient?.eStrabismus || ''}</span> : <span className='not-present'>No</span>}</td>
                <td>
                    {patient.eStatus !== 'd' ? <Form.Check
                        type='switch'
                        name={patient?._id}
                        className='d-inline-block me-1'
                        checked={patient.eStatus === 'y'}
                        onChange={(e) => handleConfirmStatus(e.target.checked, patient._id)}
                        disabled={isButtonDisabled}
                    /> : <span className='delete-user'>Delete</span>}
                </td>

                <td>
                    {patient?.eStatus === 'd' ?
                        <Dropdown.Item className='dropdown-datatable-items single-icon' onClick={() => navigate(route.viewPatient(patient._id))}>
                            <div className='dropdown-datatable-items-icon'>
                                <i className='icon-visibility d-block' />
                            </div>
                        </Dropdown.Item> :
                        <Dropdown className='dropdown-datatable'>
                            <Dropdown.Toggle className='dropdown-datatable-toggle-button'>
                                <div className=''>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='dropdown-datatable-menu'>
                                <Dropdown.Item className='dropdown-datatable-items' onClick={() => navigate(route.viewPatient(patient._id))}>
                                    <div className='dropdown-datatable-items-icon'>
                                        <i className='icon-visibility d-block' />
                                    </div>
                                    <div className='dropdown-datatable-row-text'>
                                        View
                                    </div>
                                </Dropdown.Item>
                                {patient.eStatus !== 'd' && (<>
                                    <Dropdown.Item className='dropdown-datatable-items edit' onClick={() => navigate(route.editPatient(patient._id), { state: 'edit' })}>
                                        <div className='dropdown-datatable-items-icon'>
                                            <i className='icon-create d-block' />
                                        </div>
                                        <div className='dropdown-datatable-row-text'>
                                            Update
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item className='dropdown-datatable-items delete' onClick={() => onDelete(patient._id, patient?.sUserName)}>
                                        <div className='dropdown-datatable-items-icon'>
                                            <i className='icon-delete d-block' />
                                        </div>
                                        <div className='dropdown-datatable-row-text'>
                                            Delete
                                        </div>
                                    </Dropdown.Item>
                                </>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </td>
            </tr>
        </>
    )
}

export default PatientList
