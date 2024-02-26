import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Dropdown, Form, Spinner } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { logout } from 'query/auth/auth.query'
import { route } from 'shared/constants/AllRoutes'
import CustomModal from 'shared/components/Modal'
import textLogo from 'assets/images/Yantra.Care Logo.svg'
import { profile } from 'query/profile/profile.query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { ReactToastify } from 'shared/utils'
import { Controller, useForm } from 'react-hook-form'
import SocketContext from 'context/SocketContext'

function Header () {
  const navigate = useNavigate()
  const query = useQueryClient()
  const location = useLocation()

  // const { control } = useForm({ mode: 'all' })

  // const temp = localStorage.getItem('mode') === 'true'

  // const [mode, setMode] = useState(temp)
  const [clickedLogOut, setClickedLogOut] = useState(false)
  const [show, setShow] = useState(false)
  const socket = useContext(SocketContext)

  // LOGOUT QUERY
  const { isLoading, isFetching } = useQuery('logoutUser', logout, {
    enabled: clickedLogOut,
    onSuccess: (res) => {
      localStorage.removeItem('token')
      localStorage.removeItem('type')
      navigate('/login')
      ReactToastify(res?.data?.message, 'success')

      if (socket !== undefined) {
        socket.emit(location?.state?.patientSettings?._id, {
          sEventName: 'reqEndGame',
          oData: {
            eState: 'finished'
          }
        }, (response) => {
          console.warn('Socket Disconnecting and Leaveing Room.', response)
          console.warn('Socket disconnected successfully.');
          socket.disconnect()
        })
      }
    },
    onError: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('type')
      navigate('/login')
    }
  })

  // PROFILE DATA
  const { isLoading: profileLoader, data } = useQuery('profile', () => profile(), { select: (data) => data?.data?.data, })

  const handleClose = useCallback(() => setShow(false), [setShow])
  const handleLogout = useCallback(() => setShow(!show), [show, setShow])
  const handleEditProfile = useCallback(() => navigate(route.editProfile), [navigate])
  const handleChangePass = useCallback(() => navigate(route.changePassword), [navigate])

  const handleConfirmLogout = useCallback(() => {
    setClickedLogOut(true)
    query.invalidateQueries('logoutUser')
  }, [query, setClickedLogOut])

  // useEffect(() => {
  //   localStorage.setItem('mode', mode)

  //   document.body.classList.remove(!mode ? 'light' : 'dark')
  //   document.body.classList.add(mode ? 'light' : 'dark');
  // }, [mode])

  return (
    <header className='header'>
      <div className='header-left'>
        <Link className='logo' to={route.dashboard}>
          <img src={textLogo} className="textLogo" alt='Yantra Healthcare Logo' />
        </Link>
      </div>
      <div className='header-right'>
        <Dropdown>
          <Dropdown.Toggle className='header-btn'>
            <div className='user-name me-2'>{profileLoader ?
              <Spinner animation='border' size='sm' variant='default' />
              : <span>{data?.sUserName}</span>
            }
            </div>
            <div className='img'>
              {data?.eUserType === 'admin' ?
                (data?.sAvatar === ''
                  ? <div className='d-flex align-items-center justify-content-between gap-2'>
                    <FontAwesomeIcon icon={faAngleDown} size='xs' /> <span className='svg-content'><FontAwesomeIcon icon={faUser} /></span>
                  </div>
                  : <div className='d-flex align-items-center justify-content-between gap-2'>
                    <FontAwesomeIcon icon={faAngleDown} size='xs' /> <img src={data?.sAvatar} alt="" />
                  </div>)
                : <div className='d-flex align-items-center justify-content-between gap-2'>
                  <FontAwesomeIcon icon={faAngleDown} size='xs' /> <span className='svg-content'><FontAwesomeIcon icon={faUser} /></span>
                </div>}
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className='up-arrow'>
            <Dropdown.Header>Manage Account</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleEditProfile}>
              <i className='icon-account'></i>
              <FormattedMessage id='myProfile' />
            </Dropdown.Item>
            <Dropdown.Item onClick={handleChangePass}>
              <i className='icon-lock'></i>
              <FormattedMessage id='changePassword' />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLogout()}>
              <i className='icon-logout'></i>
              <FormattedMessage id='logout' />
            </Dropdown.Item>
            {/* <Dropdown.Divider />
            <div className='theme-setting'>
              <span>Light</span>
              <Controller
                name='bTachMode'
                control={control}
                render={({ field: { ref, onChange, value } }) => (
                  <Form.Check
                    ref={ref}
                    type='switch'
                    name='bTachMode'
                    className='d-inline-block mt-2'
                    checked={mode === false}
                    value={value}
                    onChange={(e) => {
                      setMode(!mode)
                      onChange(e)
                    }}
                  />
                )}
              />
              <span>Dark</span>
            </div> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <CustomModal
        open={show}
        handleClose={handleClose}
        handleConfirm={handleConfirmLogout}
        disableHeader
        bodyTitle={<FormattedMessage id='wantToLogout' />}
        isLoading={isLoading || isFetching}
      />
    </header>
  )
}

export default Header