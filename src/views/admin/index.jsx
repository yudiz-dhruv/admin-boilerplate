import React, { useEffect, useRef, useState } from 'react'
import { deleteAdmin, updateAdmin } from 'query/admin/admin.mutation'
import { getAdminList } from 'query/admin/admin.query'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import DataTable from 'shared/components/DataTable'
import CustomModal from 'shared/components/Modal'
import TopBar from 'shared/components/Topbar'
import { route } from 'shared/constants/AllRoutes'
import { AdminListColumn } from 'shared/constants/TableHeaders'
import { appendParams, parseParams } from 'shared/utils'
import AdminList from 'shared/components/AdminList'
import AdminListFilters from 'shared/components/AdminListFilters'
import { toast, Zoom } from 'react-toastify'

const AdminManagement = () => {
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
            eStatus: data.eStatus || '',
            sort: data.sort || '',
            orderBy: +data.orderBy === 1 ? 'ASC' : 'DESC',
            totalElements: +data?.totalElements || 0
        }
    }

    function getSortedColumns (adminTableColumns, urlData) {
        return adminTableColumns?.map((column) => (column.internalName === urlData?.sort ? { ...column, type: +urlData?.orderBy } : column))
    }

    const [requestParams, setRequestParams] = useState(getRequestParams())
    const [columns, setColumns] = useState(getSortedColumns(AdminListColumn, parsedData))
    const [modal, setModal] = useState({ open: false, type: '' })
    const [data, setData] = useState(null)

    // List
    const { isLoading, isFetching } = useQuery(['adminList', requestParams], () => getAdminList(requestParams), {
        select: (data) => data.data.data,
        onSuccess: (response) => {
            setData(response)
        }
    })

    // EDIT ADMIN
    const { mutate: updateMutate } = useMutation(updateAdmin, {
        onSettled: (response, err) => {
            if (response) {
                toast.success('Admin Status Updated Successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Zoom,
                })
                query.invalidateQueries('adminList')
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

    // DELETE ADMIN
    const { isLoading: deleteLoading, mutate } = useMutation(deleteAdmin, {
        onSettled: (res, err) => {
            if (res) {
                query.invalidateQueries('adminList')
                toast.success('Admin Deleted Successfully!', {
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
        document.title = 'Admin Management | Yantra Healthcare'
    }, [])

    return (
        <>
            <TopBar
                buttons={[
                    {
                        text: 'Add New Admin',
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
                    sortEvent={handleSort}
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
                    bodyTitle='Confirm Delete?'
                    isLoading={deleteLoading}
                    confirmValue={modal?.id}
                >
                    <article>
                        <h5>
                            <div>
                                Are you sure you want to Delete this Admin?
                            </div>
                        </h5>
                    </article>
                </CustomModal>
            </div>
        </>
    )
}

export default AdminManagement
