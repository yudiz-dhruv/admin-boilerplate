import { useState } from 'react'

export const useGlobalSettings = () => {
    const [dominantEyeButton, setDominantEyeButton] = useState(() => ({
        left: true,
        right: false,
        none: false,
      }))
    
      const [antiSupSettings, setAntiSupSettings] = useState(() => ({
        contrast: 0,
        occlusion: 0,
        blur: 0
      }))
    
      const [vergenceToggle, setVergenceToggle] = useState(() => ({
        horizontal: true,
        vertical: false,
      }))
    
      const [horizontalEyeSettings, setHorizontalEyeSettings] = useState(() => ({
        left: 0,
        right: 0
      }))
    
      const [verticalEyeSettings, setVerticalEyeSettings] = useState(() => ({
        left: 0,
        right: 0
      }))
    
      const [torsionSettings, setTorsionSettings] = useState(() => ({
        left: 0,
        right: 0
      }))

      return { dominantEyeButton, setDominantEyeButton, antiSupSettings, setAntiSupSettings, vergenceToggle, setVergenceToggle, horizontalEyeSettings, setHorizontalEyeSettings, verticalEyeSettings, setVerticalEyeSettings, torsionSettings, setTorsionSettings }
}