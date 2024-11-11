import Home from '../components/screens/home/Home.jsx'
import Profile from '../components/screens/profile/Profile.jsx'

export const ROUTES = [
	{
		path: '/',
		component: Home,
		isAuth: true,
	},
	{
		path: '/profile',
		component: Profile,
		isAuth: true,
	},
]
