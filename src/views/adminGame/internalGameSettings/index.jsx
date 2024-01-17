import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import Wrapper from 'shared/components/Wrap'
import { useForm, Controller } from 'react-hook-form'
import DominantEyeSettings from 'shared/components/DominantEyeSettings'
import AntiSupSettings from 'shared/components/AntiSupSettings'
import AntiSupGameSettings from 'shared/components/AntiSupGameSettings'
import OculomotorSettings from 'shared/components/OculomotorSettings'
import StereopsisSettings from 'shared/components/StereopsisSettings'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import { parseParams } from 'shared/utils'
import { getGameDropdownList, getGameList } from 'query/game/game.query'
import CommonInput from 'shared/components/CommonInput'
import Select from 'react-select'
import Datetime from 'react-datetime'

const InternalGameSettings = () => {
  const location = useLocation()
  const params = useRef(parseParams(location.search))

  function getRequestParams (e) {
    const data = e ? parseParams(e) : params.current
    return {
      pageNumber: +data?.pageNumber?.[0] || 1,
      nStart: (+data?.pageNumber?.[0] - 1) || 0,
      search: data?.search || '',
      nLimit: data?.nLimit || 10,
      eStatus: data.eStatus || 'y',
      eCategory: data?.eCategory || '',
      sort: data.sort || '',
      orderBy: +data.orderBy === 1 ? 'ASC' : 'DESC',
      totalElements: +data?.totalElements || 0
    }
  }

  const [requestParams] = useState(getRequestParams())

  const { register, formState: { errors }, control, watch, handleSubmit } = useForm({ mode: 'all' })

  const [modal, setModal] = useState(false)

  const [dominantEyeButton, setDominantEyeButton] = useState({
    left: true,
    right: false,
    none: false,
  })

  const [buttonToggle, setButtonToggle] = useState({
    hoopie: false,
    ringRunner: false,
    turbo: false,
    bubbles: false
  })

  const [antiSupSettings, setAntiSupSettings] = useState({
    contrast: 0,
    occlusion: 0,
    blur: 0
  })

  // List
  const { isLoading, data } = useQuery(['gameList', requestParams], () => getGameList(requestParams), {
    select: (data) => data.data.data?.game,
  })

  // DROPDOWN GAME LIST
  const { data: eGameDropdown } = useQuery('dropdownGame', getGameDropdownList, {
    select: (data) => data?.data?.data,
  })

  async function onSubmit (data) {
  }

  function handleClear () {
    setModal(false)
  }

  useEffect(() => {
    document.title = 'Game Settings | Yantra Healthcare'
  }, [])

  return (
    <>
      <Form className='step-one' autoComplete='off'>
        <Row>
          <Col xs={12}>
            <Wrapper>
              <div className='game-settings'>
                <Row>
                  <Col xl={6} lg={12}>
                    <div className='settings'>
                      <div className=''>
                        <DominantEyeSettings
                          buttonToggle={dominantEyeButton}
                          setButtonToggle={setDominantEyeButton} />
                      </div>

                      <div className='mt-3'>
                        <AntiSupSettings
                          control={control}
                          settings={antiSupSettings}
                          setSettings={setAntiSupSettings}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col xl={6} lg={12} className='mt-xl-0 mt-3'>
                    <div className='games'>
                      <div className=''>
                        <AntiSupGameSettings
                          control={control}
                          errors={errors}
                          register={register}
                          buttonToggle={buttonToggle}
                          setButtonToggle={setButtonToggle}
                          games={data}
                          isLoading={isLoading}
                        />
                      </div>

                      <div className='mt-3'>
                        <OculomotorSettings
                          control={control}
                          errors={errors}
                          watch={watch}
                          register={register}
                          buttonToggle={buttonToggle}
                          setButtonToggle={setButtonToggle}
                          games={data}
                          isLoading={isLoading}
                        />
                      </div>

                      <div className='mt-3'>
                        <StereopsisSettings
                          errors={errors}
                          control={control}
                          buttonToggle={buttonToggle}
                          setButtonToggle={setButtonToggle}
                          games={data}
                          isLoading={isLoading}
                        />
                      </div>

                      {Object.values(buttonToggle).some(Boolean) ?
                        <Row className='mt-3 text-end'>
                          <Col sm={12}>
                            <Button variant='primary' type='button' className='square' onClick={() => setModal(true)}>
                              End Game
                            </Button>
                          </Col>
                        </Row>
                        : null}
                    </div>
                  </Col>
                </Row>
              </div>
            </Wrapper>
          </Col>
        </Row>
      </Form>

      {modal &&
        <Modal show={modal} onHide={() => setModal(false)} id='add-ticket' size='lg'>
          <Form className='step-one' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title className='add-ticket-header'>Enter Patient Progress</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={6}>
                  <Form.Group className='form-group reSchedule-datepicker mb-2'>
                    <Form.Label>
                      <span>
                        Date & Time
                        <span className='inputStar'>*</span>
                      </span>
                    </Form.Label>
                    <Controller
                      name="dTime"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'Time is required'
                        }
                      }}
                      render={({ field }) => (
                        <Datetime
                          {...field}
                          selected={field.value}
                          timeInputLabel="Time:"
                          dateFormat="MM/DD/yyyy"
                          showTimeInput
                          inputProps={{
                            placeholder: 'Select the time',
                          }}
                          isValidDate={(currentDate, selectedDate) => {
                            return !currentDate.isBefore(new Date(), 'day');
                          }}
                          onChange={(date) => field.onChange(date)}
                          isClearable={true}
                        />
                      )}
                    />
                    {errors?.dTime && (
                      <Form.Control.Feedback type='invalid'>
                        {errors?.dTime.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className='form-group'>
                    <Form.Label>
                      <span>
                        Game Played
                        <span className='inputStar'>*</span>
                      </span>
                    </Form.Label>
                    <Controller
                      name='aGamesName'
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'Game name(s) are required.'
                        }
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          placeholder='Select Games...'
                          ref={ref}
                          options={eGameDropdown}
                          className={`react-select border-0 ${errors.aGamesName && 'error'}`}
                          classNamePrefix='select'
                          isSearchable={false}
                          value={value}
                          onChange={onChange}
                          isMulti={true}
                          getOptionLabel={(option) => option.sName}
                          getOptionValue={(option) => option._id}
                        />
                      )}
                    />
                    {errors.aGamesName && (
                      <Form.Control.Feedback type='invalid'>
                        {errors.aGamesName.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <CommonInput
                    type='textarea'
                    register={register}
                    errors={errors}
                    className={`for m-control ${errors?.sDescription && 'error'}`}
                    name='sDescription'
                    label='Enter Comments'
                    placeholder='Enter the comments...'
                    required
                    validation={{
                      required: {
                        value: true,
                        message: 'Description is required'
                      },
                    }}
                    onChange={(e) => {
                      e.target.value =
                        e.target.value?.trim() &&
                        e.target.value.replace(/^[0-9]+$/g, '')
                    }}
                  />
                </Col>
              </Row>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type='submit' className='square' >
                Save
              </Button>
              <Button variant="secondary" className='square' onClick={() => handleClear()}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form >
        </Modal>
      }
    </>
  )
}

export default InternalGameSettings
