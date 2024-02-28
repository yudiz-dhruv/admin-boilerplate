import { useState } from 'react'

export const useRingRunnerSettings = (watch) => {
  const [ringrunnerMode, setRingRunnerMode] = useState(() => ({
    normal: true,
    gabor: false,
  }))

  const RINGRUNNER_GAME_STRUCTURE = {
    nDuration: watch('sRRGameDuration') ? ( (/[^0-9]/.test(watch('sRRGameDuration')) || watch('sRRGameDuration') >= 30) ? '30' : watch('sRRGameDuration') ) : '20',
    sMode: Object.keys(ringrunnerMode).find(key => ringrunnerMode[key] === true) || 'normal',
    nStimulusSize: watch('nRRStimulusSize')?.value || '0.4',
    nShipSpeed: watch('nShipSpeed')?.value || '1',
    sPowerDuration: watch('sPowerDuration')?.value || 'low',
    sPowerUpSpawnRate: watch('sPowerUpDelay')?.value || 'veryLow',
    sObstacleSpawnRate: watch('sObstacleDelay')?.value || 'veryLow',
    nLocalOrientation: watch('sLocalOrientation') ? ( (/[^0-9]/.test(watch('sLocalOrientation')) || watch('sLocalOrientation') >= 360) ? '360' : watch('sLocalOrientation') ) : '90',
    nGlobalOrientation: watch('sGlobalOrientation') ? ( (/[^0-9]/.test(watch('sGlobalOrientation')) || watch('sGlobalOrientation') >= 360) ? '360' : watch('sGlobalOrientation') ) : '120',
    nFrequency: watch('nGaborFrequency')?.value || '2',
  }
  
  return { ringrunnerMode, setRingRunnerMode, RINGRUNNER_GAME_STRUCTURE }
}

