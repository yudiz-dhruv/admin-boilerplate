import React from 'react'
import Wrapper from '../Wrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const DominantEyeSettings = ({ buttonToggle, setButtonToggle }) => {
    const tabs = [
        { key: 'left', label: 'Left' },
        { key: 'right', label: 'Right' },
        { key: 'none', label: 'None' },
    ]

    return (
        <>
            <Wrapper>
                <h3 className='data-title'><FontAwesomeIcon icon={faEye} color='var(--secondary-500)' size='sm' /> Dominant Eye</h3>
                <div className='line'></div>

                <div className='mt-2 tabs'>
                    {tabs?.map(tab => (
                        <Button key={tab.key} type='button' className={`${buttonToggle[tab?.key] ? 'checked' : ''}`} onClick={() => setButtonToggle({ [tab?.key]: true })}>
                            <span className='tab'>{tab?.label}</span>
                        </Button>
                    ))}
                </div>
            </Wrapper>
        </>
    )
}

DominantEyeSettings.propTypes = {
    tabs: PropTypes.array,
    dominantEyeButton: PropTypes.object,
    setDominantEyeButton: PropTypes.func
}

export default DominantEyeSettings
