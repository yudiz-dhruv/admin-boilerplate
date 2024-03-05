import { faCube, faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { route } from 'shared/constants/AllRoutes'

export const sidebarConfig = [
  {
    path: route.dashboard,
    icon: faCube,
    title: 'Dashboard',
    role: ['superAdmin', 'admin'],
  },
  {
    path: route.admin,
    icon: faUserDoctor,
    title: 'Doctor Management',
    role: ['superAdmin']
  }
]
