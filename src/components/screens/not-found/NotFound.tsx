import IdiRabotaj from '@images/IdiRabotaj.jpg'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='container-fluid d-flex justify-content-center vh-100'>
      <div className='col-6 d-flex align-items-center justify-content-center'>
        <div className='d-flex flex-column gap-3'>
          <img className='img-fluid' src={IdiRabotaj} alt='Иди работай)' />
          <h1 className='h1 text-center'>
            Не кажется ли вам, что вы забрели не туда, куда следовало бы
          </h1>
          <button
            type='button'
            className='btn btn-outline-light'
            onClick={() => navigate('/landing')}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
