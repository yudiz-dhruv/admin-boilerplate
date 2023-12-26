import axios from '../../axios'

export async function addGame (data) {
    return await axios.post('/game/create', data)
}

export async function deleteGame(id) {
    return await axios.get(`/game/delete/${id}`)
}