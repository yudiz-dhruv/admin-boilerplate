import { faCube, faGamepad } from '@fortawesome/free-solid-svg-icons'
import {
  iconGrid,
  privacypolicy,
  aboutus,
} from 'assets/images/icons'

import { route } from 'shared/constants/AllRoutes'

export const sidebarConfig = [
  {
    path: route.dashboard,
    icon: faCube,
    title: 'CRM Management',
    children: [
      {
        path: route.dashboard,
        icon: iconGrid,
        title: 'Dashboard'
      },
      {
        path: route.statistics,
        icon: privacypolicy,
        title: 'Statistics'
      },
    ]
  },
  {
    path: route.game,
    icon: faGamepad,
    title: 'Game',
    children: [
      {
        path: route.game,
        icon: iconGrid,
        title: 'Game Management'
      },
    ]
  },
]
