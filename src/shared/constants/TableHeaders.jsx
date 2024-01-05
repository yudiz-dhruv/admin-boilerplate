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

export const eHoopSize = [
    { label: '1.2', value: 1.2 },
]

export const eBallSpeed = [
    { label: '10', value: 10 },
]