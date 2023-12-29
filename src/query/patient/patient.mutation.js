import axios from '../../axios'

export async function addPatient (data) {
    return await axios.post('/patient/create', data)
}

export async function updatePatient (data) {
    return await axios.put(`/patient/edit/${data?.id}`, data)
}

export async function deletePatient (id) {
    return await axios.get(`/patient/delete/${id}`)
}