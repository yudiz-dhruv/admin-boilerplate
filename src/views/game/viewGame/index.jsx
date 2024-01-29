import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getGameById } from 'query/game/game.query'
import { Col, Row, Spinner } from 'react-bootstrap'
import moment from 'moment'

const ViewGame = () => {
    const { id } = useParams()

    // SPEICIFC GAME
    const { data, isLoading } = useQuery('gameDataById', () => getGameById(id), {
        enabled: !!id,
        select: (data) => data?.data?.data,
    })

    return (
        <>
            <Row className='details-row justify-content-center'>
                <Col xxl={3} xl={4} lg={5} md={12} sm={12}>
                    <div className='details-card'>
                        <div className='details-card-data'>
                            <div className='game-avatar'>
                                <div className='img-content'>
                                    {isLoading ? <Spinner animation='border' variant='success' className='text-center mt-4' />
                                        : <img src={data?.sAvatar} alt={data?.sUserName} />}
                                </div>
                                <span className='game-name'>{data?.sName || 'Loading...'}</span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xxl={6} xl={8} lg={7} md={12} sm={12}>
                    <div className='details-card'>
                        <div className='details-card-data'>
                            <Row className='details-data-row p-0 m-0'>
                                <Col sm={12} className="p-0 m-0">
                                    <span className='data-title'>Url</span>
                                    <span className='data-value'>{data?.sUrl || '-'}</span>
                                </Col>
                                <Col lg={6} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Description</span>
                                    <span className='data-value'>{data?.sDescription || '-'}</span>
                                </Col>
                                <Col lg={6} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Category</span>
                                    <span className='data-value capitalize'>{data?.eCategory || '-'}</span>
                                </Col>
                                <Col lg={6} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Status</span>
                                    <span className='data-value'>{data?.eStatus === 'y' ? 'Active' : data?.eStatus === 'd' ? 'Deleted' : 'In Active'}</span>
                                </Col>
                                <Col lg={6} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Created Date</span>
                                    <span className='data-value'>{isLoading ? '-' : moment(data?.dCreatedDate).format('DD-MM-YYYY')}</span>
                                </Col>
                                <Col lg={6} md={6} sm={6} className="p-0 m-0">
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

export default ViewGame
