import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Col, Row, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons'
import { getAdminById } from 'query/admin/admin.query'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'

const ViewDoctor = () => {
    const { id } = useParams()

    // SPEICIFC DOCTOR
    const { data, isLoading } = useQuery('adminDataById', () => getAdminById(id), {
        enabled: !!id,
        select: (data) => data?.data?.data,
    })

    useEffect(() => {
        document.title = 'View Doctor | RFOX'
    }, [])

    return (
        <>
            <div className='view-admin'>
                <Row className='details-row justify-content-center'>
                    <Col xxl={3} xl={4} lg={5} md={12} sm={12}>
                        <div className='details-card' initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}>
                            <div className='details-card-data'>
                                <div className='admin-img'>
                                    <div className='img-content'>
                                        {isLoading ?
                                            <Spinner animation='border' className='text-center mt-5' variant='success' />
                                            : <><img src={data?.sAvatar} alt={data?.sUserName} /> </>}
                                    </div>
                                    <span className='user-name'>{data?.sUserName || 'Loading...'}</span>
                                </div>
                                <div className='line'></div>
                                <Row className='details-data-row p-0 m-0'>
                                    <Col lg={12} md={6} sm={6} xs={12} className="p-0 m-0">
                                        <span className='data-title'><FormattedMessage id='emailAddress' /></span>
                                        <span className='data-value'>{data?.sEmail || '-'}</span>
                                    </Col>
                                    <Col lg={12} md={6} sm={6} xs={12} className="p-0 m-0">
                                        <span className='data-title'><FormattedMessage id='phoneNumber' /></span>
                                        <span className='data-value'>{data?.sMobile ? `+91 ${data?.sMobile}` : '-'}</span>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>

                    <Col xxl={9} xl={8} lg={7} md={12} sm={12}>
                        <div className='details-card' initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}>
                            <div className='details-card-data'>
                                <Row className='details-data-row p-0 m-0'>
                                    <Col xl={4} lg={6} md={6} sm={6} className="p-0 m-0">
                                        <span className='data-title'><FormattedMessage id='companyName' /></span>
                                        <span className='data-value'>{data?.sCompanyName || '-'}</span>
                                    </Col>
                                    <Col xl={4} lg={6} md={6} sm={6} className="p-0 m-0">
                                        <span className='data-title'><FormattedMessage id='doctorStatus' /></span>
                                        <span className='data-value'>{data?.eStatus === 'y' ? 'Active' : 'In-Active'}</span>
                                    </Col>
                                    <Col xl={4} lg={6} md={6} sm={6} className="p-0 m-0">
                                        <span className='data-title'><FormattedMessage id='pkgPrice' /></span>
                                        <span className='data-value'><FontAwesomeIcon icon={faIndianRupee} size='sm' /> {data?.nPrice || '0'}</span>
                                    </Col>
                                    <Col xl={4} lg={6} md={6} sm={6} className="p-0 m-0">
                                        <span className='data-title'><FormattedMessage id='purchaseDate' /></span>
                                        <span className='data-value'>{isLoading ? '-' : moment(data?.oGameValidity?.dStartAt).format('DD MMM, YYYY') || '-'}</span>
                                    </Col>
                                    <Col xl={4} lg={6} md={6} sm={6} className="p-0 m-0">
                                        <span className='data-title'><FormattedMessage id='expiryDate' /></span>
                                        <span className='data-value'>{isLoading ? '-' : moment(data?.oGameValidity?.dEndAt).format('DD MMM, YYYY') || '-'}</span>
                                    </Col>
                                    <Col xl={4} lg={6} md={6} sm={6} className="p-0 m-0">
                                        <span className='data-title'><FormattedMessage id='createdDate' /></span>
                                        <span className='data-value'>{isLoading ? '-' : moment(data?.dCreatedDate).format('DD MMM, YYYY')}</span>
                                    </Col>
                                    <Col xl={4} lg={6} md={6} sm={6} className="p-0 m-0">
                                        <span className='data-title'><FormattedMessage id='lastUpdatedDate' /></span>
                                        <span className='data-value'>{isLoading ? '-' : moment(data?.dUpdatedDate).format('DD MMM, YYYY') || '-'}</span>
                                    </Col>
                                </Row>
                                <div className='title mt-3'><FormattedMessage id='gameDetails' />:-</div>
                                <div className='line mt-1'></div>
                                <Row className='details-data-row p-0 m-0'>
                                    <Col xl={4} lg={6} md={6} sm={6} className="p-0 m-0">
                                        <span className='data-title'><FormattedMessage id='numberOfGames' /></span>
                                        <span className='data-value capitalize'>{data?.aGamesId?.length || '0'}</span>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ViewDoctor
