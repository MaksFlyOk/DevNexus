import { useAddColumnGroup } from '@hooks/mutations'
import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { AccentColorsType, UserProfileType } from '@types'
import { Modal } from '@ui'
import { UserProfileCard } from '@ui/user-profile-card'
import { handleAdaptiveButton } from '@utils/handleAdaptiveButton'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AddNewColumnModal } from './add-new-colomn-modal'
import { BoardViewButtonsGroup } from './BoardViewButtonsGroup'
import './Nav.scss'

interface NavProps {
  minimizeMode?: boolean
  isUserPending?: boolean
  isUserError?: boolean
  userData?: UserProfileType | undefined
}

export type AddNewColumnParamsType = {
  name: string
  color: AccentColorsType
}

export const Nav = ({
  minimizeMode = false,
  isUserPending,
  isUserError,
  userData
}: NavProps) => {
  const { addColumn } = useActions()

  const { groupId } = useTypedSelector(state => state.groupState)

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

  const { mutateAsync } = useAddColumnGroup()

  const onSubmit: SubmitHandler<AddNewColumnParamsType> = data => {
    addColumn(data)
    mutateAsync(data)

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
      {minimizeMode ? (
        <div className='col-3 border-top border-end border-2 bg-light-subtle border-primary py-2 px-2'>
          <UserProfileCard
            isPending={isUserPending}
            isError={isUserError}
            userData={userData}
          />
        </div>
      ) : null}
      <div className='col px-4 d-flex align-items-center gap-2 justify-content-center justify-content-sm-between flex-wrap'>
        {minimizeMode ? null : (
          <div>
            <a
              className={`btn btn-light ${handleAdaptiveButton(width)}`}
              data-bs-toggle='offcanvas'
              href='#sidebar'
              role='button'
              aria-controls='sidebar'
            >
              Menu
            </a>
          </div>
        )}
        <BoardViewButtonsGroup minimizeMode={minimizeMode} />
        <div>
          <div className='btn-group dropup-center'>
            <button
              type='button'
              className={`btn btn-secondary dropdown-toggle ${handleAdaptiveButton(
                width
              )}`}
              data-bs-toggle='dropdown'
              aria-expanded='false'
              disabled={groupId === undefined}
            >
              Фильтры
            </button>
            <ul className='dropdown-menu'>
              {/* TODO: */}
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
            className={`btn btn-outline-light text-nowrap ${handleAdaptiveButton(
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
