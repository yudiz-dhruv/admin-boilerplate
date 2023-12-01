export const route = {
  login: '/',
  forgotPassword: '/forgot-password',
  resetPassword: (token) => `/reset-password/${token}`,
  changePassword: '/change-password',
  editProfile: '/profile',

  dashboard: '/dashboard',
  transactionStats: '/Transaction-Stats',
  statistics: '/Statistics',

  // userManagement: '/user-management',
  // addUser: '/add-new-user',
  // viewUser: (id) => `/view-user-profile/${id}`,
  // editUser: (id) => `/edit-user-profile/${id}`,
}
