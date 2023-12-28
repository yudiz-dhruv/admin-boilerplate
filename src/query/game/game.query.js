import axios from '../../axios'

export async function getGameList(data) {
  return await axios.post('/game/list', data)
}

export async function getGameById(id) {
  return await axios.get(`/game/view/${id}`)
}