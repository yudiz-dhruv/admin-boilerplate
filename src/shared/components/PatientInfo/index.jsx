import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const PatientInfo = ({ data, status }) => {
    return (
        <>
            <div className='current-patient'>
                <h3 className='data-title'><FontAwesomeIcon icon={faUser} color='var(--secondary-500)' size='sm' /> Patient Info</h3>
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
                        <span className='data-value capitalize'>{status === 'connected' ? <span className='connected'>{status}</span> : <span className='not-connected'>{status || 'waiting'}</span>}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientInfo
