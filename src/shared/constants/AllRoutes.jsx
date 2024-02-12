export const route = {
  login: '/',
  forgotPassword: '/forgot-password',
  resetPassword: (token) => `/reset-password/${token}`,
  changePassword: '/change-password',
  editProfile: '/profile',

  dashboard: '/dashboard',
  // pageNotFound: '/404',

  admin: '/doctor-management',
  addAdmin: '/doctor-management/add',
  viewAdmin: (id) => `/doctor-management/view/${id}`,
  editAdmin: (id) => `/doctor-management/edit/${id}`,

  game: '/game-management',
  addGame: '/game-management/add',
  viewGame: (id) => `/game-management/view/${id}`,
  editGame: (id) => `/game-management/edit/${id}`,

  adminGame: '/admin-game-management',
  adminGameSettings: (id) => `/admin-game-management/settings/${id}`,

  patient: '/patient-management',
  addPatient: '/patient-management/add',
  viewPatient: (id) => `/patient-management/view/${id}`,
  editPatient: (id) => `/patient-management/edit/${id}`,
}
