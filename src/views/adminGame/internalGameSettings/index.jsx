/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
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
import { getGameDropdownList } from 'query/game/game.query'
import CommonInput from 'shared/components/CommonInput'
import Select from 'react-select'
import Datetime from 'react-datetime'
import useMediaQuery from 'shared/hooks/useMediaQuery'
import PatientInfo from 'shared/components/PatientInfo'
import { socket } from 'shared/socket'
import VergenceSettings from 'shared/components/VergenceSettings'
import TorsionSettings from 'shared/components/TorsionSettings'
import MonocularModeSettings from 'shared/components/MonocularModeSettings'
import { ReactToastify } from 'shared/utils'

const InternalGameSettings = () => {
  const location = useLocation()
  const screenWidth = useMediaQuery('(max-width: 1200px)')

  const { register, formState: { errors }, control, watch, handleSubmit, reset } = useForm({ mode: 'all' })

  const [tabletMode, setTabletMode] = useState(false)
  const [modal, setModal] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [tachMode, setTachMode] = useState('y')
  const [headLockMode, setHeadLockMode] = useState('n')
  const [connectivityStatus, setConnectivityStatus] = useState('')

  const [buttonToggle, setButtonToggle] = useState({
    hoopie: false,
    ringRunner: false,
    turbo: false,
    bubbles: false
  })

  const [dominantEyeButton, setDominantEyeButton] = useState(() => ({
    left: true,
    right: false,
    none: false,
  }))

  const [antiSupSettings, setAntiSupSettings] = useState(() => ({
    contrast: 0,
    occlusion: 0,
    blur: 0
  }))

  const [vergenceToggle, setVergenceToggle] = useState(() => ({
    horizontal: true,
    vertical: false,
  }))

  const [horizontalEyeSettings, setHorizontalEyeSettings] = useState(() => ({
    left: 0,
    right: 0
  }))

  const [verticalEyeSettings, setVerticalEyeSettings] = useState(() => ({
    left: 0,
    right: 0
  }))

  const [torsionSettings, setTorsionSettings] = useState(() => ({
    left: 0,
    right: 0
  }))

  // hoopie game
  const [gameModeToggle, setGameModeToggle] = useState(() => ({
    head: true,
    hand: false
  }))

  const [textPositionToggle, setTextPositionToggle] = useState(() => ({
    center: true,
    random: false
  }))

  // ring runner game
  const [ringrunnerMode, setRingRunnerMode] = useState(() => ({
    normal: true,
    gabor: false,
  }))

  // turbo game
  const [turboGameMode, setTurboGameMode] = useState(() => ({
    turbo: true,
    hammer: false,
  }))

  // DROPDOWN GAME LIST
  const { data: eGameDropdown, isLoading } = useQuery('dropdownGame', getGameDropdownList, { select: (data) => data?.data?.data, })


  // Join Room UseEffect
  useEffect(() => {
    socket.emit('reqJoinRoom', { iUserId: location?.state?.patientSettings?._id }, (response) => {
      if (response?.oData) {
        console.log('%cJoin Room: ', 'color: orange', response?.oData)
      } else {
        console.log('%cJoin Room Error: ', 'color: red', response?.message)
      }
    })
  }, [socket, location?.state])

  // Game status useEffect
  useEffect(() => {
    socket.on('resGameState', (response) => {
      setConnectivityStatus(response?.eState)
      console.log('%cGame Status :>> ', 'color: #00bf7f', response);
    })
  }, [buttonToggle])

  const currentGameData = eGameDropdown?.find((item) => buttonToggle[item.sName.toLowerCase()] === true)

  const HOOPIE_GAME_STRUCTURE = {
    sMode: Object.keys(gameModeToggle).find(key => gameModeToggle[key] === true) || 'head',
    bTachMode: watch('bTachMode') || true,
    nDuration: watch('sHoopieGameDuration') || 1,
    sBasketSize: watch('sHoopSize')?.value || 'max',
    nTargetRadius: watch('nHoopieTargetRadius')?.value || 0,
    nSpeed: watch('nHoopieBallSpeed')?.value || 1,
    sSpawnRate: watch('sHoopieSpawnRate')?.value || 'high',
    nStimulusSize: watch('nHoopieStimulusSize')?.value || 0.5,
    sTextPosition: Object.keys(textPositionToggle).find(key => textPositionToggle[key] === true) || 'center'
  }

  const RINGRUNNER_GAME_STRUCTURE = {
    nDuration: watch('sRRGameDuration') || 1,
    sMode: Object.keys(ringrunnerMode).find(key => ringrunnerMode[key] === true) || 'normal',
    nStimulusSize: watch('nRRStimulusSize')?.value || -0.3,
    nShipSpeed: watch('nShipSpeed')?.value || 1,
    sPowerDuration: watch('sPowerDuration')?.value || 'low',
    sPowerUpSpawnRate: watch('sPowerUpDelay')?.value || 'very low',
    sObstacleSpawnRate: watch('sObstacleDelay')?.value || 'very low',
    nLocalOrientation: +watch('sLocalOrientation') || 90,
    nGlobalOrientation: +watch('sGlobalOrientation') || 120,
    nFrequency: watch('nGaborFrequency')?.value || 2,
  }

  const TURBO_GAME_STRUCTURE = {
    nDuration: watch('nTurboGameDuration') || 1,
    sMode: Object.keys(turboGameMode).find(key => turboGameMode[key] === true) === 'turbo' && 'turbo',
    sButtonSize: watch('sTurboButtonSize')?.value || 'small',
    sButtonCount: watch('sTurboButtonCount')?.value || 'very less',
    eHorizontalBias: watch('sHorizontalBias')?.value || 'left',
    eVerticalBias: watch('sVerticalBias')?.value || 'top',
    eTargetStayDuration: Object.keys(turboGameMode).find(key => turboGameMode[key] === true) === 'turbo' ? (watch('sTurboTargetStayDuration')?.value || 'low') : (watch('nHammerTargetStayDuration')?.value || 'low'),
    sNextTargetDelay: watch('sTurboNextTargetDelay')?.value || 'low',
    sTargetSpread: watch('sTurboTargetSpread')?.value || 'small',
    bHeadlock: watch('bHeadlock') || false
  }

  const BUBBLES_GAME_STRUCTURE = {
    nDuration: watch('sBubbleGameDuration') || 5,
    sMode: watch('sBubbleGameMode')?.value || 'series',
    sPattern: watch('sBubblePattern')?.value || 'duplet',
    nStimulusSize: watch('nBubbleStimulusSize')?.value || 1,
    sSepration: watch('sBubbleSeperation')?.value || 'high',
    sDisparity: watch('sBubbleDisparity')?.value || 'max',
    nPanelDistance: watch('nPanelDistance')?.value || 1,
  }

  const getCurrentGameStructure = (name) => {
    switch (name) {
      case 'Hoopie':
        return HOOPIE_GAME_STRUCTURE;
      case 'RingRunner':
        return RINGRUNNER_GAME_STRUCTURE;
      case 'Turbo':
        return TURBO_GAME_STRUCTURE;
      case 'Bubbles':
        return BUBBLES_GAME_STRUCTURE;
      default:
        break;
    }
  }

  const gameStructure = getCurrentGameStructure(currentGameData?.sName)

  useEffect(() => {
    if (gameStarted === true) {
      socket.emit(location?.state?.patientSettings?._id, {
        sEventName: 'reqSetSetting',
        oData: {
          oGameSetting: {
            iGameId: currentGameData?._id,
            sName: currentGameData?.sName,
            ...gameStructure,
            oGlobalSettings: {
              eDominantEye: Object.keys(dominantEyeButton).find(key => dominantEyeButton[key] === true),
              oVergence: {
                oHorizontal: {
                  sLeftEye: watch('nHorizontalLeft'),
                  sRightEye: watch('nHorizontalRight'),
                },
                oVertical: {
                  sLeftEye: watch('nVerticalLeft'),
                  sRightEye: watch('nVerticalRight'),
                }
              },
              oTorsion: {
                sLeftEye: watch('nTorsionLeft'),
                sRightEye: watch('nTorsionRight'),
              },
              bMonocularMode: watch('bMonocularMode'),
              oVisions: {
                nContrast: watch('nContrast'),
                nOcclusion: watch('nOcclusion'),
                nBlur: watch('nBlur')
              },
            }
          },
        }
      }, (error, response) => {
        if (response) {
          console.log('%cGame Settings: ', 'color: #1ba1bc', response)
        } else {
          if (error.message === 'Game is in invalid state') {
            ReactToastify('Please wait for the App connection!', 'error', 'invalid-status')
          }
          console.log('%cGame Settings (Error): ', 'color: red', error)
        }
      })
    }
  }, [(gameStarted === true),
    dominantEyeButton,
  watch('nHorizontalLeft'),
  watch('nHorizontalRight'),
  watch('nVerticalLeft'),
  watch('nVerticalRight'),
  watch('nTorsionLeft'),
  watch('nTorsionRight'),
  watch('bMonocularMode'),
  watch('nContrast'),
  watch('nOcclusion'),
  watch('nBlur'),
    getCurrentGameStructure,
    HOOPIE_GAME_STRUCTURE,
    RINGRUNNER_GAME_STRUCTURE,
    TURBO_GAME_STRUCTURE,
    BUBBLES_GAME_STRUCTURE])

  // useEffect(() => {
  //   const currentGameData = eGameDropdown?.find((item) => buttonToggle[item.sName.toLowerCase()] === true)

  //   socket.emit('reqPlay', {
  //     oData: {
  //       oGamePlay: {
  //         iGameId: currentGameData?._id,
  //         sName: currentGameData?.sName
  //       }
  //     }
  //   }, (err, res) => {
  //     if (res) {
  //       console.log('Request Game Play: ', res)
  //     } else {
  //       console.log('Request Game Play (Error): ', err)
  //     }
  //   })

  // }, [socket, eGameDropdown, buttonToggle])

  const onSubmit = useCallback((data) => console.log('data: ', data), [])
  const handleClear = useCallback(() => setModal(false), [setModal, modal])

  const handleStartGame = useCallback((e, buttonToggle) => {
    e?.preventDefault()

    const RINGRUNNER_DEFAULT_VALUES = {
      nDuration: 1,
      sMode: 'normal',
      nStimulusSize: -0.3,
      nShipSpeed: 1,
      sPowerDuration: 'low',
      sPowerUpSpawnRate: 'very low',
      sObstacleSpawnRate: 'very low',
      nLocalOrientation: 90,
      nGlobalOrientation: 120,
      nFrequency: 2,
    }

    socket.emit(location?.state?.patientSettings?._id, {
      sEventName: 'reqPlay',
      oData: {
        oGamePlay: {
          iGameId: currentGameData?._id,
          sName: currentGameData?.sName,
          sBundle: currentGameData?.sUrl,
          eGameState: 'playing',
        },
        oGameSetting: {
          ...RINGRUNNER_DEFAULT_VALUES,
          aGlobal: {
            eDominantEye: 'left',
            oVergence: {
              oHorizontal: {
                sLeftEye: -1,
                sRightEye: 0,
              },
              oVertical: {
                sLeftEye: -1,
                sRightEye: 0,
              }
            },
            oTorsion: {
              sLeftEye: -1,
              sRightEye: 0,
            },
            bMonocularMode: true,
            oVisions: {
              nContrast: 0,
              nOcclusion: 0,
              nBlur: 0
            },
          }
        }
      }
    }, (error, response) => {
      if (response) {
        setGameStarted(true)
        console.log('%cWhich Game Started? ', 'color: #1ba1bc', response)
      } else {
        if (error.message === 'Game is in invalid state') {
          ReactToastify('Please wait for the App connection!', 'error', 'invalid-status')
          setGameStarted(false)
        }
        console.log('%cWhich Game Started? (Error): ', 'color: red', error)
      }
    })
  }, [gameStarted, setGameStarted])

  const handleEndGame = useCallback((e, buttonData) => {
    e.preventDefault()

    socket.emit(location?.state?.patientSettings?._id, {
      sEventName: 'reqEndParticularGame',
      oData: {
        eGameState: 'finished'
      }
    }, (error, response) => {
      if (response) {
        console.log('%cGame Ended: ', 'color: #fff', response)
      } else {
        console.log('%cGame Ended (Error): ', 'color: red', error)
      }
    })

    setGameStarted(false)
  }, [gameStarted, setGameStarted])

  useEffect(() => {
    document.title = 'Game Settings | Yantra Healthcare'

    if (screenWidth) {
      setTabletMode(true)
    } else {
      setTabletMode(false)
    }
  }, [screenWidth])

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
                              defaultData={location?.state?.patientSettings}
                              data={location?.state?.patientDetails}
                              status={connectivityStatus}
                            />
                          </div>

                          <Row>
                            <Col xl={12} lg={6} md={6}>
                              <div className='mt-4 mx-3'>
                                <MonocularModeSettings
                                  control={control}
                                  errors={errors}
                                  reset={reset}
                                  defaultData={location?.state?.patientSettings}
                                />
                              </div>
                            </Col>

                            <Col xl={12} lg={6} md={6}>
                              <div className='mt-4 mx-3'>
                                <DominantEyeSettings
                                  buttonToggle={dominantEyeButton}
                                  setButtonToggle={setDominantEyeButton}
                                  reset={reset}
                                  defaultData={location?.state?.patientSettings}
                                />
                              </div>
                            </Col>

                            <Col xl={12} lg={6} md={6}>
                              <div className='mt-4 mx-3'>
                                <AntiSupSettings
                                  control={control}
                                  settings={antiSupSettings}
                                  setSettings={setAntiSupSettings}
                                  reset={reset}
                                  defaultData={location?.state?.patientSettings}
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
                              games={eGameDropdown}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                              tachMode={tachMode}
                              setTachMode={setTachMode}
                              data={location?.state?.patientSettings?.oSetting?.aGameStructure}
                              handleEndGame={handleEndGame}
                              handleStartGame={handleStartGame}
                            />
                          </div>

                          <div className='mt-4'>
                            <OculomotorSettings
                              control={control}
                              errors={errors}
                              register={register}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              turboGameMode={turboGameMode}
                              setTurboGameMode={setTurboGameMode}
                              games={eGameDropdown}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                              headLockMode={headLockMode}
                              setHeadLockMode={setHeadLockMode}
                              data={location?.state?.patientSettings?.oSetting?.aGameStructure}
                              handleEndGame={handleEndGame}
                              handleStartGame={handleStartGame}
                            />
                          </div>

                          <div className='mt-4'>
                            <StereopsisSettings
                              errors={errors}
                              register={register}
                              control={control}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              games={eGameDropdown}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                              data={location?.state?.patientSettings?.oSetting?.aGameStructure}
                              handleEndGame={handleEndGame}
                              handleStartGame={handleStartGame}
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
                              gameModeToggle={gameModeToggle}
                              setGameModeToggle={setGameModeToggle}
                              textPositionToggle={textPositionToggle}
                              setTextPositionToggle={setTextPositionToggle}
                              ringrunnerMode={ringrunnerMode}
                              setRingRunnerMode={setRingRunnerMode}
                              register={register}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              games={eGameDropdown}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                              tachMode={tachMode}
                              setTachMode={setTachMode}
                              data={location?.state?.patientSettings?.oSetting?.aGameStructure}
                              handleEndGame={handleEndGame}
                              handleStartGame={handleStartGame}
                            />
                          </div>

                          <div className='mt-4'>
                            <OculomotorSettings
                              control={control}
                              errors={errors}
                              register={register}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              turboGameMode={turboGameMode}
                              setTurboGameMode={setTurboGameMode}
                              games={eGameDropdown}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                              headLockMode={headLockMode}
                              setHeadLockMode={setHeadLockMode}
                              data={location?.state?.patientSettings?.oSetting?.aGameStructure}
                              handleEndGame={handleEndGame}
                              handleStartGame={handleStartGame}
                            />
                          </div>

                          <div className='mt-4'>
                            <StereopsisSettings
                              errors={errors}
                              register={register}
                              control={control}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              games={eGameDropdown}
                              isLoading={isLoading}
                              gameStarted={gameStarted}
                              setGameStarted={setGameStarted}
                              data={location?.state?.patientSettings?.oSetting?.aGameStructure}
                              handleEndGame={handleEndGame}
                              handleStartGame={handleStartGame}
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
                              defaultData={location?.state?.patientSettings}
                              status={connectivityStatus}
                            />
                          </div>

                          <div className='mt-4 mx-3'>
                            <MonocularModeSettings
                              control={control}
                              errors={errors}
                              reset={reset}
                              defaultData={location?.state?.patientSettings}
                            />
                          </div>

                          <div className='mt-3 mx-3'>
                            <DominantEyeSettings
                              buttonToggle={dominantEyeButton}
                              setButtonToggle={setDominantEyeButton}
                              reset={reset}
                              defaultData={location?.state?.patientSettings}
                            />
                          </div>

                          <div className='mt-4 mx-3'>
                            <AntiSupSettings
                              control={control}
                              settings={antiSupSettings}
                              setSettings={setAntiSupSettings}
                              reset={reset}
                              defaultData={location?.state?.patientSettings}
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

