import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { route } from 'shared/constants/AllRoutes'

const GameList = ({ key, index, game, updateMutate, onDelete }) => {
    const navigate = useNavigate()
    const handleConfirmStatus = (status, id) => {
        // updateMutate({ id, eStatus: status ? 'y' : 'n' })
    }
    return (
        <>
            <tr key={key} className='game-list'>
                <td>{index + 1}</td>
                <td>
                    {game?.sAvatar && (
                        typeof (game?.sAvatar) !== 'string'
                            ? <div className=""> <img src={URL.createObjectURL(game?.sAvatar)} alt='altImage' /> </div>
                            : <div className=""><img src={game?.sAvatar} alt='altImage' /> </div>)}
                </td>
                <td className='single-line'>{game?.sName || ''}</td>
                <td className='single-line'>{game?.sDescription || ''}</td>
                <td>{game?.sUrl || ''}</td>
                <td>
                    {game.eStatus !== 'd' ? <Form.Check
                        type='switch'
                        name={game?._id}
                        className='d-inline-block me-1'
                        checked={game.eStatus === 'y'}
                        onChange={(e) => handleConfirmStatus(e.target.checked, game._id)}
                    /> : <span className='delete-user'>Delete</span>}
                </td>
                <td className='single-line'>{moment(game?.dCreatedDate)?.format('DD-MM-YYYY') || '-'}</td>

                <td>
                    <Dropdown className='dropdown-datatable'>
                        <Dropdown.Toggle className='dropdown-datatable-toggle-button'>
                            <div className=''>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='dropdown-datatable-menu'>
                            <Dropdown.Item className='dropdown-datatable-items' onClick={() => navigate(route.viewUser(game._id))}>
                                <div className='dropdown-datatable-items-icon'>
                                    <i className='icon-visibility d-block' />
                                </div>
                                <div className='dropdown-datatable-row-text'>
                                    View
                                </div>
                            </Dropdown.Item>
                            {
                                game.eStatus !== 'd' && (<>
                                    <Dropdown.Item className='dropdown-datatable-items edit' onClick={() => navigate(route.editUser(game._id))}>
                                        <div className='dropdown-datatable-items-icon'>
                                            <i className='icon-create d-block' />
                                        </div>
                                        <div className='dropdown-datatable-row-text'>
                                            Update
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item className='dropdown-datatable-items' onClick={() => onDelete(game._id, game?.sUserName)}>
                                        <div className='dropdown-datatable-items-icon'>
                                            <i className='icon-delete d-block' />
                                        </div>
                                        <div className='dropdown-datatable-row-text'>
                                            Delete
                                        </div>
                                    </Dropdown.Item>
                                </>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        </>
    )
}

export default GameList
