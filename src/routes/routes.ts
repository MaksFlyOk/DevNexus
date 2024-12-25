import { Auth, Home, Landing, Profile } from '@screens'

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
  },
  {
    path: '/landing',
    component: Landing,
    isAuth: false
  },
  {
    path: '/auth',
    component: Auth,
    isAuth: false
  }
]
