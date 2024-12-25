import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <>
      <h1>NotFound</h1>
      <button
        type='button'
        className='btn btn-success'
        onClick={() => navigate('/landing')}
      >
        Go Home
      </button>
    </>
  )
}
