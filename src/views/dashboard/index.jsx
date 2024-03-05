import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import Cards from 'shared/components/Card'
import { faUserDoctor, faUser, faUserSlash, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import Wrapper from 'shared/components/Wrap'
import { useQuery } from 'react-query'
import { getSuperAdminStats } from 'query/dashboard/dashboard.query'
import { FormattedMessage } from 'react-intl'

function Dashboard () {
  const [statsData, setStatsData] = useState({})
  const [userRevenueData, setUserRevenueData] = useState([])

  const type = localStorage.getItem('type')

  // super admin statistics
  useQuery('superAdminStats', () => getSuperAdminStats(), {
    select: (data) => data.data.data,
    onSuccess: (response) => {
      setStatsData(response)
    },
    onError: () => {
      setStatsData({})
    }
  })

  // const { isLoading: userRevenueLoading, isFetching: userRevenueFetching } = useQuery('userRevenue', () => getUserRevenue(), {
  //   select: (data) => data.data.data,
  //   onSuccess: (response) => {
  //     setUserRevenueData(response)
  //   },
  //   onError: () => {
  //     setUserData({})
  //   }
  // })

  useEffect(() => {
    document.title = 'Dashboard | RFOX'
  }, [])

  return (
    <div>
      {false ? (
        <div className='d-flex align-items-center justify-content-center'>
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        <>
          <Row>
            {type === 'superAdmin' ?
              <>
                <Col xxl={6} xl={6} lg={6} className='active-user'>
                  <Wrapper>
                    <h3><FormattedMessage id='activeUsers' /></h3>
                    <Row>
                      <Col xxl={6} xl={12} lg={12} sm={6} className='card-box' >
                        <div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Total Doctor' cardtext={statsData?.totalActiveDoctors || '0'} cardIcon={faUserDoctor} className={'dashboard-card-icon-3'} />
                        </div>
                      </Col>
                      <Col xxl={6} xl={12} lg={12} sm={6} className='card-box' >
                        <div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Total Patient' cardtext={statsData?.totalPatients || '0'} cardIcon={faUser} className={'dashboard-card-icon-4'} />
                        </div>
                      </Col>
                    </Row>
                  </Wrapper>
                </Col>

                <Col xxl={6} xl={6} lg={6} className='active-user mt-lg-0 mt-3'>
                  <Wrapper>
                    <h3><FormattedMessage id='doctorAccounts' /> <span className='current-month'>(<FormattedMessage id='currentMonth' />)</span></h3>
                    <Row>
                      <Col xxl={6} xl={12} lg={12} sm={6} className='card-box' >
                        <div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='New Added' cardtext={statsData?.totalCurrentMonthDoctor || '0'} cardIcon={faUserPlus} className={'dashboard-card-icon-3'} />
                        </div>
                      </Col>
                      <Col xxl={6} xl={12} lg={12} sm={6} className='card-box' >
                        <div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Going to expire' cardtext={statsData?.totalExpireMonthDoctor || '0'} cardIcon={faUserMinus} className={'dashboard-card-icon-6'} />
                        </div>
                      </Col>
                    </Row>
                  </Wrapper>
                </Col>
              </> : <>
                <Col xxl={3} xl={6} lg={6} md={6} sm={6} className='active-user'>
                  <Wrapper>
                    <h3><FormattedMessage id='Patients' /></h3>
                    <Row>
                      <Col xxl={12} xl={8} md={12} sm={12} className='card-box' >
                        <div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Total Patient' cardtext={statsData?.totalActivePatients || '0'} cardIcon={faUser} className={'dashboard-card-icon-4'} />
                        </div>
                      </Col>
                    </Row>
                  </Wrapper>
                </Col>

                <Col xxl={6} xl={6} lg={12} className='active-user mt-xxl-0 mt-xl-3  mt-3'>
                  <Wrapper>
                    <h3><FormattedMessage id='patientAccounts' /></h3>
                    <Row>
                      <Col sm={6} className='card-box' >
                        <div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Active' cardtext={statsData?.totalActivePatients || '0'} cardIcon={faUser} className={'dashboard-card-icon-3'} />
                        </div>
                      </Col>
                      <Col sm={6} className='card-box' >
                        <div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='In-Active' cardtext={statsData?.totalBlockedPatients || '0'} cardIcon={faUserSlash} className={'dashboard-card-icon-6'} />
                        </div>
                      </Col>
                    </Row>
                  </Wrapper>
                </Col>
              </>}
          </Row>
        </>
      )}
    </div>
  )
}

export default Dashboard
