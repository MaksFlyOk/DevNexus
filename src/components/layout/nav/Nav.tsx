import { useActionsBoardViewState } from '@hooks/redux-hooks'
import { UserType } from '@types'
import { CircleImg } from '@ui'
import { useNavigate } from 'react-router-dom'
import './Nav.scss'

export const Nav = ({ img, name }: UserType) => {
  const navigate = useNavigate()

  const { setBoardViewState } = useActionsBoardViewState()

  return (
    <>
      <div className='col-3 border-top border-end border-2 border-primary bg-light-subtle d-flex align-items-center'>
        <div className='userDataContainer' onClick={() => navigate('/profile')}>
          <CircleImg img={img} alt='User img' />
          <h2 className='userNameText'>{name}</h2>
        </div>
      </div>
      <div className='col px-4 d-flex align-items-center justify-content-between'>
        <div className='d-flex gap-2'>
          <button
            type='button'
            className='btn btn-primary btn-lg'
            onClick={() => setBoardViewState('kanban')}
          >
            Kanban
          </button>
          <button
            type='button'
            className='btn btn-primary btn-lg'
            onClick={() => setBoardViewState('timeline')}
          >
            Timeline
          </button>
          <button
            type='button'
            className='btn btn-primary btn-lg'
            onClick={() => setBoardViewState('table')}
          >
            Table
          </button>
        </div>
        <div>
          <div className='btn-group dropup-center'>
            <button
              type='button'
              className='btn btn-secondary btn-lg dropdown-toggle'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Фильтры
            </button>
            <ul className='dropdown-menu'>
              <li className='dropdown-item'>Filter item</li>
              <li className='dropdown-item'>Filter item</li>
              <li className='dropdown-item'>Filter item</li>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Очистить
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button type='button' className='btn btn-outline-light btn-lg'>
            Добавить колонку
          </button>
        </div>
      </div>
    </>
  )
}
