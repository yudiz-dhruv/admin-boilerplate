import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { route } from 'shared/constants/AllRoutes';

const AdminList = ({ key, index, admin, updateMutate, onDelete }) => {
    const navigate = useNavigate()

    const [isButtonDisabled, setButtonDisabled] = useState(false)

    const handleConfirmStatus = (status, id) => {
        const formData = new FormData()

        if (isButtonDisabled) {
            return;
        }

        formData.append('eStatus', status ? 'y' : 'n')

        setButtonDisabled(true)
        updateMutate({ id, formData })

        setTimeout(() => {
            setButtonDisabled(false)
        }, 1000)
    }

    function textTruncate (s) {
        return s.slice(0, 10).concat('...')
    }
    return (
        <>
            <tr key={key}>
                <td>{index + 1}</td>
                <td>
                    <span className='single-line admin-name capitalize' onClick={() => navigate(route.viewAdmin(admin?._id))}>
                        {(admin?.sUserName?.length > 15 ? textTruncate(admin?.sUserName) : admin?.sUserName) || ''}
                    </span>
                </td>
                <td className='single-line'>{admin?.sMobile ? '+91-' + admin?.sMobile : '-'}</td>
                <td className='single-line'>{admin?.sEmail || '-'}</td>
                <td className='single-line text-danger'>{moment(admin?.dEndAt)?.format('DD MMM, YYYY') || '-'}</td>
                <td>
                    {admin.eStatus !== 'd' ? <Form.Check
                        type='switch'
                        name={admin?._id}
                        className='d-inline-block me-1'
                        checked={admin.eStatus === 'y'}
                        onChange={(e) => handleConfirmStatus(e.target.checked, admin._id)}
                        disabled={isButtonDisabled}
                    /> : <span className='delete-user'><FormattedMessage id='delete' /></span>}
                </td>
                <td>
                    {admin?.eStatus === 'd' ?
                        <Dropdown.Item className='dropdown-datatable-items single-icon' onClick={() => navigate(route.viewAdmin(admin._id))}>
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
                                <Dropdown.Item className='dropdown-datatable-items' onClick={() => navigate(route.viewAdmin(admin._id))}>
                                    <div className='dropdown-datatable-items-icon'>
                                        <i className='icon-visibility d-block' />
                                    </div>
                                    <div className='dropdown-datatable-row-text'>
                                        <FormattedMessage id='view' />
                                    </div>
                                </Dropdown.Item>
                                {admin.eStatus !== 'd' && (<>
                                    <Dropdown.Item className='dropdown-datatable-items edit' onClick={() => navigate(route.editAdmin(admin._id))}>
                                        <div className='dropdown-datatable-items-icon'>
                                            <i className='icon-create d-block' />
                                        </div>
                                        <div className='dropdown-datatable-row-text'>
                                            <FormattedMessage id='update' />
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item className='dropdown-datatable-items delete' onClick={() => onDelete(admin._id, admin?.sUserName)}>
                                        <div className='dropdown-datatable-items-icon'>
                                            <i className='icon-delete d-block' />
                                        </div>
                                        <div className='dropdown-datatable-row-text'>
                                            <FormattedMessage id='delete' />
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

export default AdminList
