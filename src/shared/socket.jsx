import { io } from 'socket.io-client'

const token = localStorage.getItem('token') || sessionStorage.getItem('token')
export const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
    extraHeaders: {
        Authorization: `${token}`
    },
    // timeout: 30000
    // reconnectionDelay: 10000,
    // reconnectionDelayMax: 10000
    // transports: ["websocket", "polling"],
    // upgrade: true,
})

