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

export const GRAPH_OPTIONS = {
    series: [{
        name: 'Revenue',
        data: [20000, 5000, 10000, 6000, 15000],
        color: '#008d74'
    }],
    options: {
        chart: {
            height: 250,
            type: 'bar',
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                },
                autoSelected: 'zoom'
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '28px',
                horizontal: false,
                borderRadius: 0,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return 'Rs.' + val;
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#00758d']
            }
        },
        xaxis: {
            categories: ['2019', '2020', '2021', '2022', '2023'],
            position: 'bottom',
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: true
            },
            crosshairs: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
            labels: {
                style: {
                    colors: '#008d74'
                }
            }
        },
        yaxis: {
            min: 0,
            max: 30000,
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }

        },
        fill: {
            opacity: 1,
            type: 'solid'
        },
        title: {
            text: 'Total Revenue Per Year',
            floating: true,
            offsetY: 0,
            offsetX: 0,
            align: 'center',
            style: {
                color: '#00758d'
            }
        },
        grid: {
            show: true,
            position: 'back',
            borderColor: '#c1c1c1',
            xaxis: {
                lines: {
                    show: true
                }
            },
        }
    },
}

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