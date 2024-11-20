import { Home, Profile } from '@screens'

export const ROUTES = [
  {
    path: '/',
    component: Home,
    isAuth: true
  },
  {
    path: '/profile',
    component: Profile,
    isAuth: true
  }
]
