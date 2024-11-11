import { useNavigate } from 'react-router-dom'

const Profile = () => {
	const navigate = useNavigate()

	return (
		<>
			<h1>Profile</h1>
			<button
				type='button'
				className='btn btn-info'
				onClick={() => navigate('/')}
			>
				Home
			</button>
		</>
	)
}

export default Profile
