import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getPatientById, getPatientHistory } from 'query/patient/patient.query'
import { Col, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Wrapper from 'shared/components/Wrap'
import DataTable from 'shared/components/DataTable'
import { appendParams, parseParams } from 'shared/utils'
import { PatientHistory } from 'shared/constants/TableHeaders'
import { motion } from 'framer-motion'

const ViewPatient = () => {
    const { id } = useParams()
    const location = useLocation()
    const parsedData = parseParams(location.search)
    const params = useRef(parseParams(location.search))

    const { reset } = useForm({ mode: 'all' })

    function getRequestParams (e) {
        const data = e ? parseParams(e) : params.current
        return {
            pageNumber: +data?.pageNumber?.[0] || 1,
            nStart: (+data?.pageNumber?.[0] - 1) || 0,
            search: data?.search || '',
            nLimit: data?.nLimit || 10,
            eStatus: data.eStatus || 'y',
            sort: data.sort || '',
            orderBy: +data.orderBy === 1 ? 'ASC' : 'DESC',
            totalElements: +data?.totalElements || 0
        }
    }

    function getSortedColumns (adminTableColumns, urlData) {
        return adminTableColumns?.map((column) => (column.internalName === urlData?.sort ? { ...column, type: +urlData?.orderBy } : column))
    }

    const [requestParams, setRequestParams] = useState(getRequestParams())
    const [columns] = useState(getSortedColumns(PatientHistory, parsedData))

    const [buttonToggle, setButtonToggle] = useState(() => ({
        information: true,
        history: false
    }))

    const tab_buttons = [
        { label: 'Patient Information', toggle: 'information' },
        { label: 'Patient History', toggle: 'history' },
    ]

    // SPECIFIC PATIENT
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

    // PATIENT HISTORY
    const { data: patientHistoryData, isLoading: patientHistoryLoading, isFetching } = useQuery('patientHistory', () => getPatientHistory(requestParams, id), {
        enabled: !!(buttonToggle?.history),
        select: (data) => data?.data?.data,
    })

    const handlePageEvent = useCallback((page) => {
        setRequestParams({ ...requestParams, pageNumber: page, nStart: page - 1 })
        appendParams({ pageNumber: page, nStart: page - 1 })
    }, [requestParams, setRequestParams])

    useEffect(() => {
        document.title = 'View Patient | Yantra Healthcare'
    }, [])

    return (
        <>
            <Row className='details-row justify-content-center'>
                <Col xxl={12} xl={12} md={12} sm={12}>
                    <div className='details-card'>
                        <div className='patient-details-button-group'>
                            {tab_buttons?.map((tab, index) => {
                                return (
                                    <button key={index} className={buttonToggle[tab.toggle] && 'userActive'} onClick={() => setButtonToggle({ [tab.toggle]: true })}>
                                        {tab?.label}
                                    </button>
                                )
                            })}
                        </div>

                        {buttonToggle?.information &&
                            <>
                                <div className='details-row'>
                                    <Row>
                                        <Col xxl={3} xl={4} lg={5} md={12} sm={12}>
                                            <motion.div className='details-card' initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.6, ease: 'easeInOut' }}>
                                                <div className='details-card-data'>
                                                    <div className='admin-img'>
                                                        <div className='img-content'>
                                                            <FontAwesomeIcon icon={faUser} />
                                                        </div>
                                                        <span className='user-name'>{data?.sUserName || 'Loading...'}</span>
                                                    </div>
                                                    <div className='line'></div>
                                                    <Row className='details-data-row p-0 m-0'>
                                                        <Col lg={12} md={6} sm={6} xs={12} className="p-0 m-0">
                                                            <span className='data-title'>Mobile Number</span>
                                                            <span className='data-value'>{data?.sMobile ? `+91 ${data?.sMobile}` : '-'}</span>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </motion.div>
                                        </Col>
                                        <Col xxl={9} xl={8} lg={7} md={12} className='mt-lg-0 mt-3'>
                                            <motion.div className='details-card' initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.6, ease: 'easeInOut' }}>
                                                <div className='details-card-data'>
                                                    <Row className='details-data-row p-0 m-0'>
                                                        <Col xxl={4} xl={4} lg={6} md={4} sm={6} className="p-0 m-0">
                                                            <span className='data-title'>Age</span>
                                                            <span className='data-value'>{data?.sAge || '0'}</span>
                                                        </Col>
                                                        <Col xxl={4} xl={4} lg={6} md={4} sm={6} className="p-0 m-0">
                                                            <span className='data-title'>Dominant Eye</span>
                                                            <span className='data-value capitalize'>{data?.eDominantEye || '-'}</span>
                                                        </Col>
                                                        <Col xxl={4} xl={4} lg={6} md={4} sm={6} className="p-0 m-0">
                                                            <span className='data-title'>Has Amblyopia?</span>
                                                            <span className='data-value capitalize'>{data?.eAmblyopia || '-'}</span>
                                                        </Col>
                                                        <Col xxl={4} xl={4} lg={6} md={4} sm={6} className="p-0 m-0">
                                                            <span className='data-title'>Has Strabismus?</span>
                                                            <span className='data-value capitalize'>{data?.eStrabismus || '-'}</span>
                                                        </Col>
                                                        <Col xxl={4} xl={4} lg={6} md={4} sm={6} className="p-0 m-0">
                                                            <span className='data-title'>Patient Status</span>
                                                            <span className='data-value'>{data?.eStatus === 'y' ? 'Active' : data?.eStatus === 'd' ? 'Deleted' : 'In Active'}</span>
                                                        </Col>
                                                        <Col xxl={4} xl={4} lg={6} md={4} sm={6} className="p-0 m-0">
                                                            <span className='data-title'>Created Date</span>
                                                            <span className='data-value'>{isLoading ? '-' : moment(data?.dCreatedDate).format('DD-MM-YYYY')}</span>
                                                        </Col>
                                                        <Col xxl={4} xl={4} lg={6} md={4} sm={6} className="p-0 m-0">
                                                            <span className='data-title'>Last Activity on</span>
                                                            <span className='data-value'>{isLoading ? '-' : moment(data?.dUpdatedDate).format('DD-MM-YYYY') || '-'}</span>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                        }

                        {buttonToggle?.history &&
                            <Wrapper>
                                <div className='patient-history'>
                                    <DataTable
                                        columns={columns}
                                        header={{
                                            left: {
                                                rows: true,
                                                search: true
                                            },
                                            right: {
                                                filter: false,
                                                component: true
                                            }
                                        }}
                                        totalRecord={patientHistoryData?.count?.totalData || 0}
                                        pageChangeEvent={handlePageEvent}
                                        isLoading={patientHistoryLoading || isFetching}
                                        pagination={{ currentPage: requestParams.pageNumber, pageSize: requestParams.nLimit }}
                                    >
                                        {patientHistoryData && patientHistoryData?.patientHistory?.map((history, index) => {
                                            return (
                                                <>
                                                    <tr key={history?._id}>
                                                        <td>{index + 1}</td>
                                                        <td className='single-line'>
                                                            {history?.aGamesName?.length > 0 ?
                                                                (history?.aGamesName?.length >= 2 ?
                                                                    history?.aGamesName?.toString()?.replace(',', ', ')
                                                                    : (history?.aGamesName?.toString()))
                                                                : 'No Game Played'}
                                                        </td>
                                                        <td className='single-line text-truncate' style={{ maxWidth: '150px' }}>
                                                            {history?.sComments || '-'}
                                                        </td>
                                                        <td className='single-line'>{moment(history?.dCheckUp)?.format('DD MMM, YYYY, h:mm a') || '-'}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </DataTable>
                                </div>
                            </Wrapper>
                        }
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ViewPatient
