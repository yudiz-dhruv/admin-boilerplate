import axios from '../../axios'

export async function getAdminList(params) {
  return await axios.post('/sub-admin/list', params)
}

export async function getAdminById(id) {
  return await axios.get(`/sub-admin/view/${id}`)
}
