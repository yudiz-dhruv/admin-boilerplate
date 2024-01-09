import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Wrapper from 'shared/components/Wrap'
import { useForm } from 'react-hook-form'
import DominantEyeSettings from 'shared/components/DominantEyeSettings'
import AntiSupSettings from 'shared/components/AntiSupSettings'
import AntiSupGameSettings from 'shared/components/AntiSupGameSettings'
import OculomotorSettings from 'shared/components/OculomotorSettings'
import StereopsisSettings from 'shared/components/StereopsisSettings'

const InternalGameSettings = () => {
  const { register, formState: { errors }, control, watch } = useForm({ mode: 'all' })

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
                        />
                      </div>

                      <div className='mt-3'>
                        <StereopsisSettings
                          errors={errors}
                          control={control}
                          buttonToggle={buttonToggle}
                          setButtonToggle={setButtonToggle}
                        />
                      </div>

                      {Object.values(buttonToggle).some(Boolean) ?
                        <Row className='mt-3 text-end'>
                          <Col sm={12}>
                            <Button variant='primary' type='submit' className='square'>
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
    </>
  )
}

export default InternalGameSettings
