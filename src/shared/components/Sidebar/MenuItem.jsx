import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CustomModal from '../Modal'
import { socket } from 'shared/socket'

function MenuItem ({ item, isMenuOpen, activeSubMenu, toggleSubMenu }) {
  const location = useLocation()
  const navigate = useNavigate()

  const [modal, setModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const childPaths = item.children && item?.children?.map((i) => i?.path?.split('/')[1])
  const currentPathSlashIndex = location.pathname.split('/').length

  useEffect(() => {
    !isMenuOpen && setIsOpen(false)
  }, [isMenuOpen])

  useEffect(() => {
    setIsOpen(activeSubMenu === item?.path);
  }, [activeSubMenu, item?.path]);

  const toggle = useCallback(() => { setIsOpen(!isOpen); toggleSubMenu(isOpen ? null : item?.path); }, [isOpen, item?.path, toggleSubMenu, setIsOpen])

  const handleQuickSession = (e, item) => {
    if (location?.pathname?.includes('/admin-game-management/settings/') && location?.state?.patientSettings) {
      e.preventDefault();

      setModal({ open: true, item })
    }
  }

  const handleConfirmNavigate = () => {
    socket.emit(location?.state?.patientSettings?._id, {
      sEventName: 'reqEndGame',
      oData: {
        eState: 'finished'
      }
    }, (response) => {
      console.warn('Leaveing Room...', response)
    })

    navigate(modal?.item?.path)

    setModal(false)
  }

  const handleCancel = () => {
    setModal(false)
  }

  return (
    <>
      <li className={isOpen ? 'open' : ''}>
        {item.children ? (
          <>
            <span onClick={toggle} className={isOpen === true ? "toggle-btn-open" : ""} >
              <span
                // to={item.path}
                activeclassName={`active ${!item.children && 'pe-none'} `}
                className={childPaths?.includes(location.pathname.split('/')[1]) ? 'active pe-none list-name' : 'list-name'}
              >
                <i> <FontAwesomeIcon icon={item.icon} /> </i>

                <div className='side-bar-text'> {isMenuOpen && item.title} </div>
                {item.children && isMenuOpen && (
                  <i className='icon-arrow-drop-down drop-icon' ></i>
                )}
              </span>
            </span>
            <ul className={`left-arrow sidebar-dropdown dropdown-menu show big`}>
              {item?.children?.map((subItem) => {
                return (
                  <li key={subItem.path}>
                    <NavLink
                      to={subItem.path}
                      activeclassName={`active ${(currentPathSlashIndex === 3 || currentPathSlashIndex === 2) && 'pe-none'}`}
                    >
                      {subItem.title}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <>
            <span className={isOpen === true ? "toggle-btn-open" : ""} >
              {(location?.pathname?.includes('/admin-game-management/settings/') && location?.state?.patientSettings) ? <>
                <NavLink
                  onClick={(e) => handleQuickSession(e, item)}
                  to={item.path}
                  activeclassName={`active ${!item.children && 'pe-none'} `}
                  className={childPaths?.includes(location.pathname.split('/')[1]) ? 'active pe-none' : ''}
                >
                  <i> <FontAwesomeIcon icon={item.icon} /> </i>
                  <div className='side-bar-text'> {isMenuOpen && item.title} </div>
                  {item.children && isMenuOpen && (
                    <i className='icon-arrow-drop-down drop-icon' ></i>
                  )}
                </NavLink>
              </> : <>
                <NavLink
                  onClick={toggle}
                  to={item.path}
                  activeclassName={`active ${!item.children && 'pe-none'} `}
                  className={childPaths?.includes(location.pathname.split('/')[1]) ? 'active pe-none' : ''}
                >
                  <i> <FontAwesomeIcon icon={item.icon} /> </i>
                  <div className='side-bar-text'> {isMenuOpen && item.title} </div>
                  {item.children && isMenuOpen && (
                    <i className='icon-arrow-drop-down drop-icon' ></i>
                  )}
                </NavLink>
              </>}
            </span>
          </>
        )
        }
      </li >

      <CustomModal
        open={modal?.open}
        handleClose={handleCancel}
        handleConfirm={handleConfirmNavigate}
        disableHeader
        bodyTitle='Are you sure you want to Quit the Game Session?'
      >
        <span className='text-danger'>All the data of Game will be removed</span>
      </CustomModal>
    </>
  )
}
MenuItem.propTypes = {
  item: PropTypes.object,
  isMenuOpen: PropTypes.bool
}
export default MenuItem