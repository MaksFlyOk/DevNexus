import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate()
	return (
		<>
			<h1>NotFound</h1>
			<button
				type='button'
				className='btn btn-success'
				onClick={() => navigate('/')}
			>
				Go Home
			</button>
		</>
	)
}

export default NotFound
