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
            <Row className='details-row'>
                <Col xxl={12} xl={12} md={12} sm={12}>
                    <div className='details-card'>
                        <div className='details-card-title'>Game Details</div>
                        <div className='details-card-data'>
                            <div className='game-avatar'>
                                {isLoading ? <Spinner animation='border' /> : <img src={data?.sAvatar} alt={`${data?.sName} avatar`} />}
                                <span>Avatar</span>
                            </div>
                            <Row className='details-data-row p-0 m-0 mt-4'>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Game Name</span>
                                    <span className='data-value'>{data?.sName || '-'}</span>
                                </Col>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Url</span>
                                    <span className='data-value'>{data?.sUrl || '-'}</span>
                                </Col>
                                <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                    <span className='data-title'>Description</span>
                                    <span className='data-value'>{data?.sDescription || '-'}</span>
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

export default ViewGame
