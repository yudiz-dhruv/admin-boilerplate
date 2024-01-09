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
    { name: 'Email ID', internalName: 'sEmail', type: 1, isSort: false },
    { name: 'Package Expire', internalName: 'sEndDate', type: 1, isSort: false },
    { name: 'Status', internalName: 'eStatus', type: 1, isSort: false },
    { name: 'Actions', isSort: false }
]

export const PatientHistory = [
    { name: 'No', isSort: true },
    { name: 'Date', internalName: 'dDate', type: 1, isSort: false },
    { name: 'Time', internalName: 'dDateTime', type: 1, isSort: false },
    { name: 'Games Played', internalName: 'nGamesPlayed', type: 1, isSort: false },
    { name: 'Comments', internalName: 'sComments', type: 1, isSort: false },
]

export const eDominantEyeOptions = [
    { label: 'All', value: '' },
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

export const eHoopieLevels = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
]

export const eRingRunnerLevels = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
]

export const eStimulusSizes = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
]

export const eTurboGameType = [
    { label: 'Normal', value: 'normal' },
    { label: 'Headlock', value: 'headlock' }
]

export const eHeadlockType = [
    { label: 'Normal', value: 'normal' },
    { label: 'Vertical', value: 'vertical' },
    { label: 'Horizontal', value: 'horizontal' }
]

export const eHoopSize = [
    { label: '1.2', value: 1.2 },
]

export const eBallSpeed = [
    { label: '10', value: 10 },
]

export const eBubbleDistance = [
    { label: '0.1', value: 0.1 },
    { label: '0.2', value: 0.2 },
    { label: '0.3', value: 0.3 },
]

export const eOrientation = [
    { label: 'Portrait', value: 'portrait', angle: '90°' },
    { label: 'Landscape', value: 'landscape', angle: '180°' },
    { label: 'Diagonal', value: 'diagonal', angle: '45°' },
    { label: 'Opposite Diagonal', value: 'opposite diagonal', angle: '135°' },
]