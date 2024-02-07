import React, { useEffect, useRef, useState } from 'react'
import { deletePatient, updatePatient } from 'query/patient/patient.mutation'
import { getPatientList } from 'query/patient/patient.query'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import DataTable from 'shared/components/DataTable'
import CustomModal from 'shared/components/Modal'
import PatientList from 'shared/components/PatientList'
import PatientListFilters from 'shared/components/PatientListFilters'
import TopBar from 'shared/components/Topbar'
import { route } from 'shared/constants/AllRoutes'
import { PatientListColumn } from 'shared/constants/TableHeaders'
import { appendParams, parseParams } from 'shared/utils'
import { Zoom, toast } from 'react-toastify'

const PatientManagement = () => {
    const location = useLocation()
    const parsedData = parseParams(location.search)
    const params = useRef(parseParams(location.search))

    const navigate = useNavigate()
    const query = useQueryClient()

    function getRequestParams (e) {
        const data = e ? parseParams(e) : params.current
        return {
            pageNumber: +data?.pageNumber?.[0] || 1,
            nStart: (+data?.pageNumber?.[0] - 1) || 0,
            search: data?.search || '',
            nLimit: data?.nLimit || 10,
            sort: data.sort || '',
            orderBy: 'ASC',
            totalElements: +data?.totalElements || 0,
            eDominantEye: data?.eDominantEye || '',
            eStatus: data?.eStatus || 'y'
        }
    }

    function getSortedColumns (adminTableColumns, urlData) {
        return adminTableColumns?.map((column) => (column.internalName === urlData?.sort ? { ...column, type: +urlData?.orderBy } : column))
    }

    const [requestParams, setRequestParams] = useState(getRequestParams())
    const [columns, setColumns] = useState(getSortedColumns(PatientListColumn, parsedData))
    const [modal, setModal] = useState({ open: false, type: '' })

    // List
    const { isLoading, isFetching, data } = useQuery(['patientList', requestParams], () => getPatientList(requestParams), {
        select: (data) => data.data.data,
    })

    // EDIT PATIENT
    const { mutate: updateMutate } = useMutation(updatePatient, {
        onSettled: (response, err) => {
            if (response) {
                toast.success('Patient Status Updated Successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Zoom,
                })
                query.invalidateQueries('patientList')
            } else {
                toast.error(err.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Zoom,
                })
            }
        }
    })

    // DELETE PATIENT
    const { isLoading: deleteLoading, mutate } = useMutation(deletePatient, {
        onSettled: (res, err) => {
            if (res) {
                query.invalidateQueries('patientList')
                toast.success('Patient Deleted Successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Zoom,
                })
                setModal({ open: false, type: '' })
            } else {
                toast.error(err?.response?.data?.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Zoom,
                })
                setModal({ open: false, type: '' })
            }
        }
    })

    function handleSort (field) {
        let selectedFilter
        const filter = columns.map((data) => {
            if (data.internalName === field.internalName) {
                data.type = +data.type === 1 ? -1 : 1
                selectedFilter = data
            } else {
                data.type = 1
            }
            return data
        })
        setColumns(filter)
        const params = {
            ...requestParams,
            page: 0,
            sort: selectedFilter?.internalName,
            orderBy: selectedFilter.type === 1 ? 'ASC' : 'DESC',
            isEmailVerified: selectedFilter?.isEmailVerified
        }
        setRequestParams(params)
        appendParams({
            sort: selectedFilter.type !== 0 ? selectedFilter.internalName : '',
            orderBy: selectedFilter.type
        })
    }

    async function handleHeaderEvent (name, value) {
        switch (name) {
            case 'rows':
                setRequestParams({ ...requestParams, nLimit: Number(value), pageNumber: 1 })
                appendParams({ nLimit: Number(value), pageNumber: 1 })
                break
            case 'search':
                setRequestParams({ ...requestParams, search: value, pageNumber: 1 })
                appendParams({ pageNumber: 1 })
                break
            default:
                break
        }
    }

    function handlePageEvent (page) {
        setRequestParams({ ...requestParams, pageNumber: page, nStart: page - 1 })
        appendParams({ pageNumber: page, nStart: page - 1 })
    }

    const handleConfirmDelete = (id) => {
        mutate(id)
    }

    const onDelete = (id) => {
        setModal({ open: true, type: 'delete', id: id })
    }

    useEffect(() => {
        document.title = 'Patient Management | Yantra Healthcare'
    }, [])

    return (
        <>
            <TopBar
                buttons={[
                    {
                        text: 'Add New Patient',
                        icon: 'icon-add',
                        type: 'primary',
                        btnEvent: () => navigate(route.addPatient)
                    }
                ]}
            />
            <div className='patient'>
                <DataTable
                    columns={columns}
                    header={{
                        left: {
                            rows: true,
                            component: true
                        },
                        right: {
                            filter: false,
                            search: true
                        }
                    }}
                    component={<PatientListFilters setRequestParams={setRequestParams} defaultValue={requestParams} />}
                    sortEvent={handleSort}
                    headerEvent={(name, value) => handleHeaderEvent(name, value)}
                    totalRecord={data?.count?.totalData || 0}
                    pageChangeEvent={handlePageEvent}
                    isLoading={isLoading || isFetching}
                    pagination={{ currentPage: requestParams.pageNumber, pageSize: requestParams.nLimit }}
                >
                    {data && data?.patient?.map((patient, index) => {
                        return (
                            <PatientList
                                key={patient._id}
                                index={index}
                                patient={patient}
                                onDelete={onDelete}
                                updateMutate={updateMutate}
                            />
                        )
                    })}
                </DataTable>

                <CustomModal
                    open={modal.type === 'delete' && modal.open}
                    handleClose={() => setModal({ open: false, type: '' })}
                    handleConfirm={handleConfirmDelete}
                    disableHeader
                    bodyTitle='Confirm Delete?'
                    isLoading={deleteLoading}
                    confirmValue={modal?.id}
                >
                    <article>
                        <h5>
                            <div>
                                Are you sure you want to Delete this Patient record?
                            </div>
                        </h5>
                    </article>
                </CustomModal>
            </div>
        </>
    )
}

export default PatientManagement
