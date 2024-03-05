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
}
