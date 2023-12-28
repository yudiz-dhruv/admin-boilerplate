import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { appendParams, parseParams } from 'shared/utils'
import TopBar from 'shared/components/Topbar'
import { route } from 'shared/constants/AllRoutes'
import DataTable from 'shared/components/DataTable'
import CustomModal from 'shared/components/Modal'
import { GameListColumn } from 'shared/constants/TableHeaders'
import Drawer from 'shared/components/Drawer'
import { getGameList } from 'query/game/game.query'
import GameList from 'shared/components/GameList'
import { deleteGame } from 'query/game/game.mutation'
import { toaster } from 'helper/helper'

const GameManagement = () => {
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
  const [columns, setColumns] = useState(getSortedColumns(GameListColumn, parsedData))
  const [modal, setModal] = useState({ open: false, type: '' })

  // List
  const { isLoading, isFetching, data } = useQuery(['gameList', requestParams], () => getGameList(requestParams), {
    select: (data) => data.data.data,
  })


  // DELETE GAME
  const { isLoading: deleteLoading, mutate } = useMutation(deleteGame, {
    onSettled: (res, err) => {
      if (res) {
        query.invalidateQueries('gameList')
        toaster('Game Deleted Successfully.', 'success')
        setModal({ open: false, type: '' })
      } else {
        toaster(err?.response?.data?.message, 'error')
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
      case 'filter':
        setModal({ open: value, type: 'filter' })
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

  function handleFilterChange (e) {
    const selectedStates = e?.selectedState?.map(item => item.value)
    setRequestParams({ ...requestParams, eStatus: e?.eStatus || '', eGender: e?.eGender || '', isEmailVerified: e?.isEmailVerified || '', isMobileVerified: e?.isMobileVerified || '', selectedState: selectedStates || '', dateFrom: e?.dateFrom || '', dateTo: e?.dateTo || '' })
  }

  useEffect(() => {
    document.title = 'Game Management | Vivid Vision'
  }, [])

  return (
    <>
      <TopBar
        buttons={[
          {
            text: 'Add Game',
            icon: 'icon-add',
            type: 'primary',
            clickEventName: 'createUserName',
            btnEvent: () => navigate(route.addGame)
          }
        ]}
      />
      <div>
        <DataTable
          columns={columns}
          header={{
            left: {
              rows: true
            },
            right: {
              search: true,
              filter: false
            }
          }}
          sortEvent={handleSort}
          headerEvent={(name, value) => handleHeaderEvent(name, value)}
          totalRecord={data?.count?.totalData || 0}
          pageChangeEvent={handlePageEvent}
          isLoading={isLoading || isFetching}
          pagination={{ currentPage: requestParams.pageNumber, pageSize: requestParams.nLimit }}
        >
          {data && data?.game?.map((game, index) => {
            return (
              <GameList
                key={game._id}
                index={index}
                game={game}
                onDelete={onDelete}
              />
            )
          })}
          <Drawer isOpen={modal.type === 'filter' && modal.open} onClose={() => setModal({ open: false, type: '' })} title='Game List Filter'>
            {/* <UserFilters
              filterChange={handleFilterChange}
              closeDrawer={() => setModal({ open: false, type: '' })}
              defaultValue={requestParams}
              location={location}
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
            /> */}
          </Drawer>
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
                Are you sure you want to Delete this Game?
              </div>
            </h5>
          </article>
        </CustomModal>
      </div>
    </>
  )
}

export default GameManagement
