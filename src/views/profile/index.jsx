/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button, Spinner, Row, Col } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import EditProfileComponent from 'shared/components/Profile'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { profile, UpdateProfile } from 'query/profile/profile.query'
import { getDirtyFormValues } from 'helper/helper'
import Wrapper from 'shared/components/Wrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { ReactToastify } from 'shared/utils'

function EditProfile () {
  const query = useQueryClient()

  const [updateFlag, setUpdateFlag] = useState(false)
  const [profileData, setProfileData] = useState({})
  const [payload, setPayload] = useState()

  const { register, control, formState: { errors, isDirty, dirtyFields }, clearErrors, trigger, getValues, reset, handleSubmit, setValue, watch } = useForm({ mode: 'all' })

  // GET PROFILE DATA
  const { data } = useQuery('getProfile', profile, {
    select: (data) => data?.data?.data,
    onSuccess: (data) => {
      setProfileData(data)
      reset({
        sUserName: data?.sUserName,
        sEmail: data?.sEmail,
        sMobile: data?.sMobile,
        eUserType: data?.eUserType
      })
    },
    onError: () => {
      setProfileData({})
    }
  })

  // UPDATE PROFILE DATA
  const { mutate, isLoading } = useMutation(UpdateProfile, {
    onSuccess: (response) => {
      ReactToastify(response?.data?.message || 'Profile updated successfully!', 'success')
      query.invalidateQueries({ queryKey: ['profile'] })
      setUpdateFlag(!updateFlag)
    }
  })

  function handleChange (e) {
    const { name, value } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  useEffect(() => {
    const isDirtyData = {
      sUserName: watch('sUserName'),
      sEmail: watch('sEmail'),
      sMobile: watch('sMobile'),
    }

    const payloadData = getDirtyFormValues(dirtyFields, isDirtyData)
    setPayload(payloadData)
  }, [dirtyFields, watch('sUserName'), watch('sEmail'), watch('sMobile')])

  const onsubmit = (data) => {
    mutate({ ...payload })
  }

  useEffect(() => {
    document.title = 'My Profile | Yantra Healthcare'
  }, [])
  return (
    <>
      <Row className='justify-content-center'>
        <Col xxl={8} >
          <Wrapper>
            {!updateFlag ?
              (<button className='Profile-main-edit' onClick={() => setUpdateFlag(!updateFlag)}><FontAwesomeIcon icon={faPenToSquare} /></button>)
              : (<button className='Profile-main-cancel' onClick={() => setUpdateFlag(!updateFlag)}><FontAwesomeIcon icon={faXmark} /></button>)
            }
            <div className='edit-profile'>
              <div className='profile_icon'>{data?.eUserType === 'admin' ? <img src={data?.sAvatar} alt={data?.sUserName} className='img-content' /> : <FontAwesomeIcon icon={faUser} />}</div>
              <p>Patient Details</p>
              <Form onSubmit={handleSubmit(onsubmit)} autoComplete='off'>
                <EditProfileComponent
                  register={register}
                  control={control}
                  errors={errors}
                  clearErrors={clearErrors}
                  trigger={trigger}
                  values={getValues()}
                  profileData={profileData}
                  handleChange={(e) => handleChange(e)}
                  setValue={setValue}
                  updateFlag={updateFlag}
                />
                {updateFlag !== false &&
                  <>
                    <div className='mt-3'>
                      <Button variant='primary' type='submit' className='me-2 square' disabled={!isDirty || !updateFlag || isLoading}>
                        <FormattedMessage id='update' />
                        {isLoading && <Spinner animation='border' size='sm' variant='success' />}
                      </Button>
                      <Button variant='secondary' disabled={isLoading} className='square' onClick={() => setUpdateFlag(!updateFlag)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                }
              </Form>
            </div>
          </Wrapper>
        </Col>
      </Row>
    </>
  )
}

export default EditProfile
