import axios from '../../axios'

export async function getUserData() {
  return await axios.post('/dashboard/v2/getData')
}

export async function getUserRevenue() {
  return await axios.post('/dashboard/revenue')
}

export async function getUserWithdrawal() {
  return await axios.get('/dashboard/userswithdrawal')
}

export async function getUserDiposit() {
  return await axios.get('/dashboard/depositoverall')
}
export async function getBotRevenue() {
  return await axios.get('/dashboard/botRevenue')
}

export async function getUserTransaction() {
  return await axios.post('/dashboard/v2/getTableTransaction')
}
export async function getTds() {
  return await axios.get('/dashboard/v2/get/tds')
}