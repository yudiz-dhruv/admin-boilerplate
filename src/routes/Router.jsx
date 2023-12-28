import { lazy } from 'react'
import { route } from 'shared/constants/AllRoutes'

const PublicRoute = lazy(() => import('routes/PublicRoutes'))
const PrivateRoute = lazy(() => import('routes/PrivateRoutes'))

// public Routes Files
const Login = lazy(() => import('views/auth/login'))
const ForgotPassword = lazy(() => import('views/auth/forgot-password'))
const ResetPassword = lazy(() => import('views/auth/reset-password'))
// const PageNotFound = lazy(() => import('shared/components/404'))

// Private Routes Files
const Profile = lazy(() => import('views/profile'))
const ChangePassword = lazy(() => import('views/profile/changePassword'))


//CRM Management
const Dashboard = lazy(() => import('views/crmManagement/dashboard'))
const Statistics = lazy(() => import('views/crmManagement/statistics'))

// Game
const GameManagement = lazy(() => import('views/game/index'))
const AddGame = lazy(() => import('views/game/addGame'))
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
      { path: route.forgotPassword, Component: ForgotPassword, exact: true },
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
      // { path: route.pageNotFound, Component: PageNotFound, exact: true },
      { path: route.editProfile, Component: Profile, exact: true },
      { path: route.changePassword, Component: ChangePassword, exact: true },

      { path: route.dashboard, Component: Dashboard, exact: true },
      { path: route.statistics, Component: Statistics, exact: true },

      { path: route.game, Component: GameManagement, exact: true },
      { path: route.addGame, Component: AddGame, exact: true },
      // { path: route.viewUser(':id'), Component: ViewUser, exact: true },
      { path: route.editGame(':id'), Component: AddGame, exact: true },
    ]
  }
]

export default RoutesDetails
