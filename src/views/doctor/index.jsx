import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { deleteAdmin, updateAdmin } from 'query/admin/admin.mutation'
import { getAdminList } from 'query/admin/admin.query'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import DataTable from 'shared/components/DataTable'
import CustomModal from 'shared/components/Modal'
import TopBar from 'shared/components/Topbar'
import { route } from 'shared/constants/AllRoutes'
import { AdminListColumn } from 'shared/constants/TableHeaders'
import { ReactToastify, appendParams, parseParams } from 'shared/utils'
import AdminList from 'shared/components/AdminList'
import AdminListFilters from 'shared/components/AdminListFilters'
import { FormattedMessage } from 'react-intl'

const AdminManagement = () => {
    const location = useLocation()
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
            eStatus: data.eStatus || '',
            sort: data.sort || '',
            orderBy: +data.orderBy === 1 ? 'ASC' : 'DESC',
            totalElements: +data?.totalElements || 0
        }
    }

    const [requestParams, setRequestParams] = useState(getRequestParams())
    const columns = useMemo(() => AdminListColumn, [])
    const [modal, setModal] = useState({ open: false, type: '' })
    const [data, setData] = useState(null)

    // List
    const { isLoading, isFetching } = useQuery(['adminList', requestParams], () => getAdminList(requestParams), {
        select: (data) => data.data.data,
        onSuccess: (response) => {
            setData(response)
        }
    })

    // EDIT DOCTOR
    const { mutate: updateMutate } = useMutation(updateAdmin, {
        onSettled: (response, err) => {
            if (response) {
                ReactToastify('Doctor Status Updated Successfully!', 'success')
                query.invalidateQueries('adminList')
            } else {
                ReactToastify(err.data.message, 'error')
            }
        }
    })

    // DELETE DOCTOR
    const { isLoading: deleteLoading, mutate } = useMutation(deleteAdmin, {
        onSettled: (res, err) => {
            if (res) {
                query.invalidateQueries('adminList')
                ReactToastify('Doctor Deleted Successfully!', 'success')
                setModal({ open: false, type: '' })
            } else {
                ReactToastify(err?.response?.data?.message, 'error')
                setModal({ open: false, type: '' })
            }
        }
    })

    const handleHeaderEvent = useCallback((name, value) => {
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
    }, [requestParams, setRequestParams])

    const handlePageEvent = useCallback((page) => {
        setRequestParams({ ...requestParams, pageNumber: page, nStart: page - 1 })
        appendParams({ pageNumber: page, nStart: page - 1 })
    }, [requestParams, setRequestParams])

    const handleConfirmDelete = useCallback((id) => mutate(id), [mutate])
    const onDelete = useCallback((id) => setModal({ open: true, type: 'delete', id }), [])

    useEffect(() => {
        document.title = 'Doctor Management | Yantra Healthcare'
    }, [])

    return (
        <>
            <TopBar
                buttons={[
                    {
                        text: 'Add New Doctor',
                        icon: 'icon-add',
                        type: 'primary',
                        btnEvent: () => navigate(route.addAdmin)
                    }
                ]}
            />

            <div className='admin-list'>
                <DataTable
                    columns={columns}
                    header={{
                        left: {
                            rows: true,
                            component: true,
                        },
                        right: {
                            search: true,
                            filter: false,
                        }
                    }}
                    headerEvent={(name, value) => handleHeaderEvent(name, value)}
                    totalRecord={data?.count?.totalData || 0}
                    pageChangeEvent={handlePageEvent}
                    isLoading={isLoading || isFetching}
                    pagination={{ currentPage: requestParams.pageNumber, pageSize: requestParams.nLimit }}
                    component={<AdminListFilters defaultValue={requestParams} setRequestParams={setRequestParams} />}
                >
                    {data?.admins?.map((admin, index) => {
                        return (
                            <AdminList
                                key={admin._id}
                                index={index}
                                admin={admin}
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
                    bodyTitle={<FormattedMessage id='confirmDelete' />}
                    isLoading={deleteLoading}
                    confirmValue={modal?.id}
                >
                    <article>
                        <h5>
                            <div><FormattedMessage id='wantToDeleteDoctor' /></div>
                        </h5>
                    </article>
                </CustomModal>
            </div>
        </>
    )
}

export default AdminManagement
