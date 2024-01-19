import React, { useRef, useState } from 'react'
import { getPatientById } from 'query/patient/patient.query'
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

    const [buttonToggle, setButtonToggle] = useState({
        information: true,
        history: false
    })

    const tab_buttons = [
        { label: 'Patient Information', toggle: 'information' },
        { label: 'Patient History', toggle: 'history' },
    ]

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

    function handlePageEvent (page) {
        setRequestParams({ ...requestParams, pageNumber: page, nStart: page - 1 })
        appendParams({ pageNumber: page, nStart: page - 1 })
    }

    return (
        <>
            <Row className='details-row justify-content-center'>
                <Col xxl={8} xl={12} md={12} sm={12}>
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
                            <Wrapper>
                                <div className='details-card-data'>
                                    <div className='patient-img'>
                                        <div className='img-content'>
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <span className='user-name'>{data?.sUserName || 'Loading...'}</span>
                                    </div>
                                    <div className='line'></div>
                                    <Row className='details-data-row p-0 m-0'>
                                        <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                            <span className='data-title'>Mobile No.</span>
                                            <span className='data-value'>{data?.sMobile ? `+91 ${data?.sMobile}` : '-'}</span>
                                        </Col>
                                        <Col xxl={3} xl={4} lg={4} md={6} sm={6} className="p-0 m-0">
                                            <span className='data-title'>Age</span>
                                            <span className='data-value'>{data?.sAge || '0'}</span>
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
                                            <span className='data-value capitalize'>{data?.eStrabismus || '-'}</span>
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
                            </Wrapper>
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
                                        totalRecord={data?.count?.totalData || 0}
                                        pageChangeEvent={handlePageEvent}
                                        // isLoading={isLoading || isFetching}
                                        pagination={{ currentPage: requestParams.pageNumber, pageSize: requestParams.nLimit }}
                                    >
                                        {/* {data && data?.game?.map((game, index) => {
                                            return (
                                                <GameList
                                                    key={game._id}
                                                    index={index}
                                                    game={game}
                                                    onDelete={onDelete}
                                                    updateMutate={updateMutate}
                                                />
                                            )
                                        })} */}
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
