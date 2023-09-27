import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { getUserData, getUserRevenue } from 'query/statistics/statistics.query'
import Cards from 'shared/components/Card'
import { Loader } from 'shared/components/Loader'
import { faUsers, faDatabase, faUserMinus, faEnvelopeCircleCheck, faMobile, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Dashboard () {
  const [userData, setUserData] = useState({})
  const [userRevenueData, setUserRevenueData] = useState([])

  const { isLoading, isFetching } = useQuery('userData', () => getUserData(), {
    select: (data) => data.data.data,
    onSuccess: (response) => {
      setUserData(response)
    },
    onError: () => {
      setUserData({})
    }
  })

  const { isLoading: userRevenueLoading, isFetching: userRevenueFetching } = useQuery('userRevenue', () => getUserRevenue(), {
    select: (data) => data.data.data,
    onSuccess: (response) => {
      setUserRevenueData(response)
    },
    onError: () => {
      setUserData({})
    }
  })



  useEffect(() => {
    document.title = 'Dashboard'
  }, [])

  return (
    <div>
      {isLoading || isFetching || userRevenueLoading || userRevenueFetching ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col xxl={4} lg={4} sm={12} md={12} className='pb-3 pb-lg-0 card-box dashboard-card-1' >
              <Card className='dash-card'>
                <Card.Body className='up-card-1'>
                  <div>
                    <Card.Text>{userData?.nTotalUsers}</Card.Text>
                    <Card.Title>Total Users</Card.Title>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faUsers} className="dashboard-card-icon-1" />
                  </div>
                </Card.Body>
                <Row className='down-card-1 card-body'>
                  <Col xxl={6} lg={12} sm={12} md={6} className="p-0">
                    <Card.Text>₹ {userData?.nTotalUserBalance?.toExponential(2)}</Card.Text>
                    <Card.Title>Total Balance</Card.Title>
                  </Col>
                  <Col xxl={6} lg={12} sm={12} md={6} className="p-0">
                    <Card.Text>₹ {userData?.nUserPending?.toFixed(2)}</Card.Text>
                    {/* <Card.Text>{userData?.nTotalWithdrawal}</Card.Text> */}
                    <Card.Title>Pending Withdrawal</Card.Title>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xxl={8} lg={8} sm={12} md={12} className='pb-xxl-3 pb-lg-0 card-box m-0' >
              <Row>
                <Col xxl={6} lg={6} sm={12} md={6} className='pb-3 pb-lg-0 card-box' >
                  <Cards cardtitle='Active Users' cardtext={userData?.nTotalActiveUsers} cardIcon={faDatabase} className={'dashboard-card-icon-2'} />
                </Col>

                <Col xxl={6} lg={6} sm={12} md={6} className='pb-3 pb-lg-0 card-box' >
                  <Cards cardtitle='Deleted Users' cardtext={userData?.nTotalDeletedUsers} cardIcon={faUserMinus} className={'dashboard-card-icon-3'} />
                </Col>
                <Col xxl={6} lg={6} sm={12} md={6} className='pb-3 pb-lg-0 card-box' >
                  <Cards cardtitle='Email Verified Users' cardtext={userData?.nTotalEmailVerifiedUsers} cardIcon={faEnvelopeCircleCheck} className={'dashboard-card-icon-4'} />
                </Col>

                <Col xxl={6} lg={6} sm={12} md={6} className='pb-3 pb-lg-0 card-box' >
                  <Cards cardtitle='Mobile Verified Users' cardtext={userData?.nTotalMobileVerifiedUsers} cardIcon={faMobile} className={'dashboard-card-icon-5'} />
                </Col>
              </Row>
            </Col>
            <Col xxl={12} lg={12} sm={12} md={12} className='pb-3 pb-lg-0 card-box' >
              <Row>
                <Col xxl={3} lg={6} sm={12} md={6} className='pb-3 pb-lg-0 card-box' >
                  <Cards cardtitle='Revenue by Today' cardtext={userRevenueData[0]?.nToday[0]?.nTotal.toFixed(2) || '0.00'} cardIcon={faIndianRupeeSign} className={'dashboard-card-icon-6'} />
                </Col>

                <Col xxl={3} lg={6} sm={12} md={6} className='pb-3 pb-lg-0 card-box' >
                  <Cards cardtitle='Revenue by Yearly' cardtext={userRevenueData[0]?.nLastYear[0]?.nTotal.toFixed(2) || '0.00'} cardIcon={faIndianRupeeSign} className={'dashboard-card-icon-7'} />
                </Col>

                <Col xxl={3} lg={6} sm={12} md={6} className='pb-3 pb-lg-0 card-box' >
                  <Cards cardtitle='Revenue by Quaterly' cardtext={userRevenueData[0]?.nOverAll[0]?.nTotal.toFixed(2) || '0.00'} cardIcon={faIndianRupeeSign} className={'dashboard-card-icon-8'} />
                </Col>

                <Col xxl={3} lg={6} sm={12} md={6} className='pb-3 pb-lg-0 card-box' >
                  <Cards cardtitle='Revenue by Monthly' cardtext={userRevenueData[0]?.nLastMonth[0]?.nTotal.toFixed(2) || '0.00'} cardIcon={faIndianRupeeSign} className={'dashboard-card-icon-9'} />
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default Dashboard
