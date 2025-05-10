import { AccentColorsType } from '@types'
import { Field } from '@ui/field'
import { Dispatch, SetStateAction } from 'react'
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister
} from 'react-hook-form'

import { AddNewColumnParamsType } from '../Nav'

interface AddNewColumnModalProps {
  register: UseFormRegister<{ name: string; color: AccentColorsType }>
  handleSubmit: UseFormHandleSubmit<AddNewColumnParamsType>
  onSubmit: SubmitHandler<AddNewColumnParamsType>
  errors: FieldErrors<AddNewColumnParamsType>
  setIsShow: Dispatch<SetStateAction<boolean>>
}

export const AddNewColumnModal = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  setIsShow
}: AddNewColumnModalProps) => {
  return (
    <div className='modal-dialog modal-lg'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1 className='modal-title fs-5' id='exampleModalLabel'>
            Добавление новой колонки
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
              label='Название колонки'
              placeholder='example'
              options={{
                required: 'Выберите другое имя',
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
            <div className='d-flex flex-column gap-2'>
              <input
                {...register('color', { required: true })}
                type='radio'
                className='btn-check'
                name='color'
                id='green-outlined'
                value='green'
                autoComplete='false'
                defaultChecked
              />
              <label
                className='btn btn-outline-success'
                htmlFor='green-outlined'
              >
                Зеленый
              </label>
              <input
                {...register('color', { required: true })}
                type='radio'
                className='btn-check'
                name='color'
                id='red-outlined'
                value='red'
                autoComplete='false'
              />
              <label className='btn btn-outline-danger' htmlFor='red-outlined'>
                Красный
              </label>
              <input
                {...register('color', { required: true })}
                type='radio'
                className='btn-check'
                name='color'
                id='yellow-outlined'
                value='yellow'
                autoComplete='false'
              />
              <label
                className='btn btn-outline-warning'
                htmlFor='yellow-outlined'
              >
                Желтый
              </label>
              <input
                {...register('color', { required: true })}
                type='radio'
                className='btn-check'
                name='color'
                id='blue-outlined'
                value='blue'
                autoComplete='false'
              />
              <label className='btn btn-outline-info' htmlFor='blue-outlined'>
                Синий
              </label>
            </div>
          </form>
        </div>
        <div className='modal-footer'>
          <button type='submit' form='column-form' className='btn btn-primary'>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}
