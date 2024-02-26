export const GameListColumn = [
    { name: 'No', isSort: true },
    { name: 'Avatar', internalName: 'sAvatar', type: 1, isSort: false },
    { name: 'Name', internalName: 'sName', type: 1, isSort: false },
    { name: 'URL', internalName: 'sUrl', type: 1, isSort: false },
    { name: 'Status', internalName: 'eStatus', type: 1, isSort: false },
    { name: 'Actions', isSort: false }
]

export const PatientListColumn = [
    { name: 'No', isSort: true },
    { name: 'Name', internalName: 'sName', type: 1, isSort: false },
    { name: 'Dominant Eye', internalName: 'sDominantEye', type: 1, isSort: false },
    { name: 'Is Amblyopia?', internalName: 'bIsAmblyopia', type: 1, isSort: false },
    { name: 'Is Strabismus?', internalName: 'bIsStrabismus', type: 1, isSort: false },
    { name: 'Status', internalName: 'eStatus', type: 1, isSort: false },
    { name: 'Actions', isSort: false }
]

export const AdminListColumn = [
    { name: 'No', isSort: true },
    { name: 'Name', internalName: 'sName', type: 1, isSort: false },
    { name: 'Mobile Number', internalName: 'sMobile', type: 1, isSort: false },
    { name: 'Email ID', internalName: 'sEmail', type: 1, isSort: false },
    { name: 'Package Expire', internalName: 'sEndDate', type: 1, isSort: false },
    { name: 'Status', internalName: 'eStatus', type: 1, isSort: false },
    { name: 'Actions', isSort: false }
]

export const PatientHistory = [
    { name: 'No', isSort: true },
    { name: 'Games Played', internalName: 'nGamesPlayed', type: 1, isSort: false },
    { name: 'Comments', internalName: 'sComments', type: 1, isSort: false },
    { name: 'Date & Time', internalName: 'dDate', type: 1, isSort: false },
]

export const eDominantEyeFilters = [
    { label: 'All', value: '' },
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
    { label: 'None', value: 'none' },
]

export const eDominantEyeOptions = [
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
    { label: 'None', value: 'none' },
]

export const eIsPresent = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
]

export const eIsStrabismus = [
    { label: 'Yes', value: 'y' },
    { label: 'No', value: 'n' }
]

export const eGameCategoryFilter = [
    { label: 'All', value: '' },
    { label: 'Anti Suppression', value: 'antiSupression' },
    { label: 'Oculomotor', value: 'oculomotor' },
    { label: 'Seteropsis', value: 'stereopsis' },
]

export const eGameCategoryOption = [
    { label: 'Anti Suppression', value: 'antiSupression' },
    { label: 'Oculomotor', value: 'oculomotor' },
    { label: 'Seteropsis', value: 'stereopsis' },
]

// ring runner game
export const eRingRunnerLevels = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
]

export const eShipSpeed = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
]

export const ePowerUpDuration = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' }
]

export const ePowerUpDelay = [
    { label: 'Very Low', value: 'veryLow' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Highest', value: 'highest' }
]

export const eStimulusSizes = [
    { label: '-0.3', value: -0.3 },
    { label: '0', value: 0 },
    { label: '0.2', value: 0.2 },
    { label: '0.4', value: 0.4 },
    { label: '0.6', value: 0.6 },
    { label: '0.8', value: 0.8 },
    { label: '1', value: 1 },
]

export const eGaborFrequency = [
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: '11', value: 11 },
    { label: '12', value: 12 },
    { label: '13', value: 13 },
    { label: '14', value: 14 },
    { label: '15', value: 15 }
]

// turbo game
export const eButtonSize = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' }
]

export const eTargetSpeed = [
    { label: 'Slow', value: 'slow' },
    { label: 'Medium', value: 'medium' },
    { label: 'Fast', value: 'fast' }
]

export const eButtonCount = [
    { label: 'Very Less', value: 'veryLess' },
    { label: 'Less', value: 'less' },
    { label: 'Normal', value: 'normal' },
    { label: 'High', value: 'high' },
    { label: 'Very High', value: 'veryHigh' }
]

export const eHorizontalBiasOption = [
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
    { label: 'None', value: 'none' }
]

export const eVerticalBiasOption = [
    { label: 'Top', value: 'top' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'None', value: 'none' }
]

export const eTargetStayDurationOption = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
]

export const eHeadlockType = [
    { label: 'Normal', value: 'normal' },
    { label: 'Vertical', value: 'vertical' },
    { label: 'Horizontal', value: 'horizontal' }
]

export const eTurboGameType = [
    { label: 'Hit All', value: 'hitAll' },
    { label: 'Avoid Selected', value: 'avoidSelected' },
    { label: 'Hit Selected', value: 'hitSelected' }
]

export const eTurboHammerType = [
    { label: 'Single', value: 'single' },
    { label: 'Dual', value: 'dual' },
]

export const eTargetSpawnType = [
    { label: 'Single', value: 'single' },
    { label: 'Multiple', value: 'multiple' },
]

// hoopie game options
export const eHoopieLevels = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
]

export const eHoopSize = [
    { label: 'Very Low', value: 'veryLow' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Max', value: 'max' }
]

export const eHoopieStimulusSizes = [
    { label: '0.5', value: 0.5 },
    { label: '0.7', value: 0.7 },
    { label: '0.8', value: 0.8 },
    { label: '0.9', value: 0.9 },
    { label: '1', value: 1 },
]

export const eBallSpeed = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
]

export const eTargetRadius = [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 }
]

export const eSpawnRate = [
    { label: 'Very Low', value: 'veryLow' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Max', value: 'max' }
]

// bubble game
export const eBubbleGameMode = [
    { label: 'Series', value: 'series' },
    { label: 'Odd one out', value: 'oddOneOut' },
]

export const eBubblePattern = [
    { label: 'Duplet', value: 'duplet' },
    { label: 'Triplet', value: 'triplet' },
    { label: 'Sqaure', value: 'square' },
    { label: 'Diamond', value: 'diamond' },
]

export const eBubbleImageSize = [
    { label: '0.7', value: 0.7 },
    { label: '0.8', value: 0.8 },
    { label: '0.9', value: 0.9 },
    { label: '1', value: 1 },
]

export const eBubbleDistance = [
    { label: 'Near', value: 'near' },
    { label: 'Far', value: 'far' },
    { label: 'Farther', value: 'farther' },
]

export const eOrientation = [
    { label: 'Portrait', value: 'portrait', angle: '90°' },
    { label: 'Landscape', value: 'landscape', angle: '180°' },
    { label: 'Diagonal', value: 'diagonal', angle: '45°' },
    { label: 'Opposite Diagonal', value: 'opposite diagonal', angle: '135°' },
]