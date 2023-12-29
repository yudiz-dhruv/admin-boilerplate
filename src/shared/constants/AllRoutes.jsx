export const route = {
  login: '/',
  forgotPassword: '/forgot-password',
  resetPassword: (token) => `/reset-password/${token}`,
  changePassword: '/change-password',
  editProfile: '/profile',

  dashboard: '/dashboard',
  // pageNotFound: '/404',

  game: '/game-management',
  addGame: '/game-management/add',
  viewGame: (id) => `/game-management/view/${id}`,
  editGame: (id) => `/game-management/edit/${id}`,
  
  patient: '/patient-management',
  addPatient: '/patient-management/add',
  viewPatient: (id) => `/patient-management/view/${id}`,
  editPatient: (id) => `/patient-management/edit/${id}`,
}
