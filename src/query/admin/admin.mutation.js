import axios from '../../axios'

export async function addAdmin (data) {
    return axios.post('/sub-admin/create', data)
}

export async function updateAdmin (data) {
    console.log('data: ', data);
    return axios.put(`/sub-admin/edit/${data?.id}`, data?.formData)
}

export async function deleteAdmin (id) {
    return axios.get(`/sub-admin/delete/${id}`)
}