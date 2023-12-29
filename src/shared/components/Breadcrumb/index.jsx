import React, { Fragment } from 'react'
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faAngleRight } from '@fortawesome/free-solid-svg-icons'

function Breadcrumbs () {
  const { id } = useParams()
  const location = useLocation()

  const pathNames = location.pathname.split('/').filter((x) => x)
  const items = pathNames.filter((value) => value !== id)
  return (
    <Breadcrumb className='breadcrumb-main' style={{ '--bs-breadcrumb-divider': '>' }}>
      {items.map((value, index) => {
        const last = index === items.length - 1
        const to = location.pathname.split(value)[0]
        return last ? (
          <Breadcrumb.Item active key={value}>
            {value?.replaceAll('-', ' ')}
          </Breadcrumb.Item>
        ) : (
          <Fragment key={value}>
            <Breadcrumb.Item linkAs={RouterLink} linkProps={{ to: to + value }}>
              {value?.replaceAll('-', ' ')}
            </Breadcrumb.Item>
            <FontAwesomeIcon icon={faAngleDoubleRight} className='breadcrumb-slash' />
          </Fragment>
        )
      })}
    </Breadcrumb>
  )
}

export default Breadcrumbs