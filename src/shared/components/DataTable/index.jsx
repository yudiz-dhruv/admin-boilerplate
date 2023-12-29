import PropTypes from 'prop-types'
import React, { Suspense } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import Select from 'react-select'
import { FormattedMessage } from 'react-intl'
import Search from '../Search'
import { parseParams } from 'shared/utils'
import { Loader } from 'shared/components/Loader'

const CustomPagination = React.lazy(() => import('shared/components/CustomPagination'))

function DataTable ({
  children,
  bulkAction,
  component,
  columns,
  sortEvent,
  isLoading,
  totalRecord,
  pagination,
  header,
  headerEvent,
  checkbox,
  selectAllEvent,
  pageChangeEvent,
  selectAllValue,
  actionColumn,
  tabs,
  tabEvent,
  label,
  ...rest
}) {
  // eslint-disable-next-line no-restricted-globals
  const params = parseParams(location.search)
  return (
    <div className={`data-table ${rest.className}`}>
      <h2 className='label' style={{ textAlign: 'left' }}>{label}</h2>
      {header && (
        <div className='data-table-header d-sm-flex align-items-center justify-content-between flex-wrap'>
          <div className='d-flex left mb-2'>
            {header.left.bulkAction && <Form.Group className='bulk-action only-border mb-0 form-group'></Form.Group>}
            {header.left.rows && (
              <Form.Group className='bulk-action only-border form-group mb-0 d-flex align-items-center'>
                <Select
                  options={[10, 20, 30, 40, 50, 100].map((e) => ({ label: e, value: e }))}
                  value={[{ label: Number(params.nLimit) || 10, value: Number(params.nLimit) || 10 }]}
                  className='react-select only-border sm'
                  classNamePrefix='select'
                  isSearchable={false}
                  onChange={(e) => {
                    headerEvent('rows', e.value)
                  }}
                // menuIsOpen={true}
                />
              </Form.Group>
            )}
            {header.left.search && <Search className='search-box only-border mx-2 my-0' searchEvent={(e) => headerEvent('search', e)} />}
          </div>
          <div className='right d-flex align-items-center mb-2'>
            {header.right.latestFirst && (
              <Button variant='outline-secondary' className='square' size='sm' onClick={() => headerEvent('latestFirst', 1)}>
                <FormattedMessage id='latestFirst' />
                <i className='icon-sort' />
              </Button>
            )}
            {header.right.filter && (
              <Button variant='primary' className='square filter-button' size='sm' onClick={() => headerEvent('filter', true)}>
                <div>
                  Filter
                </div>
                <i className='icon-filter-list' />
              </Button>
            )}
            {header.right.addMode && (
              <Button variant='primary' className='square add-button' size='sm' onClick={() => headerEvent('add', true)}>
                <i className='icon-add' />
                <div>
                  Add
                </div>
              </Button>
            )}
            {header.right.component && component}
          </div>
        </div>
      )}
      <ul className='data-table-tabs d-flex'>
        {tabs &&
          tabs?.map((item) => {
            if (item.isAllowedTo) {
              return (
                <li className={item.active ? 'active' : ''} onClick={() => tabEvent(item.internalName)}>
                  {item.name} {item.count >= 0 && `(${item.count})`}
                </li>
              )
            } else {
              return (
                <li key={item.internalName} className={item.active ? 'active' : ''} onClick={() => tabEvent(item.internalName)}>
                  {item.name} {item.count >= 0 && `(${item.count})`}
                </li>
              )
            }
          })}
      </ul>
      <Table className='table-borderless' responsive='xl'>
        <thead>
          <tr>
            {checkbox && (
              <th className='checkbox'>
                <Form.Check
                  type='checkbox'
                  id='All'
                  name='selectAll'
                  className='form-check m-0'
                  onChange={selectAllEvent}
                  checked={selectAllValue.length ? selectAllValue.every((item) => item.value) : false}
                  label='&nbsp;'
                />
              </th>
            )}
            {columns?.map((column, index) => {
              return (
                <th key={index}>
                  <span onClick={column?.isSort ? () => sortEvent(column) : null}>
                    {column.name}
                    {column?.isSort && column.type === 1 && <i className='icon-arrow-drop-up' />}
                    {column?.isSort && column.type === -1 && <i className='icon-arrow-drop-down' />}
                  </span>
                </th>
              )
            })}
            {/* {actionColumn && <th className='text-end'>{useIntl().formatMessage({ id: 'actions' })}</th>} */}
          </tr>
        </thead>
        <tbody>
          {children}
          {totalRecord === 0 && (
            <tr>
              <td colSpan={columns.length + (checkbox ? 2 : 1)} className=''>
                <FormattedMessage id='noRecordFound' />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {isLoading && <Loader />}
      {pagination && (
        <Suspense fallback={<div />}>
          <CustomPagination
            currentPage={pagination.currentPage}
            totalCount={totalRecord}
            pageSize={pagination.pageSize}
            onPageChange={pageChangeEvent}
          />
        </Suspense>
      )}
    </div>
  )
}
DataTable.propTypes = {
  children: PropTypes.node,
  bulkAction: PropTypes.array,
  columns: PropTypes.array,
  sortEvent: PropTypes.func,
  isLoading: PropTypes.bool,
  pagination: PropTypes.object,
  totalRecord: PropTypes.number,
  header: PropTypes.object,
  headerEvent: PropTypes.func,
  selectAllEvent: PropTypes.func,
  pageChangeEvent: PropTypes.func,
  checkbox: PropTypes.bool,
  selectAllValue: PropTypes.array,
  actionColumn: PropTypes.bool,
  tabs: PropTypes.array,
  tabEvent: PropTypes.func,
  component: PropTypes.object,
  label: PropTypes.string
  // tabCount: PropTypes.number
}
export default DataTable