import { faEye, faGamepad, faGear, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Wrapper from 'shared/components/Wrap'
import { useForm, Controller } from 'react-hook-form'
import RangeSlider from 'react-bootstrap-range-slider'
import Select from 'react-select'
import { eBallSpeed, eHoopSize, eHoopieLevels } from 'shared/constants/TableHeaders'

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
    { key: 'ringRunner', label: 'Ring Runner' },
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
                  <Col xl={6} lg={12}>
                    <div className='settings'>
                      <div className=''>
                        <Wrapper>
                          <h3 className='data-title'><FontAwesomeIcon icon={faEye} color='var(--secondary-500)' /> Dominant Eye</h3>
                          <div className='line'></div>

                          <div className='mt-2 tabs'>
                            {tabs?.map((tab, i) =>
                              <>
                                <Button key={tab.key} type='button' className={`${dominantEyeButton[tab?.key] ? 'checked' : ''}`} onClick={() => setDominantEyeButton({ [tab?.key]: true })}>
                                <span className='tab'>{tab?.label}</span>
                                </Button>
                              </>
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
                                tooltipPlacement='top'
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
                                tooltipPlacement='top'
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
                                tooltipPlacement='top'
                              />
                            </Form.Group>
                          </div>
                        </Wrapper>
                      </div>

                      {/* <div className='mt-3'>
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
                      </div> */}
                    </div>
                  </Col>
                  <Col xl={6} lg={12} className='mt-xl-0 mt-3'>
                    <div className='games'>
                      <div className=''>
                        <Wrapper>
                          <h3 className='game-title'><FontAwesomeIcon icon={faGamepad} color='var(--secondary-500)' /> Anti-Suppression</h3>
                          <div className='line'></div>

                          <div className='antisuppresion-details-button-group'>
                            {tab_buttons?.map((tab, index) => {
                              return (
                                <Button key={index} className={buttonToggle[tab.key] ? 'square btn-primary' : 'square btn-secondary'} variant={buttonToggle[tab.key] ? 'primary' : 'secondary'} onClick={() => setButtonToggle({ [tab.key]: true })}>
                                  {tab?.label}
                                </Button>
                              )
                            })}

                            {buttonToggle?.hoopie &&
                              <>
                                <div className='mt-3'>
                                  <Wrapper>
                                    <Row>
                                      <Col sm={12}>
                                        <Form.Group className='form-group'>
                                          <Form.Label> Level Selection </Form.Label>
                                          <Controller
                                            name='sLevelSelection'
                                            control={control}
                                            render={({ field: { onChange, value, ref } }) => (
                                              <Select
                                                placeholder='Select Game Level'
                                                ref={ref}
                                                options={eHoopieLevels}
                                                className={`react-select border-0 ${errors.sLevelSelection && 'error'}`}
                                                classNamePrefix='select'
                                                isSearchable={false}
                                                value={value}
                                                onChange={onChange}
                                                isMulti={true}
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.value}
                                              />
                                            )}
                                          />
                                          {errors.sLevelSelection && (
                                            <Form.Control.Feedback type='invalid'>
                                              {errors.sLevelSelection.message}
                                            </Form.Control.Feedback>
                                          )}
                                        </Form.Group>
                                      </Col>

                                      <Col sm={12}>
                                        <Form.Group className='form-group'>
                                          <Form.Label> Hoop Size </Form.Label>
                                          <Controller
                                            name='sHoopSize'
                                            control={control}
                                            render={({ field: { onChange, value, ref } }) => (
                                              <Select
                                                placeholder='Select Hoop Size'
                                                ref={ref}
                                                options={eHoopSize}
                                                className={`react-select border-0 ${errors.sHoopSize && 'error'}`}
                                                classNamePrefix='select'
                                                isSearchable={false}
                                                value={value}
                                                onChange={onChange}
                                                isMulti={true}
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.value}
                                              />
                                            )}
                                          />
                                          {errors.sHoopSize && (
                                            <Form.Control.Feedback type='invalid'>
                                              {errors.sHoopSize.message}
                                            </Form.Control.Feedback>
                                          )}
                                        </Form.Group>
                                      </Col>

                                      <Col sm={12}>
                                        <Form.Group className='form-group'>
                                          <Form.Label> Ball Speed </Form.Label>
                                          <Controller
                                            name='sBallSpeed'
                                            control={control}
                                            render={({ field: { onChange, value, ref } }) => (
                                              <Select
                                                placeholder='Select Ball Speed'
                                                ref={ref}
                                                options={eBallSpeed}
                                                className={`react-select border-0 ${errors.sBallSpeed && 'error'}`}
                                                classNamePrefix='select'
                                                isSearchable={false}
                                                value={value}
                                                onChange={onChange}
                                                isMulti={true}
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.value}
                                              />
                                            )}
                                          />
                                          {errors.sBallSpeed && (
                                            <Form.Control.Feedback type='invalid'>
                                              {errors.sBallSpeed.message}
                                            </Form.Control.Feedback>
                                          )}
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Wrapper>
                                </div>
                              </>}

                            {buttonToggle?.ringRunner &&
                              <>
                                <div className='mt-3'>
                                  <Wrapper>
                                    <Row>
                                      <Col sm={12}>
                                        <Form.Group className='form-group'>
                                          <Form.Label> Level Selection </Form.Label>
                                          <Controller
                                            name='sLevelSelection'
                                            control={control}
                                            render={({ field: { onChange, value, ref } }) => (
                                              <Select
                                                placeholder='Select Game Level'
                                                ref={ref}
                                                options={eHoopieLevels}
                                                className={`react-select border-0 ${errors.sLevelSelection && 'error'}`}
                                                classNamePrefix='select'
                                                isSearchable={false}
                                                value={value}
                                                onChange={onChange}
                                                isMulti={true}
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.value}
                                              />
                                            )}
                                          />
                                          {errors.sLevelSelection && (
                                            <Form.Control.Feedback type='invalid'>
                                              {errors.sLevelSelection.message}
                                            </Form.Control.Feedback>
                                          )}
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Wrapper>
                                </div>
                              </>}
                          </div>
                        </Wrapper>
                      </div>

                      {buttonToggle?.hoopie || buttonToggle?.ringRunner ?
                        <Row className='mt-3'>
                          <Col sm={12}>
                            <Button variant='primary' type='submit' className='me-2 square'>
                              End Game
                            </Button>
                          </Col>
                        </Row>
                        : ''}
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
