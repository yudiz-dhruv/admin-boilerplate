import { useState } from "react"

export const useBubbleSetting = (watch) => {
    const [bubbleMode, setBubbleMode] = useState(() => ({
        series: true,
        oddOneOut: false,
      }))

    const BUBBLES_GAME_STRUCTURE = {
        nDuration: watch('sBubbleGameDuration') || 5,
        sMode: Object.keys(bubbleMode).find(key => bubbleMode[key] === true) || 'series',
        sPattern: watch('sBubblePattern')?.value || 'duplet',
        nStimulusSize: watch('nBubbleStimulusSize')?.value || 1,
        sSepration: watch('sBubbleSeperation')?.value || 'high',
        sDisparity: watch('sBubbleDisparity')?.value || 'max',
        nPanelDistance: watch('nPanelDistance')?.value || 1,
    }

    return { bubbleMode, setBubbleMode, BUBBLES_GAME_STRUCTURE }
}