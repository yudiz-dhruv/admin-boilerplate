import React, { useEffect, useState } from 'react'
import { Dropdown, Form, Spinner } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { logout } from 'query/auth/auth.query'
import { route } from 'shared/constants/AllRoutes'
import CustomModal from 'shared/components/Modal'
import textLogo from 'assets/images/Yantra.Care.svg'
import { profile } from 'query/profile/profile.query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { RxDotFilled } from "react-icons/rx"
import { ReactToastify } from 'shared/utils'
import { Controller, useForm } from 'react-hook-form'

function Header ({ isOpen }) {
  const navigate = useNavigate()
  const query = useQueryClient()
  const [clickedLogOut, setClickedLogOut] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  const { control } = useForm({ mode: 'all' })

  const temp = localStorage.getItem('mode') === 'true'

  const [mode, setMode] = useState(temp)

  const { isLoading, isFetching } = useQuery('logoutUser', logout, {
    enabled: clickedLogOut,
    onSuccess: (res) => {
      localStorage.removeItem('token')
      localStorage.removeItem('type')
      navigate('/login')
      ReactToastify(res?.data?.message, 'success')
    },
    onError: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('type')
      navigate('/login')
    }
  })

  const { isLoading: profileLoader, data } = useQuery('profile', () => profile(), {
    select: (data) => data?.data?.data,
  })

  const handleLogout = () => setShow(!show)

  const handleConfirmLogout = () => {
    setClickedLogOut(true)
    query.invalidateQueries('logoutUser')
  }

  function handleEditProfile () {
    navigate(route.editProfile)
  }

  function handleChangePass () {
    navigate(route.changePassword)
  }

  useEffect(() => {
    localStorage.setItem('mode', mode)

    document.body.classList.remove(!mode ? 'light' : 'dark')
    document.body.classList.add(mode ? 'light' : 'dark');
  }, [mode])

  return (
    <header className='header'>
      <div className='header-left'>
        <Link className='logo' to={route.dashboard}>
          {/* <img src={logo} className="logoIcon" alt='run to learn' /> */}
          <img src={textLogo} className="textLogo" alt='Yantra Healthcare Logo' />
          {/* <div className='logo-text'>Yantra Healthcare</div> */}
        </Link>
      </div>
      <div className='header-right'>
        <div className='user-name'>{profileLoader ?
          <Spinner animation='border' size='sm' variant='default' />
          : <span>{data?.sUserName || 'Login Again'}</span>
        }
        </div>
        <Dropdown>
          <Dropdown.Toggle className='header-btn'>
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
            <Dropdown.Divider />
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
            </div>
          </Dropdown.Menu>
        </Dropdown>
        {/* <Button className='header-btn user-btn' >
          {mode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
        </Button> */}

      </div>
      <CustomModal
        open={show}
        handleClose={handleClose}
        handleConfirm={handleConfirmLogout}
        disableHeader
        bodyTitle='Are you sure you want to logout ?'
        isLoading={isLoading || isFetching}
      />
    </header>
  )
}

export default Header