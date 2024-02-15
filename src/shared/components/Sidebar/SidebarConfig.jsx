import { faCube, faGamepad, faUser, faUserDoctor } from '@fortawesome/free-solid-svg-icons'
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
  },
  {
    path: route.patient,
    icon: faUser,
    title: 'Patient Management',
    role: ['admin']
  },
  {
    path: route.game,
    icon: faGamepad,
    title: 'Game Management',
    role: ['superAdmin']
  },
  {
    path: route.adminGame,
    icon: faGamepad,
    title: 'Game Management',
    role: ['admin']
  },
]
