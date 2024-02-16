export const useBubbleSetting = (watch) => {
    const BUBBLES_GAME_STRUCTURE = {
        nDuration: watch('sBubbleGameDuration') || 5,
        sMode: watch('sBubbleGameMode')?.value || 'series',
        sPattern: watch('sBubblePattern')?.value || 'duplet',
        nStimulusSize: watch('nBubbleStimulusSize')?.value || 1,
        sSepration: watch('sBubbleSeperation')?.value || 'high',
        sDisparity: watch('sBubbleDisparity')?.value || 'max',
        nPanelDistance: watch('nPanelDistance')?.value || 1,
    }

    return { BUBBLES_GAME_STRUCTURE }
}