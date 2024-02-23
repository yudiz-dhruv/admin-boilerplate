import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../Modal'
import { useNavigate } from 'react-router-dom'
import { route } from 'shared/constants/AllRoutes'

const PatientInfo = ({ data, status, location, modal, setModal, socket }) => {
    const navigate = useNavigate()

    const handleEndSession = (e) => {
        e?.preventDefault()

        if (socket !== undefined && socket?.connected) {
            socket.emit(location?.state?.patientSettings?._id, {
                sEventName: 'reqEndGame',
                oData: {
                    eState: 'finished'
                }
            }, (response) => {
                console.warn('Leaveing Room...', response)
            })
        }

        navigate(route?.adminGame)

        setModal(false)
    }

    const handleCancel = () => {
        setModal(false)
    }
    return (
        <>
            <div className='current-patient'>
                <h3 className='data-title'>
                    <span>
                        <FontAwesomeIcon icon={faUser} color='var(--secondary-500)' size='sm' /> Patient Info
                    </span>
                    <span>
                        {(status === 'connected' || status === 'disconnected') &&
                            <Button className='end-session square' type='button' size='sm' onClick={() => setModal({ open: true, type: 'end-session' })}>End Session</Button>
                        }
                    </span>
                </h3>
                <div className='line'></div>

                <div>
                    <div className='patient-content'>
                        <span className='data-label'>Name</span>
                        <span className='data-value'>{data?.sUserName}</span>
                    </div>
                    <div className='patient-content'>
                        <span className='data-label'>Mobile Number</span>
                        <span className='data-value'>{data?.sMobile}</span>
                    </div>
                    <div className='patient-content'>
                        <span className='data-label'>Amblyopia</span>
                        <span className='data-value capitalize'>{data?.eAmblyopia}</span>
                    </div>
                    <div className='patient-content'>
                        <span className='data-label'>Strabismus</span>
                        <span className='data-value capitalize'>{data?.eStrabismus}</span>
                    </div>
                    <div className='patient-content'>
                        <span className='data-label'>Status</span>
                        <span className='data-value capitalize'>{status === 'connected' ? (<span className='connected'>{status}</span>)
                            : status === 'disconnected' ? (<span className='disconnected'>{status || 'waiting'}</span>)
                                : (<span className='waiting'>{status || 'waiting'}</span>)}
                        </span>
                    </div>
                </div>
            </div>

            <CustomModal
                open={modal?.type === 'end-session' && modal?.open}
                handleClose={handleCancel}
                handleConfirm={handleEndSession}
                disableHeader
                bodyTitle='Are you sure you want to Quit the Game Session?'
            >
            </CustomModal>
        </>
    )
}

export default PatientInfo
