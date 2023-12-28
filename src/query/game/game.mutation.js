import axios from '../../axios'

export async function addGame (data) {
    return await axios.post('/game/create', data)
}

export async function updateGame (data) {
    return await axios.put(`/game/edit/${data?.id}`, data)
}

export async function deleteGame(id) {
    return await axios.get(`/game/delete/${id}`)
}