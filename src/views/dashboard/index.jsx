import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import Cards from 'shared/components/Card'
import { faUserDoctor, faUser, faUserSlash, faGamepad } from '@fortawesome/free-solid-svg-icons'
import Wrapper from 'shared/components/Wrap'
import ReactApexChart from 'react-apexcharts'

function Dashboard () {
  const [userData, setUserData] = useState({})
  const [userRevenueData, setUserRevenueData] = useState([])

  // const { isLoading, isFetching } = useQuery('userData', () => getUserData(), {
  //   select: (data) => data.data.data,
  //   onSuccess: (response) => {
  //     setUserData(response)
  //   },
  //   onError: () => {
  //     setUserData({})
  //   }
  // })

  // const { isLoading: userRevenueLoading, isFetching: userRevenueFetching } = useQuery('userRevenue', () => getUserRevenue(), {
  //   select: (data) => data.data.data,
  //   onSuccess: (response) => {
  //     setUserRevenueData(response)
  //   },
  //   onError: () => {
  //     setUserData({})
  //   }
  // })

  const columnBarOptions = {
    series: [{
      name: 'Revenue',
      data: [20000, 5000, 10000, 6000, 15000, 25000]
    }],
    options: {
      chart: {
        height: 250,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          barHeight: '1px',
          borderRadius: 0,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#000']
        }
      },
      xaxis: {
        categories: ['2019', '2020', '2021', '2022', '2023', '2024'],
        position: 'bottom',
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }

      },
      title: {
        text: 'Total Revenue Per Year',
        floating: true,
        offsetY: 100,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    },
  }

  useEffect(() => {
    document.title = 'Dashboard'
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
            <Col xxl={6} xl={6} lg={12} className='active-user'>
              <Wrapper>
                <h3>Active Users</h3>
                <Row>
                  <Col sm={6} className='card-box' >
                    <Cards cardtitle='Total Doctor' cardtext={123} cardIcon={faUserDoctor} className={'dashboard-card-icon-1'} />
                  </Col>
                  <Col sm={6} className='card-box' >
                    <Cards cardtitle='Total Patient' cardtext={123} cardIcon={faUser} className={'dashboard-card-icon-3'} />
                  </Col>
                </Row>
              </Wrapper>
            </Col>

            <Col xxl={6} xl={6} lg={12} className='active-user mt-xl-0 mt-3'>
              <Wrapper>
                <h3>Accounts</h3>
                <Row>
                  <Col sm={6} className='card-box' >
                    <Cards cardtitle='New Added' cardtext={100} cardIcon={faUser} className={'dashboard-card-icon-3'} />
                  </Col>
                  <Col sm={6} className='card-box' >
                    <Cards cardtitle='Going to expire' cardtext={8} cardIcon={faUserSlash} className={'dashboard-card-icon-6'} />
                  </Col>
                </Row>
              </Wrapper>
            </Col>

            <Col xxl={6} xl={6} lg={12} className='active-user mt-3'>
              <Wrapper>
                <h3>Games</h3>
                <Row>
                  <Col sm={6} className='card-box' >
                    <Cards cardtitle='Total Games' cardtext={10} cardIcon={faGamepad} className={'dashboard-card-icon-7'} />
                  </Col>
                </Row>
              </Wrapper>
            </Col>

          </Row>
          <Row>
            <Col xxl={6} xl={6} lg={12} className='active-user mt-3'>
              <Wrapper>
                <h3>Revenue</h3>
                <ReactApexChart options={columnBarOptions?.options} series={columnBarOptions.series} type="bar" height={350} />
              </Wrapper>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default Dashboard
