import { Auth, Card, Home, Landing, Profile } from '@screens'
import { CurrentUserProfile } from '@screens/current-user-profile'

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
    path: '/user-profile/g/:group_id/a/:admin/u/:username/',
    component: CurrentUserProfile,
    isAuth: true
  },
  {
    path: '/card/g/:group_id/c/:card_title/:card_code',
    component: Card,
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
