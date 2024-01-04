import axios from '../../axios'

export async function getPatientList (data) {
    return await axios.post('/patient/list', data)
} 

export async function getPatientById (id) {
    return await axios.get(`/patient/view/${id}`)
}

export async function getPatientDropdownList () {
    return await axios.get('/patient/drop-down')
}