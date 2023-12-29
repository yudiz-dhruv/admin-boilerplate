import React from 'react'
import { getPatientById } from 'query/patient/patient.query'
import { Col, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import moment from 'moment'

const ViewPatient = () => {
    const { id } = useParams()

    const { reset } = useForm({ mode: 'all' })

    // SPEICIFC PATIENT
    const { data, isLoading } = useQuery('patientDataById', () => getPatientById(id), {
        enabled: !!id,
        select: (data) => data?.data?.data,
        onSuccess: (data) => {
            reset({
                ...data,
                sUserName: data?.sUserName || '',
                sMobile: data?.sMobile || '',
                sAge: data?.sAge || '',
            })
        }
    })

    return (
        <>
            <Row className='details-row'>
                <Col xxl={12} xl={12} md={12} sm={12}>
                    <div className='details-card'>
                        <div className='details-card-title'>Patient Details</div>
                        <div className='details-card-data'>
                            <Row className='details-data-row p-0 m-0'>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Full Name</span>
                                    <span className='data-value'>{data?.sUserName || '-'}</span>
                                </Col>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Mobile No.</span>
                                    <span className='data-value'>{data?.sMobile || '-'}</span>
                                </Col>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Age</span>
                                    <span className='data-value'>{data?.sAge || '-'}</span>
                                </Col>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Dominant Eye</span>
                                    <span className='data-value capitalize'>{data?.eDominantEye || '-'}</span>
                                </Col>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Has Amblyopia?</span>
                                    <span className='data-value capitalize'>{data?.eAmblyopia || '-'}</span>
                                </Col>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Has Strabismus?</span>
                                    <span className='data-value capitalize'>{data?.eStrabismus === 'yes' ? 'Yes' : 'No'}</span>
                                </Col>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Status</span>
                                    <span className='data-value'>{data?.eStatus === 'y' ? 'Active' : data?.eStatus === 'd' ? 'Deleted' : 'In Active'}</span>
                                </Col>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Created Date</span>
                                    <span className='data-value'>{isLoading ? '-' : moment(data?.dCreatedDate).format('DD-MM-YYYY')}</span>
                                </Col>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Last Activity on</span>
                                    <span className='data-value'>{isLoading ? '-' : moment(data?.dUpdatedDate).format('DD-MM-YYYY') || '-'}</span>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ViewPatient
