export const ONLY_NUMBER = /^[0-9]*$/
export const EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/
export const PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?+!@$%^&*-]).{8,15}$/
export const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
export const OTP = /^[0-9]{4}$/

export const TIMES = [
    {
        value: 5,
        label: '5'
    },
    {
        value: 10,
        label: '10'
    },
    {
        value: 15,
        label: '15'
    },
    {
        value: 20,
        label: '20'
    },
    {
        value: 25,
        label: '25'
    },
    {
        value: 30,
        label: '30'
    },
    {
        value: 35,
        label: '35'
    },
    {
        value: 40,
        label: '40'
    },
    {
        value: 45,
        label: '45'
    },
    {
        value: 50,
        label: '50'
    },
]

export const SLIDER_STYLE = {
    width: '96%',
    margin: '0 8px',
    color: '#008d74',
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        border: '2px solid #008d74',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        fontWeight: 'bolder',
        borderRadius: '50% 50% 50% 0',
        backgroundColor: 'rgb(0, 191, 127)',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -90%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
}