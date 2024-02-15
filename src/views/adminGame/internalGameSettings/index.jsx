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
import { getDirtyFormValues } from 'helper/helper'
import { socket } from 'shared/socket'
import VergenceSettings from 'shared/components/VergenceSettings'
import TorsionSettings from 'shared/components/TorsionSettings'
import MonocularModeSettings from 'shared/components/MonocularModeSettings'
import { eBallSpeed, eBubbleGameMode, eBubbleImageSize, eBubblePattern, eButtonCount, eButtonSize, eGaborFrequency, eHoopSize, eHoopieStimulusSizes, eHorizontalBiasOption, ePowerUpDelay, ePowerUpDuration, eShipSpeed, eSpawnRate, eStimulusSizes, eTargetRadius, eTargetSpawnType, eTargetSpeed, eTargetStayDurationOption, eTurboGameType, eTurboHammerType, eVerticallBiasOption } from 'shared/constants/TableHeaders'
import { ReactToastify } from 'shared/utils'

const InternalGameSettings = () => {
  const location = useLocation()
  const screenWidth = useMediaQuery('(max-width: 1200px)')

  const { register, formState: { errors, dirtyFields }, control, watch, handleSubmit, reset } = useForm({ mode: 'all' })

  const [tabletMode, setTabletMode] = useState(false)
  const [modal, setModal] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [tachMode, setTachMode] = useState('y')
  const [headLockMode, setHeadLockMode] = useState('n')

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
    if (socket) {
      socket.emit('reqJoinRoom', { iUserId: location?.state?.patientSettings?._id }, (response) => {
        if (response?.oData) {
          console.log('Join Room: ', response?.oData)
        } else {
          console.log('Join Room Error: ', response?.error)
        }
      })

      socket.on('resGameState', (response) => {
        console.log('Game Status :>> ', response);
      })
    }
  }, [socket, location])

  // Call when Game Popup opens
  useEffect(() => {
    const currentGameData = eGameDropdown?.find((item) => buttonToggle[item.sName.toLowerCase()] === true)

    if (Object.keys(buttonToggle).find(key => buttonToggle[key] === true)) {
      socket.on('resGameState', (response) => {
        console.log('Game Status :>> ', response);
      })
    }
  }, [Object.keys(buttonToggle).find(key => buttonToggle[key] === true)])

  useEffect(() => {
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

    // const RINGRUNNER_NORMAL_GAME_STRUCTURE = {
    //   nDuration: watch('sRRGameDuration') || 1,
    //   sMode: Object.keys(ringrunnerMode).find(key => ringrunnerMode[key] === true) || 'normal',
    //   nStimulusSize: watch('nRRStimulusSize')?.value || '-0.3',
    //   nShipSpeed: watch('nShipSpeed')?.value || 1,
    //   sPowerDuration: watch('sPowerDuration')?.value || 'low',
    //   sPowerUpSpawnRate: watch('sPowerUpDelay')?.value || 'very low',
    //   sObstacleSpawnRate: watch('sObstacleDelay')?.value || 'very low',
    // }

    // const gameStructure = currentGameData?.sName === 'hoopie' ? HOOPIE_GAME_STRUCTURE : RINGRUNNER_NORMAL_GAME_STRUCTURE

    socket.emit(location?.state?.patientSettings?._id, {
      sEventName: 'reqPlay',
      oData: {
        oGamePlay: {
          iGameId: currentGameData?._id,
          sName: currentGameData?.sName,
          sBundle: currentGameData?.sUrl
        }
      }
    }, (error, response) => {
      if (response) {
        console.log('Which Game Started? ', response)
      } else {
        console.log('Which Game Started? (Error): ', error)
      }
    })

    socket.emit(location?.state?.patientSettings?._id, {
      sEventName: 'reqSetSetting',
      oData: {
        oGameSetting: {
          iGameId: currentGameData?._id,
          sName: currentGameData?.sName,
          ...HOOPIE_GAME_STRUCTURE,
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
        console.log('Game Settings: ', response)
      } else {
        console.log('Game Settings (Error): ', error)
      }
    })
  }, [gameStarted])

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

  // useEffect(() => {
  //   if (socket.connected) {
  //     const isDirtyData = {
  //       nConstrast: watch('nConstrast'),
  //       nOcclusion: watch('nOcclusion'),
  //     }

  //     const payloadData = getDirtyFormValues(dirtyFields, isDirtyData)

  //     if (payloadData.nConstrast || payloadData.nOcclusion) {
  //       socket.emit('ping', {
  //         '_id': {
  //           oid: ''
  //         },
  //         eDominantEye: Object.keys(dominantEyeButton).find(key => dominantEyeButton[key] === true) || 'left',
  //         oVergence: {
  //           oHorizontal: {
  //             sLeftEye: watch('nHorizontalLeft') || 0,
  //             sRightEye: watch('nHorizontalRight') || 0,
  //           },
  //           oVertical: {
  //             sLeftEye: watch('nVerticalLeft') || 0,
  //             sRightEye: watch('nVerticalRight') || 0,
  //           }
  //         },
  //         oTorsion: {
  //           sLeftEye: watch('nTorsionLeft') || 0,
  //           sRightEye: watch('nTorsionRight') || 0,
  //         },
  //         bMonocularMode: watch('bMonocularMode') || true,
  //         oVisions: {
  //           nContrast: watch('nContrast') || 0,
  //           nOcclusion: watch('nOcclusion') || 0,
  //           nBlur: watch('nBlur') || 0
  //         },
  //         aGameStructure: [
  //           {
  //             sName: 'hoopie',
  //             nDuration: watch('sHoopieGameDuration') || 1,
  //             sMode: Object.keys(gameModeToggle).find(key => gameModeToggle[key] === true) || 'head',
  //             bTachMode: watch('bTachMode') || true,
  //             nSpeed: watch('nHoopieBallSpeed')?.value || 1,
  //             nTargetRadius: watch('nHoopieTargetRadius')?.value || 0,
  //             sSpawnRate: watch('sHoopieSpawnRate')?.value || 'high',
  //             nStimulusSize: watch('nHoopieStimulusSize')?.value || 0.5,
  //             sBasketSize: watch('sHoopSize')?.value || 'max',
  //             sTextPosition: Object.keys(textPositionToggle).find(key => textPositionToggle[key] === true) || 'center'
  //           },
  //           {
  //             sName: 'ringRunner',
  //             nDuration: watch('sRRGameDuration') || 1,
  //             sMode: Object.keys(ringrunnerMode).find(key => ringrunnerMode[key] === true) || 'normal',
  //             nStimulusSize: watch('nRRStimulusSize')?.value || '-0.3',
  //             nShipSpeed: watch('nShipSpeed')?.value || 1,
  //             sPowerDuration: watch('sPowerDuration')?.value || 'low',
  //             sPowerUpSpawnRate: watch('sPowerUpDelay')?.value || 'very low',
  //             sObstacleSpawnRate: watch('sObstacleDelay')?.value || 'very low',
  //           },
  //           {
  //             sName: 'turbo',
  //             nDuration: watch('nTurboGameDuration') || 1,
  //             sMode: Object.keys(turboGameMode).find(key => turboGameMode[key] === true) === 'hammer' && 'hammer',
  //             eTargetStayDuration: watch('nHammerTargetStayDuration') || 'low',
  //             eGameType: watch('sHammerGameType')?.value || 'hit All',
  //             eHammerType: watch('sHammerType')?.value || 'single',
  //             eMobSpawnType: watch('sTargetSpawnType')?.value || 'single',
  //             eMobColorType: watch('sTargetColorType')?.value || 'single',
  //             sTargetSpeed: watch('sHammerTargetSpeed')?.value || 'slow'
  //           },
  //           {
  //             sName: 'turbo',
  //             nDuration: watch('nTurboGameDuration') || 1,
  //             sMode: Object.keys(turboGameMode).find(key => turboGameMode[key] === true) === 'turbo' && 'turbo',
  //             sButtonSize: watch('sTurboButtonSize')?.value || 'small',
  //             sButtonCount: watch('sTurboButtonCount')?.value || 'very less',
  //             eTargetStayDuration: watch('sTurboTargetStayDuration')?.value || 'low',
  //             eHorizontalBias: watch('sHorizontalBias')?.value || 'left',
  //             eVerticalBias: watch('sVerticalBias')?.value || 'top',
  //             sNextTargetDelay: watch('sTurboNextTargetDelay')?.value || 'low',
  //             sTargetSpread: watch('sTurboTargetSpread')?.value || 'small',
  //             bHeadlock: watch('bHeadlock') || false
  //           },
  //           {
  //             sName: 'bubbleBurst',
  //             nDuration: watch('sBubbleGameDuration') || 1,
  //             sMode: watch('sBubbleGameMode')?.value || 'series',
  //             sPattern: watch('sBubblePattern')?.value || 'duplet',
  //             nImageSize: watch('nBubbleImageSize')?.value || 1,
  //             sSepration: watch('sBubbleSeperation')?.value || 'very low',
  //             sDisparity: watch('sBubbleDisparity')?.value || 'max'
  //           }
  //         ]
  //       }, (e, data) => console.log('response data', e, data))
  //     }
  //   }

  //   socket.on('ping', (payload, e) => {
  //     console.log('payload :>> ', payload, e);
  //   })

  //   socket.on("connect_error", (error) => {
  //     console.log("Connection Error:", error);
  //   })

  //   socket.on("disconnect", (reason, details) => {
  //     if (reason === 'io server disconnect' || reason === 'io client disconnect') {
  //       socket.connect()
  //     }
  //     console.log("Disconnected:", reason, details);
  //   })
  // }, [watch('nConstrast'), watch('nOcclusion'), socket])




  // useEffect(() => {
  //   const currentGameData = eGameDropdown?.find((item) => buttonToggle[item.sName.toLowerCase()] === true)
  //   console.log('currentGameData: ', currentGameData);



  //   if (gameStarted === true) {
  //     socket.on('reqJoinRoom', (res, err) => {
  //       console.log('res, err :>> ', res, err);
  //     })

  //     socket.emit('reqPlay', {
  //       oData: {
  //         oGamePlay: {
  //           iGameId: currentGameData?._id,
  //           sName: currentGameData?.sName
  //         }
  //       }
  //     })
  //   }

  //   socket.on('reqPlay', (res, e) => {
  //     console.log('Can I start game? ', res, e)
  //   })
  // }, [socket, buttonToggle, gameStarted])

  const onSubmit = useCallback((data) => console.log('data: ', data), [])
  const handleClear = useCallback(() => setModal(false), [setModal, modal])

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

