import axios from '../../axios'

export async function login({ sEmail, sPassword }) {
  return await axios.post('/auth/login', {
    sEmail,
    sPassword
  })
}

export async function forgotPassword({ sEmail }) {
  return await axios.post('/auth/password/forgot', {
    sEmail
  })
}

export async function resetPassWord(data) {
  return await axios.post(
    `/auth/password/reset/${data?.token}`,
    data
  )
}

export async function logout() {
  return await axios.get(`/profile/logout`)
}

export async function changePassWord({ sOldPassword, sNewPassword }) {
  return await axios.put(`/profile/password/change`, { sOldPassword, sNewPassword })
}
