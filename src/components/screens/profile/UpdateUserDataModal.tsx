import { useUpdateUserProfile } from '@hooks/mutations'
import { UserProfileType } from '@types'
import { Field } from '@ui/field'
import { FieldTextaria } from '@ui/field-textaria'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface AddGroupBoardModalProps {
  setIsShow: Dispatch<SetStateAction<boolean>>
  userData: UserProfileType['user']
}

export type UpdateUserDataParamsType = {
  name: string
  email: string
  description: string
  old_password: string
  new_password: string
}

export const UpdateUserDataModal = ({
  setIsShow,
  userData
}: AddGroupBoardModalProps) => {
  const [oldPasswordWatcherValue, setOldPasswordWatcherValue] = useState<
    string | undefined
  >('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<UpdateUserDataParamsType>({
    mode: 'onChange'
  })
  const { mutateAsync } = useUpdateUserProfile(reset, setIsShow)

  const onSubmit: SubmitHandler<UpdateUserDataParamsType> = data => {
    mutateAsync({
      new_data: data,
      old_data: {
        username: userData.username,
        email: userData.email,
        description: userData.description
      }
    })

    console.log({
      new_data: data,
      old_data: {
        username: userData.username,
        email: userData.email,
        description: userData.description
      }
    })
    reset()
  }

  useEffect(() => {
    const { unsubscribe } = watch(formValues => {
      setOldPasswordWatcherValue(formValues.old_password)
    })

    return () => unsubscribe()
  }, [watch])

  return (
    <div className='modal-dialog modal-lg'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1 className='modal-title fs-5' id='exampleModalLabel'>
            Обновление профиля
          </h1>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Закрыть'
            onClick={() => setIsShow(false)}
          ></button>
        </div>
        <div className='modal-body'>
          <form id='user-update-form' onSubmit={handleSubmit(onSubmit)}>
            <Field
              register={register}
              disabled={false}
              error={errors?.name?.message}
              name='name'
              type='text'
              label='Имя'
              placeholder={userData.username}
              options={{
                minLength: {
                  value: 4,
                  message: 'Минимальное число знаков в имени 4'
                },
                maxLength: {
                  value: 20,
                  message: 'Максимальное число знаков в имени 20'
                }
              }}
            />
            <Field
              register={register}
              disabled={false}
              error={errors?.email?.message}
              name='email'
              type='email'
              label='Емаил'
              placeholder={userData.email}
            />
            <FieldTextaria
              register={register}
              disabled={false}
              error={errors?.description?.message}
              options={{
                maxLength: {
                  value: 250,
                  message: 'Максимальная длина поля 250 символов'
                }
              }}
              name='description'
              type='textaria'
              label='О себе'
              placeholder={
                userData.description
                  ? userData.description
                  : 'Поделитесь своим внутренним миром'
              }
            />
            <hr />
            <Field
              register={register}
              disabled={false}
              error={errors?.old_password?.message}
              name='old_password'
              type='password'
              label='Cтарый пароль'
              placeholder='example'
              options={{
                minLength: {
                  value: 6,
                  message: 'Минимальное число знаков в пароле 6'
                }
              }}
            />
            <Field
              register={register}
              disabled={oldPasswordWatcherValue ? false : true}
              error={errors?.new_password?.message}
              name='new_password'
              type='password'
              label='Новый пароль'
              placeholder='example'
              options={{
                minLength: {
                  value: 6,
                  message: 'Минимальное число знаков в пароле 6'
                }
              }}
            />
          </form>
        </div>
        <div className='modal-footer'>
          <button
            type='submit'
            form='user-update-form'
            className='btn btn-primary'
          >
            Обновить
          </button>
        </div>
      </div>
    </div>
  )
}
