import { MutateFunction } from '@tanstack/react-query'
import { TagType } from '@types'
import { Field } from '@ui/field'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface AddGroupBoardModalProps {
  setIsShow: Dispatch<SetStateAction<boolean>>
  addNewGroupMutation: MutateFunction<unknown, unknown, string, unknown>
}

export type AddNewTaskParamsType = {
  name: string
  description: string
  column: number
  assignee: string
  tags: TagType[]
  startDate: string
  endDate: string
}

export const AddNewGroupModal = ({
  setIsShow,
  addNewGroupMutation
}: AddGroupBoardModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddNewTaskParamsType>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<AddNewTaskParamsType> = data => {
    addNewGroupMutation(data.name)

    setIsShow(false)
    reset()
  }

  return (
    <div className='modal-dialog modal-lg'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1 className='modal-title fs-5' id='exampleModalLabel'>
            Создание новой группы
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
          <form id='column-form' onSubmit={handleSubmit(onSubmit)}>
            <Field
              register={register}
              disabled={false}
              error={errors?.name?.message}
              name='name'
              type='text'
              label='Название группы'
              placeholder='example'
              options={{
                required: 'Выберите другое название',
                minLength: {
                  value: 4,
                  message: 'Минимальное число знаков в названии 4'
                },
                maxLength: {
                  value: 20,
                  message: 'Максимальное число знаков в названии 20'
                }
              }}
            />
          </form>
        </div>
        <div className='modal-footer'>
          <button type='submit' form='column-form' className='btn btn-primary'>
            Создать
          </button>
        </div>
      </div>
    </div>
  )
}
