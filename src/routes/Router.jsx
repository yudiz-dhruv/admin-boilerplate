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


// DASHBOARD
const Dashboard = lazy(() => import('views/dashboard'))

// ADMIN MANAGEMENT
const DoctorManagement = lazy(() => import('views/doctor'))
const AddDoctor = lazy(() => import('views/doctor/addDoctor'))
const ViewDoctor = lazy(() => import('views/doctor/viewDoctor'))
const EditDoctor = lazy(() => import('views/doctor/editDoctor'))

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

      { path: route.admin, Component: DoctorManagement, exact: true },
      { path: route.addAdmin, Component: AddDoctor, exact: true },
      { path: route.viewAdmin(':id'), Component: ViewDoctor, exact: true },
      { path: route.editAdmin(':id'), Component: EditDoctor, exact: true },
    ]
  }
]

export default RoutesDetails
