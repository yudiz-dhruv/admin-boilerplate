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

// GAME MANAGEMENT
const GameManagement = lazy(() => import('views/game'))
const AddGame = lazy(() => import('views/game/addGame'))
const EditGame = lazy(() => import('views/game/editGame'))
const ViewGame = lazy(() => import('views/game/viewGame'))

// ADMIN GAME MANAGEMENT
const AdminGameManagement = lazy(() => import('views/adminGame'))
const AdminGameSettings = lazy(() => import('views/adminGame/internalGameSettings'))

// PATIENT MANAGEMENT
const PatientManagement = lazy(() => import('views/patient'))
const AddPatient = lazy(() => import('views/patient/addPatient'))
const EditPatient = lazy(() => import('views/patient/editPatient'))
const ViewPatient = lazy(() => import('views/patient/viewPatient'))

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

      { path: route.patient, Component: PatientManagement, exact: true },
      { path: route.addPatient, Component: AddPatient, exact: true },
      { path: route.editPatient(':id'), Component: EditPatient, exact: true },
      { path: route.viewPatient(':id'), Component: ViewPatient, exact: true },

      { path: route.game, Component: GameManagement, exact: true },
      { path: route.addGame, Component: AddGame, exact: true },
      { path: route.viewGame(':id'), Component: ViewGame, exact: true },
      { path: route.editGame(':id'), Component: EditGame, exact: true },

      { path: route.adminGame, Component: AdminGameManagement, exact: true },
      { path: route.adminGameSettings(':id'), Component: AdminGameSettings, exact: true },
    ]
  }
]

export default RoutesDetails
