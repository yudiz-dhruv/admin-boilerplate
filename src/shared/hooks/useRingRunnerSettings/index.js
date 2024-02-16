import { useState } from 'react'

export const useRingRunnerSettings = (watch) => {
  const [ringrunnerMode, setRingRunnerMode] = useState(() => ({
    normal: true,
    gabor: false,
  }))

  const RINGRUNNER_GAME_STRUCTURE = {
    nDuration: watch('sRRGameDuration') || '5',
    sMode: Object.keys(ringrunnerMode).find(key => ringrunnerMode[key] === true) || 'normal',
    nStimulusSize: watch('nRRStimulusSize')?.value || '0.4',
    nShipSpeed: watch('nShipSpeed')?.value || '1',
    sPowerDuration: watch('sPowerDuration')?.value || 'low',
    sPowerUpSpawnRate: watch('sPowerUpDelay')?.value || 'ver low',
    sObstacleSpawnRate: watch('sObstacleDelay')?.value || 'very low',
    nLocalOrientation: +watch('sLocalOrientation') || '90',
    nGlobalOrientation: +watch('sGlobalOrientation') || '120',
    nFrequency: watch('nGaborFrequency')?.value || '2',
  }
  
  return { ringrunnerMode, setRingRunnerMode, RINGRUNNER_GAME_STRUCTURE }
}

