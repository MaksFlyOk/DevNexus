import { useTypedSelector } from '@hooks/redux-hooks'
import meme from '@images/meme.webp'
import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const { auth } = useTypedSelector(state => state.authState)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!auth) {
      navigate('/landing')
    }
  })

  return (
    <div className='container-fluid d-flex justify-content-center vh-100'>
      <div className='col-sm-6 d-flex align-items-center justify-content-center'>
        <div className='d-flex flex-column gap-3'>
          <img
            className='img-fluid'
            src={meme}
            alt='Иди работай)'
            draggable={false}
          />
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
