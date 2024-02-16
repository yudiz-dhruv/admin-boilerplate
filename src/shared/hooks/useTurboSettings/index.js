import { useState } from 'react'

export const useTurboSettings = (watch) => {
  const [headLockMode, setHeadLockMode] = useState('n')

  const [turboGameMode, setTurboGameMode] = useState(() => ({
    turbo: true,
    hammer: false,
  }))

  const TURBO_GAME_STRUCTURE = {
    nDuration: watch('nTurboGameDuration') || 1,
    sMode: Object.keys(turboGameMode).find(key => turboGameMode[key] === true) === 'turbo' && 'turbo',
    sButtonSize: watch('sTurboButtonSize')?.value || 'small',
    sButtonCount: watch('sTurboButtonCount')?.value || 'very less',
    eHorizontalBias: watch('sHorizontalBias')?.value || 'left',
    eVerticalBias: watch('sVerticalBias')?.value || 'top',
    eTargetStayDuration: Object.keys(turboGameMode).find(key => turboGameMode[key] === true) === 'turbo' ? (watch('sTurboTargetStayDuration')?.value || 'low') : (watch('nHammerTargetStayDuration')?.value || 'low'),
    sNextTargetDelay: watch('sTurboNextTargetDelay')?.value || 'low',
    sTargetSpread: watch('sTurboTargetSpread')?.value || 'small',
    bHeadlock: watch('bHeadlock') || false
  }

  return { headLockMode, setHeadLockMode, turboGameMode, setTurboGameMode, TURBO_GAME_STRUCTURE }
}