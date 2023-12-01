import { lazy } from 'react'
import { route } from 'shared/constants/AllRoutes'

const PublicRoute = lazy(() => import('routes/PublicRoutes'))
const PrivateRoute = lazy(() => import('routes/PrivateRoutes'))

// public Routes Files
const Login = lazy(() => import('views/auth/login'))
// const ForgotPassword = lazy(() => import('views/auth/forgot-password'))
const ResetPassword = lazy(() => import('views/auth/reset-password'))

// Private Routes Files
const Profile = lazy(() => import('views/profile'))
const ChangePassword = lazy(() => import('views/profile/changePassword'))


//CRM Management
const Dashboard = lazy(() => import('views/crmManagement/dashboard'))
const TransactionStats = lazy(() => import('views/crmManagement/transactionStats'))
const Statistics = lazy(() => import('views/crmManagement/statistics'))

// //User
// const UserManagement = lazy(() => import('views/user/userManagement'))
// const AddUser = lazy(() => import('views/user/userManagement/addUser'))
// const ViewUser = lazy(() => import('views/user/userManagement/viewUser'))
// const EditUser = lazy(() => import('views/user/userManagement/editUser'))

const RoutesDetails = [
  {
    defaultRoute: '',
    Component: PublicRoute,
    props: {},
    isPrivateRoute: false,
    children: [
      { path: '/login', Component: Login, exact: true },
      // { path: route.forgotPassword, Component: ForgotPassword, exact: true },
      {
        path: route.resetPassword(':token'),
        Component: ResetPassword,
        exact: true
      }
    ]
  },
  {
    defaultRoute: '',
    Component: PrivateRoute,
    props: {},
    isPrivateRoute: true,
    children: [
      { path: route.editProfile, Component: Profile, exact: true },
      { path: route.changePassword, Component: ChangePassword, exact: true },

      { path: route.dashboard, Component: Dashboard, exact: true },
      { path: route.transactionStats, Component: TransactionStats, exact: true },
      { path: route.statistics, Component: Statistics, exact: true },


      // { path: route.userManagement, Component: UserManagement, exact: true },
      // { path: route.addUser, Component: AddUser, exact: true },
      // { path: route.viewUser(':id'), Component: ViewUser, exact: true },
      // { path: route.editUser(':id'), Component: EditUser, exact: true },
    ]
  }
]

export default RoutesDetails
