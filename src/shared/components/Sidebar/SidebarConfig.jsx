import { faCube, faGamepad, faUser } from '@fortawesome/free-solid-svg-icons'
import { route } from 'shared/constants/AllRoutes'

export const sidebarConfig = [
  {
    path: route.dashboard,
    icon: faCube,
    title: 'Dashboard',
    role: ['superAdmin', 'admin'],
  },
  {
    path: route.patient,
    icon: faUser,
    title: 'Patient Management',
    role: ['superAdmin']
  },
  {
    path: route.game,
    icon: faGamepad,
    title: 'Game Management',
    role: ['superAdmin']
  },
]
