import axios from '../../axios'

export async function getGameList(data) {
  return await axios.post('/game/list', data)
}