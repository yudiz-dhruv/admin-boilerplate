export const route = {
  login: '/',
  forgotPassword: '/forgot-password',
  resetPassword: (token) => `/reset-password/${token}`,
  changePassword: '/change-password',
  editProfile: '/profile',

  dashboard: '/dashboard',
  statistics: '/Statistics',
  pageNotFound: '/404',

  game: '/game-management',
  addGame: '/add-new-game',
  // viewUser: (id) => `/view-user-profile/${id}`,
  // editUser: (id) => `/edit-user-profile/${id}`,
}
