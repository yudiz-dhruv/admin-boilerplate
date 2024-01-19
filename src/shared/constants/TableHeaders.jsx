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

export const eHoopieLevels = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
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
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' }
]

export const eBallSpeed = [
    { label: 'Slow', value: 'slow' },
    { label: 'Medium', value: 'medium' },
    { label: 'Fast', value: 'fast' }
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