import { useGetUser } from '@hooks/queries'
import { useActions } from '@hooks/redux-hooks'
import { CircleImg } from '@ui/circle-img'
import { DangerZone } from '@ui/danger-zone'
import { Modal } from '@ui/modal'
import { SecondaryNav } from '@ui/secondary-nav'
import { Spinner } from '@ui/spinner'
import { clearTokens } from '@utils/clearTokens'
import { hideEmailInfo } from '@utils/hideEmailInfo'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UpdateUserDataModal } from './UpdateUserDataModal'
import { UserTasksList } from './user-tasks-list'

export const Profile = () => {
  const [isShow, setIsShow] = useState<boolean>(false)

  const { setAuthState } = useActions()

  const navigate = useNavigate()

  const { isPending, isError, data: userData } = useGetUser()

  const logout = () => {
    clearTokens()
    navigate('/')

    setAuthState(false)
  }

  return (
    <>
      <Modal isShow={isShow} setIsShow={setIsShow}>
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
          <UpdateUserDataModal userData={userData.user} setIsShow={setIsShow} />
        )}
      </Modal>
      <SecondaryNav title='Профиль' backLink={'/'} />
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
              <div className='card-header d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                  <div style={{ width: 120 }}>
                    <CircleImg alt='User img' />
                  </div>
                  <div>
                    <h2 className='ps-2'>{userData.user.username}</h2>
                  </div>
                </div>
                <button
                  type='button'
                  className='btn btn-outline-light'
                  onClick={() => setIsShow(true)}
                >
                  Изменить
                </button>
              </div>
              <div className='card-body px-5'>
                <div className='d-flex justify-content-between pb-4'>
                  <div>
                    <h5 className='text-secondary'>О себе</h5>
                    <h4
                      className={
                        userData.user.description ? '' : 'text-body-secondary'
                      }
                    >
                      {userData.user.description
                        ? userData.user.description
                        : 'Расскажите о себе'}
                    </h4>
                  </div>
                </div>
                <div className='d-flex justify-content-between pb-4'>
                  <div>
                    <h5 className='text-secondary'>Ваш email</h5>
                    <h4>{hideEmailInfo(userData.user.email)}</h4>
                  </div>
                </div>
                <div className='d-flex justify-content-between'>
                  <div>
                    <h5 className='text-secondary'>Ваш пароль</h5>
                    <h4>*************</h4>
                  </div>
                </div>
                <hr />
                <DangerZone buttonTitle='Logout' buttonFunction={logout} />
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='card'>
              <div className='card-header'>
                <h2 className='ps-2'>Задачи</h2>
              </div>
              <div
                className='overflow-y-scroll overflow-x-hidden card-body px-5'
                style={{ maxHeight: '70dvh' }}
              >
                <UserTasksList groups={userData.groups} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
