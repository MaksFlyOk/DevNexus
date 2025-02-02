import { useGetUser } from '@hooks/queries'
import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import { AccentColorsType } from '@types'
import { CircleImg, Modal, Spinner } from '@ui'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './Nav.scss'
import { AddNewColumnModal } from './add-new-colomn-modal'

export type AddNewColumnParamsType = {
  name: string
  color: AccentColorsType
}

export const Nav = () => {
  const navigate = useNavigate()

  const { setBoardViewState, addColumn } = useActions()
  const { groupId } = useTypedSelector(state => state.groupState)

  const { isPending, isError, data: userData } = useGetUser()

  const [isShow, setIsShow] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddNewColumnParamsType>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<AddNewColumnParamsType> = data => {
    addColumn(data)
    setIsShow(false)
    reset()
  }

  return (
    <>
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <AddNewColumnModal
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          setIsShow={setIsShow}
        />
      </Modal>
      <div className='col-3 border-top border-end border-2 border-primary bg-light-subtle d-flex align-items-center'>
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
          <div
            className='userDataContainer'
            onClick={() => navigate('/profile')}
          >
            <CircleImg img={userData.img} alt='User img' />
            <h2 className='userNameText'>{userData.name}</h2>
          </div>
        )}
      </div>
      <div className='col px-4 d-flex align-items-center justify-content-between'>
        <div className='d-flex gap-2'>
          <button
            type='button'
            className='btn btn-primary btn-lg'
            disabled={groupId === undefined}
            onClick={() => setBoardViewState('kanban')}
          >
            Kanban
          </button>
          <button
            type='button'
            className='btn btn-primary btn-lg'
            disabled={groupId === undefined}
            onClick={() => setBoardViewState('list')}
          >
            List
          </button>
          <button
            type='button'
            className='btn btn-primary btn-lg'
            disabled={groupId === undefined}
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
              disabled={groupId === undefined}
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
          <button
            type='button'
            className='btn btn-outline-light btn-lg'
            disabled={groupId === undefined}
            onClick={() => setIsShow(true)}
          >
            Добавить колонку
          </button>
        </div>
      </div>
    </>
  )
}
