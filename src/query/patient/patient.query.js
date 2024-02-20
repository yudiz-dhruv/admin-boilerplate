import axios from '../../axios'

export async function getPatientList (data) {
    return await axios.post('/patient/list', data)
} 

export async function getPatientById (id) {
    return await axios.get(`/patient/view/${id}`)
}

export async function getPatientHistory (data, id) {
    return await axios.post(`/patient/history/list/${id}`, data)
}

export async function joinRoom (id) {
    return await axios.post(`/vision/table/join/${id}`, id)
}

export async function getPatientDropdownList () {
    return await axios.get('/patient/drop-down')
}