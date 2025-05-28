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
import './Profile.scss'
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
        <div className='profile-container py-4'>
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
              <UpdateUserDataModal
                userData={userData.user}
                setIsShow={setIsShow}
              />
            )}
          </Modal>
          <div className='container-fluid pb-4'>
            <div className='card'>
              <div className='card-header d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                  <div className='user-profile-img'>
                    <CircleImg alt='User img' />
                  </div>
                  <h2 className='ps-2 text-wrap text-break'>
                    {userData.user.username}
                  </h2>
                </div>
              </div>
              <div className='card-body'>
                <div className='pb-2'>
                  <h5 className='text-secondary'>О себе</h5>
                  <h4
                    className={
                      userData.user.description ? '' : 'text-body-secondary'
                    }
                  >
                    <p className='text-break'>
                      {userData.user.description
                        ? userData.user.description
                        : 'Расскажите о себе'}
                    </p>
                  </h4>
                </div>
                <div className='pb-2'>
                  <h5 className='text-secondary'>Ваш Email</h5>
                  <h4 className='text-break'>
                    {hideEmailInfo(userData.user.email)}
                  </h4>
                </div>
                <div>
                  <h5 className='text-secondary'>Ваш пароль</h5>
                  <h4>*************</h4>
                </div>
                <hr />
                <div className='d-flex w-100 flex-column'>
                  <button
                    type='submit'
                    className='btn btn-light'
                    onClick={() => setIsShow(true)}
                  >
                    Обновить
                  </button>
                </div>
              </div>
              <div className='card-footer'>
                <DangerZone buttonTitle='Logout' buttonFunction={logout} />
              </div>
            </div>
          </div>
          <div className='container-fluid py-1 py-sm-4'>
            <div className='card'>
              <div className='card-header'>
                <h2 className='ps-2'>Задачи</h2>
              </div>
              <div className='card-body'>
                <UserTasksList groups={userData.groups} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
