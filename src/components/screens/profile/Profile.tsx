import { useGetUser } from '@hooks/queries'
import { CircleImg } from '@ui/circle-img'
import { Spinner } from '@ui/spinner'
import { hideEmailInfo } from '@utils/hideEmailInfo'
import { useNavigate } from 'react-router-dom'
import { UserTasksList } from './user-tasks-list'

export const Profile = () => {
  const navigate = useNavigate()
  const { isPending, isError, data: userData } = useGetUser()

  return (
    <>
      <nav className='navbar bg-body-tertiary'>
        <div className='container-fluid'>
          <button
            className='navbar-brand btn btn-outline-dark'
            type='button'
            onClick={() => navigate(-1)}
          >
            &larr;
          </button>
          <div className='d-flex'>
            <h3>Профиль</h3>
          </div>
        </div>
      </nav>
      {isPending ? (
        <div className='d-flex w-100 justify-content-center py-3'>
          <Spinner />
        </div>
      ) : isError ? (
        <div className='d-flex w-100 justify-content-center py-3'>
          <h1>
            <span className='badge text-bg-danger'>Error</span>
          </h1>
        </div>
      ) : (
        <div className='container-fluid py-4'>
          <div className='container pb-4'>
            <div className='card'>
              <div className='card-header d-flex align-items-center'>
                <div style={{ width: 120 }}>
                  <CircleImg img={userData.img} alt='User img' />
                </div>
                <div>
                  <h2 className='ps-2'>{userData.name}</h2>
                  <p className='ps-2'>{userData.about}</p>
                </div>
              </div>
              <div className='card-body px-5'>
                <div className='d-flex justify-content-between pb-4'>
                  <div>
                    <h5 className='text-secondary'>Ваше имя</h5>
                    <h4>{userData.name}</h4>
                  </div>
                  <button type='button' className='btn btn-outline-light'>
                    Изменить
                  </button>
                </div>
                <div className='d-flex justify-content-between pb-4'>
                  <div>
                    <h5 className='text-secondary'>Ваш email</h5>
                    {/* !! Скрытие Email должно происходить на сервере */}
                    <h4>{hideEmailInfo(userData.email)}</h4>
                  </div>
                  <button type='button' className='btn btn-outline-light'>
                    Изменить
                  </button>
                </div>
                <div className='d-flex justify-content-between pb-4'>
                  <div>
                    <h5 className='text-secondary'>Ваш пароль</h5>
                    <h4>*************</h4>
                  </div>
                  <button type='button' className='btn btn-outline-light'>
                    Изменить
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='card'>
              <div className='card-header'>
                <h2 className='ps-2'>Задачи</h2>
              </div>
              <div className='card-body px-5'>
                <UserTasksList tasks={userData.tasks} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
