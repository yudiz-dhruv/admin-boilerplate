import { useState } from 'react'

export const useHoopieSettings = (watch) => {
  const [gameModeToggle, setGameModeToggle] = useState(() => ({
    head: true,
    hand: false
  }))

  const [textPositionToggle, setTextPositionToggle] = useState(() => ({
    center: true,
    random: false
  }))
  
  const [tachMode, setTachMode] = useState('y')
  
  const HOOPIE_GAME_STRUCTURE = {
    sMode: Object.keys(gameModeToggle).find(key => gameModeToggle[key] === true) || 'head',
    bTachMode: watch('bTachMode'),
    nDuration: watch('sHoopieGameDuration') || '20',
    sBasketSize: watch('sHoopSize')?.value || 'medium',
    nTargetRadius: watch('nHoopieTargetRadius')?.value || 0,
    nSpeed: watch('nHoopieBallSpeed')?.value || 1,
    sSpawnRate: watch('sHoopieSpawnRate')?.value || 'medium',
    nStimulusSize: watch('nHoopieStimulusSize')?.value || 1,
    sTextPosition: Object.keys(textPositionToggle).find(key => textPositionToggle[key] === true) || 'center'
  }
  
  return { gameModeToggle, setGameModeToggle, textPositionToggle, setTextPositionToggle, tachMode, setTachMode, HOOPIE_GAME_STRUCTURE }
}

