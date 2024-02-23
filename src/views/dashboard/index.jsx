import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import Cards from 'shared/components/Card'
import { faUserDoctor, faUser, faUserSlash, faGamepad, faUsers } from '@fortawesome/free-solid-svg-icons'
import Wrapper from 'shared/components/Wrap'
import ReactApexChart from 'react-apexcharts'
import { GRAPH_OPTIONS } from 'shared/constants'
import { useQuery } from 'react-query'
import { getSuperAdminStats } from 'query/dashboard/dashboard.query'
import { motion } from 'framer-motion';

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
    document.title = 'Dashboard | Yantra Healthcare'
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
                    <h3>Active Users</h3>
                    <Row>
                      <Col xxl={6} xl={12} lg={12} sm={6} className='card-box' >
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Total Doctor' cardtext={statsData?.totalDoctors || '0'} cardIcon={faUserDoctor} className={'dashboard-card-icon-3'} />
                        </motion.div>
                      </Col>
                      <Col xxl={6} xl={12} lg={12} sm={6} className='card-box' >
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Total Patient' cardtext={statsData?.totalPatients || '0'} cardIcon={faUser} className={'dashboard-card-icon-4'} />
                        </motion.div>
                      </Col>
                    </Row>
                  </Wrapper>
                </Col>

                <Col xxl={6} xl={6} lg={6} className='active-user mt-lg-0 mt-3'>
                  <Wrapper>
                    <h3>Accounts <span className='current-month'>(Current Month)</span></h3>
                    <Row>
                      <Col xxl={6} xl={12} lg={12} sm={6} className='card-box' >
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='New Added' cardtext={statsData?.totalCurrentMonthDoctor || '0'} cardIcon={faUsers} className={'dashboard-card-icon-3'} />
                        </motion.div>
                      </Col>
                      <Col xxl={6} xl={12} lg={12} sm={6} className='card-box' >
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Going to expire' cardtext={statsData?.totalExpireMonthDoctor || '0'} cardIcon={faUserSlash} className={'dashboard-card-icon-6'} />
                        </motion.div>
                      </Col>
                    </Row>
                  </Wrapper>
                </Col>

                <Col xxl={6} xl={6} lg={6} className='active-user mt-3'>
                  <Wrapper>
                    <h3>Games</h3>
                    <Row>
                      <Col xxl={6} xl={12} lg={12} sm={6} className='card-box' >
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Total Games' cardtext={statsData?.totalGames || '0'} cardIcon={faGamepad} className={'dashboard-card-icon-7'} />
                        </motion.div>
                      </Col>
                    </Row>
                  </Wrapper>
                </Col>
              </> : <>
                <Col xxl={3} xl={6} lg={6} md={6} sm={6} className='active-user'>
                  <Wrapper>
                    <h3>Active Users</h3>
                    <Row>
                      <Col xxl={12} xl={8} md={12} sm={12} className='card-box' >
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Total Patient' cardtext={123} cardIcon={faUser} className={'dashboard-card-icon-4'} />
                        </motion.div>
                      </Col>
                    </Row>
                  </Wrapper>
                </Col>

                <Col xxl={3} xl={6} lg={6} md={6} sm={6} className='active-user mt-md-0 mt-sm-0 mt-3'>
                  <Wrapper>
                    <h3>Games</h3>
                    <Row>
                      <Col xxl={12} xl={8} md={12} sm={12} className='card-box' >
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Total Games' cardtext={10} cardIcon={faGamepad} className={'dashboard-card-icon-7'} />
                        </motion.div>
                      </Col>
                    </Row>
                  </Wrapper>
                </Col>

                <Col xxl={6} xl={6} lg={12} className='active-user mt-xxl-0 mt-xl-3  mt-3'>
                  <Wrapper>
                    <h3>Accounts</h3>
                    <Row>
                      <Col sm={6} className='card-box' >
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='New Added' cardtext={100} cardIcon={faUsers} className={'dashboard-card-icon-3'} />
                        </motion.div>
                      </Col>
                      <Col sm={6} className='card-box' >
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          <Cards cardtitle='Going to expire' cardtext={8} cardIcon={faUserSlash} className={'dashboard-card-icon-6'} />
                        </motion.div>
                      </Col>
                    </Row>
                  </Wrapper>
                </Col>
              </>}
          </Row>
          {/* <Row>
            <Col xxl={6} xl={6} lg={12} className='active-user mt-3'>
              <Wrapper>
                <h3>Revenue</h3>
                <ReactApexChart options={GRAPH_OPTIONS?.options} series={GRAPH_OPTIONS.series} type="bar" height={350} />
              </Wrapper>
            </Col>
          </Row> */}
        </>
      )}
    </div>
  )
}

export default Dashboard
