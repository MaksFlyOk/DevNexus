import { useNavigate } from 'react-router-dom'

export const Landing = () => {
  const navigate = useNavigate()

  return (
    <>
      <h1>landing</h1>
      <button
        type='button'
        className='btn btn-primary btn-lg'
        onClick={() => navigate('/auth')}
      >
        auth
      </button>
    </>
  )
}
