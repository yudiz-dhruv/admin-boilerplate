import React, { useState } from 'react'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { route } from 'shared/constants/AllRoutes'
import CustomModal from '../Modal'
import { useMutation, useQueryClient } from 'react-query'
import { updateGame } from 'query/game/game.mutation'
import { toaster } from 'helper/helper'

const GameList = ({ key, index, game, onDelete }) => {
    const query = useQueryClient()
    const navigate = useNavigate()
    const [modal, setModal] = useState({ open: false })
    const [isButtonDisabled, setButtonDisabled] = useState(false)

    const MODAL_TYPE = {
        true: {
            TITLE: 'Confirm Activation?',
            WARNING: 'This might affect your current users who have deactivated this game.',
            MESSAGE: 'Are you sure you want to Activate this Game?'
        },
        false: {
            TITLE: 'Confirm Deactivation?',
            WARNING: 'This might affect your current users who have activated this game.',
            MESSAGE: 'Are you sure you want to Deactivate this Game?'
        }
    }

    // EDIT GAME
    const { mutate: updateMutate } = useMutation(updateGame, {
        onSettled: (response, err) => {
            if (response) {
                toaster('Game Status Updated Successfully.', 'success')
                query.invalidateQueries('gameList')
                setModal({ open: false, type: '' })
            } else {
                toaster(err.data.message, 'error')
            }
        }
    })

    const handleStatus = (status, id) => {
        setModal({ open: true, status, id })
    }

    const handleConfirmStatus = (status, id) => {
        if (isButtonDisabled) {
            return;
        }

        setButtonDisabled(true);
        updateMutate({ id: modal?.id, eStatus: modal?.status ? 'y' : 'n' })

        setTimeout(() => {
            setButtonDisabled(false)
        }, 1000)
    }

    return (
        <>
            <tr key={key}>
                <td>{index + 1}</td>
                <td className='avatar'>
                    {game?.sAvatar && (
                        typeof (game?.sAvatar) !== 'string'
                            ? <div className="game-logo" onClick={() => navigate(route.viewGame(game._id))}> <img src={URL.createObjectURL(game?.sAvatar)} alt='altImage' /> </div>
                            : <div className="game-logo" onClick={() => navigate(route.viewGame(game._id))}><img src={game?.sAvatar} alt='altImage' /> </div>)}
                </td>
                <td className='single-line'>{game?.sName || ''}</td>
                <td className='text-truncate single-line' style={{ maxWidth: '80px' }}>{game?.sUrl || ''}</td>
                <td>
                    {game.eStatus !== 'd' ? <Form.Check
                        type='switch'
                        name={game?._id}
                        className='d-inline-block me-1'
                        checked={game.eStatus === 'y'}
                        onChange={(e) => handleStatus(e.target.checked, game._id)}
                        disabled={isButtonDisabled}
                    /> : <span className='delete-user'>Delete</span>}
                </td>

                <td>
                    <Dropdown className='dropdown-datatable'>
                        {game.eStatus === 'd' ?
                            <Dropdown.Item className='dropdown-datatable-items single-icon' onClick={() => navigate(route.viewGame(game._id))}>
                                <div className='dropdown-datatable-items-icon'>
                                    <i className='icon-visibility d-block' />
                                </div>
                            </Dropdown.Item> :
                            <>
                                <Dropdown.Toggle className='dropdown-datatable-toggle-button'>
                                    <div className=''>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='dropdown-datatable-menu'>
                                    <Dropdown.Item className='dropdown-datatable-items edit' onClick={() => navigate(route.viewGame(game._id))}>
                                        <div className='dropdown-datatable-items-icon'>
                                            <i className='icon-visibility d-block' />
                                        </div>
                                        <div className='dropdown-datatable-row-text'>
                                            View
                                        </div>
                                    </Dropdown.Item>
                                    {game.eStatus !== 'd' && (<>
                                        <Dropdown.Item className='dropdown-datatable-items edit' onClick={() => navigate(route.editGame(game._id), { state: 'edit' })}>
                                            <div className='dropdown-datatable-items-icon'>
                                                <i className='icon-create d-block' />
                                            </div>
                                            <div className='dropdown-datatable-row-text'>
                                                Update
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item className='dropdown-datatable-items delete' onClick={() => onDelete(game._id, game?.sUserName)}>
                                            <div className='dropdown-datatable-items-icon'>
                                                <i className='icon-delete d-block' />
                                            </div>
                                            <div className='dropdown-datatable-row-text'>
                                                Delete
                                            </div>
                                        </Dropdown.Item>
                                    </>)}
                                </Dropdown.Menu>
                            </>
                        }
                    </Dropdown>
                </td>
            </tr>

            <CustomModal
                open={modal?.open}
                handleClose={() => setModal({ open: false, status: modal?.status })}
                handleConfirm={handleConfirmStatus}
                disableHeader
                bodyTitle={MODAL_TYPE[modal?.status]?.TITLE}
                confirmValue={modal?.id}
            >
                <article>
                    <p className='text-danger m-0'>{MODAL_TYPE[modal?.status]?.WARNING}</p>
                    <h5>
                        <div>
                            {MODAL_TYPE[modal?.status]?.MESSAGE}
                        </div>
                    </h5>
                </article>
            </CustomModal>
        </>
    )
}

export default GameList
