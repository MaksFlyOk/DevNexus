import { $axios } from '@axios'
import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccentColorsType, UserProfileType } from '@types'
import { Modal } from '@ui'
import { UserProfileCard } from '@ui/user-profile-card'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import './Nav.scss'
import { AddNewColumnModal } from './add-new-colomn-modal'

interface NavProps {
  minimazeMode?: boolean
  isUserPending?: boolean
  isUserError?: boolean
  userData?: UserProfileType | undefined
}

export type AddNewColumnParamsType = {
  name: string
  color: AccentColorsType
}

const handelAdaptiveButton = (width: number): string => {
  return width <= 576 ? 'btn-sm' : width >= 1200 ? 'btn-lg' : ''
}

export const Nav = ({
  minimazeMode = false,
  isUserPending,
  isUserError,
  userData
}: NavProps) => {
  const {
    setBoardViewState,
    addColumn,
    resetToStableState,
    setIsBoardLoading
  } = useActions()

  const { groupId } = useTypedSelector(state => state.groupState)
  const { boardId } = useTypedSelector(state => state.boardState)

  const queryClient = useQueryClient()

  const { width } = useWindowDimensions()

  const [isShow, setIsShow] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddNewColumnParamsType>({
    mode: 'onChange'
  })

  // SERVICE
  const { mutate } = useMutation({
    mutationFn: ({ name, color }: { name: string; color: string }) => {
      setIsBoardLoading({ state: true })
      return $axios.post(`/v1/group/${boardId}/column/create/`, {
        name,
        color
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })
    },
    onError: () => {
      resetToStableState()
    }
  })

  const onSubmit: SubmitHandler<AddNewColumnParamsType> = data => {
    addColumn(data)
    mutate({ name: data.name, color: data.color })
    setIsShow(false)
    reset()
  }

  // Decompose to components
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
      {minimazeMode ? (
        <div className='col-3 border-top border-end border-2 bg-light-subtle border-primary py-2 px-2'>
          <UserProfileCard
            isPending={isUserPending}
            isError={isUserError}
            userData={userData}
          />
        </div>
      ) : null}
      <div className='col px-4 d-flex align-items-center gap-2 justify-content-center justify-content-sm-between flex-wrap'>
        {minimazeMode ? null : (
          <div>
            <a
              className={`btn btn-light ${handelAdaptiveButton(width)}`}
              data-bs-toggle='offcanvas'
              href='#sidebar'
              role='button'
              aria-controls='sidebar'
            >
              Menu
            </a>
          </div>
        )}
        {minimazeMode ? (
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
        ) : (
          <div className='dropup-center'>
            <button
              type='button'
              className={`btn btn-primary ${handelAdaptiveButton(width)}`}
              data-bs-toggle='dropdown'
              aria-expanded='false'
              disabled={groupId === undefined}
            >
              View
            </button>
            <ul className='dropdown-menu'>
              <li
                className='dropdown-item'
                onClick={() => setBoardViewState('kanban')}
              >
                Kanban
              </li>
              <li
                className='dropdown-item'
                onClick={() => setBoardViewState('list')}
              >
                List
              </li>
              <li
                className='dropdown-item'
                onClick={() => setBoardViewState('table')}
              >
                Table
              </li>
            </ul>
          </div>
        )}
        <div>
          <div className='btn-group dropup-center'>
            <button
              type='button'
              className={`btn btn-secondary dropdown-toggle ${handelAdaptiveButton(
                width
              )}`}
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
            className={`btn btn-outline-light text-nowrap ${handelAdaptiveButton(
              width
            )}`}
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
