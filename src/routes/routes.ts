import { Auth, Home, Landing, Profile } from '@screens'
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
    path: '/user-profile/g/:group_id/u/:username',
    component: CurrentUserProfile,
    isAuth: true
  },
  {
    path: '/card/:card_id/color/:column_color/',
    component: CurrentUserProfile,
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
