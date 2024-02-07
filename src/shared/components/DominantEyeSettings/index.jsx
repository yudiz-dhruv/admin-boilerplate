import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const DominantEyeSettings = ({ buttonToggle, setButtonToggle }) => {
    const tabs = [
        { key: 'left', label: 'Left' },
        { key: 'right', label: 'Right' },
        { key: 'none', label: 'None' },
    ]

    return (
        <>
            <h3 className='data-title'><FontAwesomeIcon icon={faEye} color='var(--secondary-500)' size='sm' /> Dominant Eye</h3>
            <div className='line'></div>

            <div className='mt-2 tabs'>
                {tabs?.map(tab => (
                    <motion.div key={tab.key}
                        whileTap={{ scale: 0.9 }}
                        className='tab-wrapper'>
                        <Button key={tab.key} type='button' className={`${buttonToggle[tab?.key] ? 'checked' : ''}`} onClick={() => setButtonToggle({ [tab?.key]: true })}>
                            <span className='tab'>{tab?.label}</span>
                        </Button>
                    </motion.div>
                ))}
            </div>
        </>
    )
}

DominantEyeSettings.propTypes = {
    tabs: PropTypes.array,
    dominantEyeButton: PropTypes.object,
    setDominantEyeButton: PropTypes.func
}

export default DominantEyeSettings
