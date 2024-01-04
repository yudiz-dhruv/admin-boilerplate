import { faEye, faGamepad, faGear, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Wrapper from 'shared/components/Wrap'
import { useForm, Controller } from 'react-hook-form'
import RangeSlider from 'react-bootstrap-range-slider'

const InternalGameSettings = () => {
  const location = useLocation()

  const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm({ mode: 'all' })

  const [dominantEyeButton, setDominantEyeButton] = useState({
    left: true,
    right: false,
    none: false,
    all: false
  })

  const [buttonToggle, setButtonToggle] = useState({
    hoopie: false,
    ringRunner: false,
  })

  const tabs = [
    { key: 'left', label: 'Left' },
    { key: 'right', label: 'Right' },
    { key: 'none', label: 'None' },
    { key: 'all', label: 'All' },
  ]

  const tab_buttons = [
    { key: 'hoopie', label: 'Hoopie' },
    { key: 'ring-runner', label: 'Ring Runner' },
  ]

  const [contrast, setContrast] = useState(0)
  const [occlusion, setOcclusion] = useState(0)
  const [blur, setBlur] = useState(0)
  const [opacity, setOpacity] = useState(0)

  async function onSubmit () {

  }
  return (
    <>
      <Form className='step-one' autoComplete='off' onSubmit={handleSubmit(onSubmit)} >
        <Row>
          <Col xs={12}>
            <Wrapper>
              <div className='game-settings'>
                <Row>
                  <Col xxl={6}>
                    <div className='settings'>
                      <div className=''>
                        <Wrapper>
                          <h3 className='data-title'><FontAwesomeIcon icon={faEye} color='var(--secondary-500)' /> Dominant Eye</h3>
                          <div className='line'></div>

                          <div className='mt-2 tabs'>
                            {tabs?.map(tab =>
                              <Button key={tab.key} type='button' className={`me-2 ${dominantEyeButton[tab?.key] ? 'btn-primary' : 'btn-secondary'}`} variant={`${dominantEyeButton[tab?.key] ? 'primary' : 'secondary'}`} onClick={() => setDominantEyeButton({ [tab?.key]: true })}>
                                {tab?.label}
                              </Button>
                            )}
                          </div>
                        </Wrapper>
                      </div>

                      <div className='mt-3'>
                        <Wrapper>
                          <h3 className='data-title'><FontAwesomeIcon icon={faGear} color='var(--secondary-500)' /> Anti Suppresion</h3>
                          <div className='line'></div>

                          <div className='slider-input'>
                            <Form.Group>
                              <Form.Label className='slider-label'>
                                <span>Contrast Level</span>
                                <span className='value'>{contrast}</span>
                              </Form.Label>
                              <RangeSlider
                                value={contrast}
                                onChange={e => setContrast(e.target.value)}
                                min={0}
                                max={100}
                                tooltipLabel={currentValue => `${currentValue}%`}
                              />
                            </Form.Group>
                          </div>

                          <div className='slider-input mt-3'>
                            <Form.Group>
                              <Form.Label className='slider-label'>
                                <span>Occlusion Level</span>
                                <span className='value'>{occlusion}</span>
                              </Form.Label>
                              <RangeSlider
                                value={occlusion}
                                onChange={e => setOcclusion(e.target.value)}
                                min={0}
                                max={100}
                                tooltipLabel={currentValue => `${currentValue}%`}
                              />
                            </Form.Group>
                          </div>

                          <div className='slider-input mt-3'>
                            <Form.Group>
                              <Form.Label className='slider-label'>
                                <span>Blur Level</span>
                                <span className='value'>{blur}</span>
                              </Form.Label>
                              <RangeSlider
                                value={blur}
                                onChange={e => setBlur(e.target.value)}
                                min={0}
                                max={100}
                                tooltipLabel={currentValue => `${currentValue}%`}
                              />
                            </Form.Group>
                          </div>
                        </Wrapper>
                      </div>

                      <div className='mt-3'>
                        <Wrapper>
                          <h3 className='data-title'><FontAwesomeIcon icon={faVrCardboard} color='var(--secondary-500)' /> Number of Gabber Patch</h3>
                          <div className='line'></div>

                          <div className='slider-input mt-3'>
                            <Form.Group>
                              <Form.Label className='slider-label'>
                                <span>Opacity Level</span>
                                <span className='value'>{opacity}</span>
                              </Form.Label>
                              <RangeSlider
                                value={opacity}
                                onChange={e => setOpacity(e.target.value)}
                                min={0}
                                max={100}
                                tooltipLabel={currentValue => `${currentValue}%`}
                              />
                            </Form.Group>
                          </div>
                        </Wrapper>
                      </div>
                    </div>
                  </Col>
                  <Col xxl={6}>
                    <div className='games'>
                      <div className=''>
                        <Wrapper>
                          <h3 className='game-title'><FontAwesomeIcon icon={faGamepad} color='var(--secondary-500)' /> Anti-Suppression</h3>
                          <div className='line'></div>

                          <div className='antisuppresion-details-button-group'>
                            {tab_buttons?.map((tab, index) => {
                              return (
                                <button key={index} className={buttonToggle[tab.key] && 'userActive'} onClick={() => setButtonToggle({ [tab.key]: true })}>
                                  {tab?.label}
                                </button>
                              )
                            })}

                            <div className=''>
                              <Wrapper>

                              </Wrapper>
                            </div>
                          </div>
                        </Wrapper>
                      </div>
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
