/* eslint-disable react-hooks/exhaustive-deps */
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
import useMediaQuery from 'shared/hooks/useMediaQuery'
import PatientInfo from 'shared/components/PatientInfo'
import { getDirtyFormValues } from 'helper/helper'
import { socket } from 'shared/socket'
import VergenceSettings from 'shared/components/VergenceSettings'
import TorsionSettings from 'shared/components/TorsionSettings'
import MonocularModeSettings from 'shared/components/MonocularModeSettings'

const InternalGameSettings = () => {
  const location = useLocation()
  console.log('location: ', location);
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

  const { register, formState: { errors, dirtyFields }, control, watch, handleSubmit } = useForm({ mode: 'all' })

  const [modal, setModal] = useState(false)
  const screenWidth = useMediaQuery('(max-width: 1200px)')
  const [tabletMode, setTabletMode] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const [buttonToggle, setButtonToggle] = useState({
    hoopie: false,
    ringRunner: false,
    turbo: false,
    bubbles: false
  })

  const [dominantEyeButton, setDominantEyeButton] = useState({
    left: true,
    right: false,
    none: false,
  })

  const [antiSupSettings, setAntiSupSettings] = useState({
    contrast: 0,
    occlusion: 0,
    blur: 0
  })

  const [vergenceToggle, setVergenceToggle] = useState({
    horizontal: true,
    vertical: false,
  })

  const [horizontalEyeSettings, setHorizontalEyeSettings] = useState({
    left: 0,
    right: 0
  })

  const [verticalEyeSettings, setVerticalEyeSettings] = useState({
    left: 0,
    right: 0
  })

  const [torsionSettings, setTorsionSettings] = useState({
    left: 0,
    right: 0
  })

  // hoopie game
  const [gameModeToggle, setGameModeToggle] = useState({
    head: true,
    hand: false
  })

  const [textPositionToggle, setTextPositionToggle] = useState({
    center: true,
    random: false
  })

  // ring runner game
  const [ringrunnerMode, setRingRunnerMode] = useState({
    normal: true,
    gabor: false,
  })

  // turbo game
  const [turboGameMode, setTurboGameMode] = useState({
    turbo: true,
    hammer: false,
  })

  // List
  const { isLoading, data } = useQuery(['gameList', requestParams], () => getGameList(requestParams), {
    select: (data) => data.data.data?.game,
  })

  // DROPDOWN GAME LIST
  const { data: eGameDropdown } = useQuery('dropdownGame', getGameDropdownList, {
    select: (data) => data?.data?.data,
  })

  useEffect(() => {
    if (socket.connected) {
      const isDirtyData = {
        nConstrast: watch('nConstrast'),
        nOcclusion: watch('nOcclusion'),
      }

      const payloadData = getDirtyFormValues(dirtyFields, isDirtyData)

      if (payloadData.nConstrast || payloadData.nOcclusion) {
        socket.emit('ping', {
          '_id': {
            oid: ''
          },
          eDominantEye: Object.keys(dominantEyeButton).find(key => dominantEyeButton[key] === true) || 'left',
          oVergence: {
            oHorizontal: {
              sLeftEye: watch('nHorizontalLeft') || 0,
              sRightEye: watch('nHorizontalRight') || 0,
            },
            oVertical: {
              sLeftEye: watch('nVerticalLeft') || 0,
              sRightEye: watch('nVerticalRight') || 0,
            }
          },
          oTorsion: {
            sLeftEye: watch('nTorsionLeft') || 0,
            sRightEye: watch('nTorsionRight') || 0,
          },
          bMonocularMode: watch('bMonocularMode') || true,
          oVisions: {
            nContrast: watch('nContrast') || 0,
            nOcclusion: watch('nOcclusion') || 0,
            nBlur: watch('nBlur') || 0
          },
          aGameStructure: [
            {
              sName: 'hoopie',
              nDuration: watch('sHoopieGameDuration') || 1,
              sMode: Object.keys(gameModeToggle).find(key => gameModeToggle[key] === true) || 'head',
              bTachMode: watch('bTachMode') || true,
              nSpeed: watch('nHoopieBallSpeed')?.value || 1,
              nTargetRadius: watch('nHoopieTargetRadius')?.value || 0,
              sSpawnRate: watch('sHoopieSpawnRate')?.value || 'high',
              nStimulusSize: watch('nHoopieStimulusSize')?.value || 0.5,
              sBasketSize: watch('sHoopSize')?.value || 'max',
              sTextPosition: Object.keys(textPositionToggle).find(key => textPositionToggle[key] === true) || 'center'
            },
            {
              sName: 'ringRunner',
              nDuration: watch('sRRGameDuration') || 1,
              sMode: Object.keys(ringrunnerMode).find(key => ringrunnerMode[key] === true) || 'normal',
              nStimulusSize: watch('nRRStimulusSize')?.value || '-0.3',
              nShipSpeed: watch('nShipSpeed')?.value || 1,
              sPowerDuration: watch('sPowerDuration')?.value || 'low',
              sPowerUpSpawnRate: watch('sPowerUpDelay')?.value || 'very low',
              sObstacleSpawnRate: watch('sObstacleDelay')?.value || 'very low',
            },
            {
              sName: 'turbo',
              nDuration: watch('nTurboGameDuration') || 1,
              sMode: Object.keys(turboGameMode).find(key => turboGameMode[key] === true) === 'hammer' && 'hammer',
              eTargetStayDuration: watch('nHammerTargetStayDuration') || 'low',
              eGameType: watch('sHammerGameType')?.value || 'hit All',
              eHammerType: watch('sHammerType')?.value || 'single',
              eMobSpawnType: watch('sTargetSpawnType')?.value || 'single',
              eMobColorType: watch('sTargetColorType')?.value || 'single',
              sTargetSpeed: watch('sHammerTargetSpeed')?.value || 'slow'
            },
            {
              sName: 'turbo',
              nDuration: watch('nTurboGameDuration') || 1,
              sMode: Object.keys(turboGameMode).find(key => turboGameMode[key] === true) === 'turbo' && 'turbo',
              sButtonSize: watch('sTurboButtonSize')?.value || 'small',
              sButtonCount: watch('sTurboButtonCount')?.value || 'very less',
              eTargetStayDuration: watch('sTurboTargetStayDuration')?.value || 'low',
              eHorizontalBias: watch('sHorizontalBias')?.value || 'left',
              eVerticalBias: watch('sVerticalBias')?.value || 'top',
              sNextTargetDelay: watch('sTurboNextTargetDelay')?.value || 'low',
              sTargetSpread: watch('sTurboTargetSpread')?.value || 'small',
              bHeadlock: watch('bHeadlock') || false
            },
            {
              sName: 'bubbleBurst',
              nDuration: watch('sBubbleGameDuration') || 1,
              sMode: watch('sBubbleGameMode')?.value || 'series',
              sPattern: watch('sBubblePattern')?.value || 'duplet',
              nImageSize: watch('nBubbleImageSize')?.value || 1,
              sSepration: watch('sBubbleSeperation')?.value || 'very low',
              sDisparity: watch('sBubbleDisparity')?.value || 'max'
            }
          ]
        }, (e, data) => console.log('response data', e, data))
      }
    }

    socket.on('ping', (payload, e) => {
      console.log('payload :>> ', payload, e);
    })

    socket.on("connect_error", (error) => {
      console.log("Connection Error:", error);
    })

    socket.on("disconnect", (reason) => {
      if (reason === 'io server disconnect' || reason === 'io client disconnect') {
        socket.connect()
      }
      console.log("Disconnected:", reason);
    })
  }, [watch('nConstrast'), watch('nOcclusion')])

  async function onSubmit (data) {
    console.log('data: ', data);
  }

  function handleClear () {
    setModal(false)
  }

  useEffect(() => {
    document.title = 'Game Settings | Yantra Healthcare'

    if (screenWidth) {
      setTabletMode(true)
    } else {
      setTabletMode(false)
    }
  }, [screenWidth])

  console.log('watch :>> ', watch('sBubbleSeperation'));
  return (
    <>
      <Form className='step-one' autoComplete='off'>
        <Row>
          <Col xs={12}>
            <div className='game-settings'>
              <Row>
                {tabletMode ?
                  <>
                    <Col xl={4} lg={12} className='global'>
                      <Wrapper>
                        <div className='settings'>
                          <div className='mx-3'>
                            <PatientInfo
                              data={location?.state?.patientDetails}
                            />
                          </div>

                          <Row>
                            <Col xl={12} lg={6} md={6}>
                              <div className='mt-4 mx-3'>
                                <MonocularModeSettings
                                  control={control}
                                  errors={errors}
                                />
                              </div>
                            </Col>

                            <Col xl={12} lg={6} md={6}>
                              <div className='mt-4 mx-3'>
                                <DominantEyeSettings
                                  buttonToggle={dominantEyeButton}
                                  setButtonToggle={setDominantEyeButton} />
                              </div>
                            </Col>

                            <Col xl={12} lg={6} md={6}>
                              <div className='mt-4 mx-3'>
                                <AntiSupSettings
                                  control={control}
                                  settings={antiSupSettings}
                                  setSettings={setAntiSupSettings}
                                />
                              </div>
                            </Col>

                            <Col xl={12} lg={6} md={6}>
                              <div className='mt-4 mx-3'>
                                <VergenceSettings
                                  control={control}
                                  horizontalSettings={horizontalEyeSettings}
                                  setHorizontalSettings={setHorizontalEyeSettings}
                                  verticalSettings={verticalEyeSettings}
                                  setVerticalSettings={setVerticalEyeSettings}
                                  vergenceToggle={vergenceToggle}
                                  setVergenceToggle={setVergenceToggle}
                                />
                              </div>
                            </Col>

                            <Col xl={12} lg={6} md={6}>
                              <div className='mt-4 mx-3'>
                                <TorsionSettings
                                  control={control}
                                  errors={errors}
                                  settings={torsionSettings}
                                  setSettings={setTorsionSettings}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Wrapper>
                    </Col>

                    <Col xl={8} lg={12} className='mt-xl-0 mt-3 game-global'>
                      <Wrapper>
                        <div className='games'>
                          <div className=''>
                            <AntiSupGameSettings
                              control={control}
                              errors={errors}
                              gameModeToggle={gameModeToggle}
                              setGameModeToggle={setGameModeToggle}
                              textPositionToggle={textPositionToggle}
                              setTextPositionToggle={setTextPositionToggle}
                              ringrunnerMode={ringrunnerMode}
                              setRingRunnerMode={setRingRunnerMode}
                              register={register}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              games={data}
                              watch={watch}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                            />
                          </div>

                          <div className='mt-4'>
                            <OculomotorSettings
                              control={control}
                              errors={errors}
                              watch={watch}
                              register={register}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              turboGameMode={turboGameMode}
                              setTurboGameMode={setTurboGameMode}
                              games={data}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                            />
                          </div>

                          <div className='mt-4'>
                            <StereopsisSettings
                              errors={errors}
                              register={register}
                              control={control}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              games={data}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                            />
                          </div>

                          {Object.values(buttonToggle).some(Boolean) ?
                            <Row className='mt-3 text-end'>
                              <Col sm={12}>
                                <Button variant='primary' type='button' className='square' disabled={gameStarted} onClick={() => setModal(true)}>
                                  Save Progress
                                </Button>
                              </Col>
                            </Row>
                            : null}
                        </div>
                      </Wrapper>
                    </Col>
                  </> :
                  <>
                    <Col xl={8} lg={12} className='game-global'>
                      <Wrapper>
                        <div className='games'>
                          <div className=''>
                            <AntiSupGameSettings
                              control={control}
                              errors={errors}
                              watch={watch}
                              register={register}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              gameModeToggle={gameModeToggle}
                              setGameModeToggle={setGameModeToggle}
                              textPositionToggle={textPositionToggle}
                              setTextPositionToggle={setTextPositionToggle}
                              ringrunnerMode={ringrunnerMode}
                              setRingRunnerMode={setRingRunnerMode}
                              games={data}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                            />
                          </div>

                          <div className='mt-4'>
                            <OculomotorSettings
                              control={control}
                              errors={errors}
                              watch={watch}
                              register={register}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              turboGameMode={turboGameMode}
                              setTurboGameMode={setTurboGameMode}
                              games={data}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                            />
                          </div>

                          <div className='mt-4'>
                            <StereopsisSettings
                              errors={errors}
                              register={register}
                              control={control}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              games={data}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                            />
                          </div>

                          {Object.values(buttonToggle).some(Boolean) ?
                            <Row className='mt-3 text-end'>
                              <Col sm={12}>
                                <Button variant='primary' type='button' className='square' disabled={gameStarted} onClick={() => setModal(true)}>
                                  Save Progress
                                </Button>
                              </Col>
                            </Row>
                            : null}
                        </div>
                      </Wrapper>
                    </Col>

                    <Col xl={4} lg={12} className='mt-xl-0 mt-3 global'>
                      <Wrapper>
                        <div className='settings'>
                          <div className='mx-3'>
                            <PatientInfo
                              data={location?.state?.patientDetails}
                            />
                          </div>

                          <div className='mt-4 mx-3'>
                            <MonocularModeSettings
                              control={control}
                              errors={errors}
                            />
                          </div>

                          <div className='mt-3 mx-3'>
                            <DominantEyeSettings
                              buttonToggle={dominantEyeButton}
                              setButtonToggle={setDominantEyeButton} />
                          </div>

                          <div className='mt-4 mx-3'>
                            <AntiSupSettings
                              control={control}
                              settings={antiSupSettings}
                              setSettings={setAntiSupSettings}
                            />
                          </div>

                          <div className='mt-4 mx-3'>
                            <VergenceSettings
                              control={control}
                              horizontalSettings={horizontalEyeSettings}
                              setHorizontalSettings={setHorizontalEyeSettings}
                              verticalSettings={verticalEyeSettings}
                              setVerticalSettings={setVerticalEyeSettings}
                              vergenceToggle={vergenceToggle}
                              setVergenceToggle={setVergenceToggle}
                            />
                          </div>

                          <div className='mt-4 mx-3'>
                            <TorsionSettings
                              control={control}
                              errors={errors}
                              settings={torsionSettings}
                              setSettings={setTorsionSettings}
                            />
                          </div>

                        </div>
                      </Wrapper>
                    </Col>
                  </>}
              </Row>
            </div>
          </Col>
        </Row>
      </Form >

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
