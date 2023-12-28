import { faCube, faGamepad, faUser } from '@fortawesome/free-solid-svg-icons'
import { route } from 'shared/constants/AllRoutes'

export const sidebarConfig = [
  {
    path: route.dashboard,
    icon: faCube,
    title: 'CRM Management',
    role: ['superAdmin', 'admin'],
    children: [
      {
        path: route.dashboard,
        title: 'Dashboard'
      },
      {
        path: route.statistics,
        title: 'Statistics'
      },
    ]
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
