import { useNavigate } from 'react-router-dom'

const Home = () => {
	const navigate = useNavigate()

	return (
		<>
			<h1>Home</h1>
			<button
				type='button'
				className='btn btn-info me-1'
				onClick={() => navigate('/profile')}
			>
				Profile
			</button>
			<button
				type='button'
				className='btn btn-danger'
				onClick={() => navigate('/pypypypypypy')}
			>
				NotFound
			</button>
		</>
	)
}

export default Home
