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
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
import { useHoopieSettings } from 'shared/hooks/useHoopieSettings'
import { useRingRunnerSettings } from 'shared/hooks/useRingRunnerSettings'
import { useGlobalSettings } from 'shared/hooks/useGlobalSettings'
import { useTurboSettings } from 'shared/hooks/useTurboSettings'
import { useBubbleSetting } from 'shared/hooks/useBubbleSettings'
import moment from 'moment-timezone'
import { route } from 'shared/constants/AllRoutes'

const InternalGameSettings = () => {
  const location = useLocation()
  const { id } = useParams()
  console.log('id: ', id);
  const navigate = useNavigate()
  const screenWidth = useMediaQuery('(max-width: 1200px)')

  const { register, formState: { errors }, control, watch, handleSubmit, reset } = useForm({ mode: 'all' })

  const [tabletMode, setTabletMode] = useState(false)
  const [modal, setModal] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [connectivityStatus, setConnectivityStatus] = useState('')

  const [buttonToggle, setButtonToggle] = useState({
    hoopie: false,
    ringRunner: false,
    turbo: false,
    bubbles: false
  })

  // ALL GAME SETTINGS
  const { dominantEyeButton, setDominantEyeButton, antiSupSettings, setAntiSupSettings, vergenceToggle, setVergenceToggle, horizontalEyeSettings, setHorizontalEyeSettings, verticalEyeSettings, setVerticalEyeSettings, torsionSettings, setTorsionSettings } = useGlobalSettings()
  const { gameModeToggle, setGameModeToggle, textPositionToggle, setTextPositionToggle, tachMode, setTachMode, HOOPIE_GAME_STRUCTURE } = useHoopieSettings(watch)
  const { ringrunnerMode, setRingRunnerMode, RINGRUNNER_GAME_STRUCTURE } = useRingRunnerSettings(watch)
  const { headLockMode, setHeadLockMode, turboGameMode, setTurboGameMode, TURBO_GAME_STRUCTURE } = useTurboSettings(watch)
  const { BUBBLES_GAME_STRUCTURE } = useBubbleSetting(watch)

  // DROPDOWN GAME LIST
  const { data: eGameDropdown, isLoading } = useQuery('dropdownGame', getGameDropdownList, { select: (data) => data?.data?.data, })

  // Join Room UseEffect
  useEffect(() => {
    setTimeout(() => {
      socket.emit('reqJoinRoom', { iUserId: location?.state?.patientSettings?._id }, (response) => {
        if (response?.oData) {
          console.log('%cJoin Room: ', 'color: orange', response?.oData)
        } else {
          console.log('%cJoin Room Error: ', 'color: red', response?.message)
        }
      })
    }, 3000)
  }, [socket, location?.state, setTimeout])

  // Game status useEffect
  useEffect(() => {
    socket.on('resGameState', (response) => {
      setConnectivityStatus(response?.eState)
      console.log('%cGame Status :>> ', 'color: #00bf7f', response);
    })

    return () => {
      socket.off('resGameState');
    }
  })

  const currentGameData = eGameDropdown?.find((item) => buttonToggle[item.sName.toLowerCase()] === true)
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
      }, (response) => {
        if (response?.error) {
          if (response?.error?.message === 'Game is in invalid state') {
            ReactToastify('Please wait for the App connection!', 'error', 'invalid-status')
          }
          console.log('%cGame Settings (Error): ', 'color: red', response?.error?.message)
        } else {
          console.log('%cGame Settings: ', 'color: #1ba1bc', response)
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
    gameStructure,
    TURBO_GAME_STRUCTURE,
    BUBBLES_GAME_STRUCTURE])

  const onSubmit = (data) => {
    socket.emit(location?.state?.patientSettings?._id, {
      sEventName: 'reqEndGame',
      oData: {
        eState: 'finished',
        dCheckUpDate: moment(data?.dDateTime?._d).tz('Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ss.000Z'), //  2024-02-19T15:00:00.000+05:30
        aGamesId: data?.aGames?.map(item => item?._id), // [ { _id, sName, sUrl, eCategory } ]
        sGamesName: data?.aGames?.map(item => item?.sName), // [ { _id, sName, sUrl, eCategory } ]
        sComments: data?.sComment || '',
      }
    }, (response) => {
      console.log('response: ', response);
      if (Object?.keys(response?.error)?.length > 0) {
        console.log('%cLeaveing Room (Error)', 'color: red', response?.error)
      } else {
        navigate(route?.viewPatient(id))
        console.log('%cSaving progress and Leaveing Room...', 'color: #20a8c3', response)
      }
    })
  }


  const handleClear = useCallback(() => setModal(false), [setModal, modal])

  /**
   * Handle the Start Game Button
   * @param {Event} e - The event object
   * @param {Object} buttonToggle - The button toggle value
   */
  const handleStartGame = (e, buttonToggle) => {
    e?.preventDefault()

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
          ...gameStructure,
          oGlobalSettings: {
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
            }
          }
        }
      }
    }, (response) => {
      if (response?.error) {
        if (response?.error?.message === 'Game is in invalid state') {
          ReactToastify('Please wait for the App connection!', 'error', 'invalid-status')
          setGameStarted(false)
        }
        console.log('%cWhich Game Started? (Error): ', 'color: red', response?.error?.message)
      } else {
        setGameStarted(true)
        console.log('%cWhich Game Started? ', 'color: #1ba1bc', response)
      }
    })
  }



  useEffect(() => {
    socket.on(location?.state?.patientSettings?._id, (response) => {
      if (response?.sEventName === 'resEndParticularGame') {
        console.log('Particular End Game', response)
      }
    })
  }, [socket])




  /**
 * Handle the End Game Button
 * @param {Event} e - The event object
 * @param {Object} buttonToggle - The button toggle value
 */
  const handleEndGame = (e, buttonData) => {
    e.preventDefault()

    socket.emit(location?.state?.patientSettings?._id, {
      sEventName: 'reqEndParticularGame',
      oData: {
        eGameState: 'finished'
      }
    }, (response) => {
      if (response?.error) {
        console.log('%cGame Ended (Error): ', 'color: red', response?.error?.message)
      } else {
        console.log('%cGame Ended: ', 'color: #fff', response)
      }
    })

    setModal(false)
    setGameStarted(false)
  }

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
                              watch={watch}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              // games={data?.aGamesName}
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
                              // games={data?.aGamesName}
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
                              // games={data?.aGamesName}
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
                              watch={watch}
                              buttonToggle={buttonToggle}
                              setButtonToggle={setButtonToggle}
                              // games={data?.aGamesName}
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
                              // games={data?.aGamesName}
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
                              // games={data?.aGamesName}
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
                      name="dDateTime"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'Date and Time is required'
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
                            placeholder: 'Select the date and time',
                          }}
                          isValidDate={(currentDate, selectedDate) => {
                            return !currentDate.isBefore(new Date(), 'day');
                          }}
                          onChange={(date) => field.onChange(date)}
                          isClearable={true}
                        />
                      )}
                    />
                    {errors?.dDateTime && (
                      <Form.Control.Feedback type='invalid'>
                        {errors?.dDateTime.message}
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
                      name='aGames'
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'Game name(s) are required.'
                        }
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          placeholder='Select Games'
                          ref={ref}
                          options={eGameDropdown}
                          className={`react-select border-0 ${errors.aGames && 'error'}`}
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
                    {errors.aGames && (
                      <Form.Control.Feedback type='invalid'>
                        {errors.aGames.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <CommonInput
                    type='textarea'
                    register={register}
                    errors={errors}
                    className={`for m-control ${errors?.sComment && 'error'}`}
                    name='sComment'
                    label='Enter Comments'
                    placeholder='Enter the comments'
                    required
                    validation={{
                      required: {
                        value: true,
                        message: 'Comment is required'
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

