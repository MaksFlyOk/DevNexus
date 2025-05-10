import { $axios } from '@axios'
import { useTypedSelector } from '@hooks/redux-hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccentColorsType } from '@types'
import { Spinner } from '@ui/spinner'
import { useState } from 'react'

interface AddNewCardTagFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  newTagName: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const AddNewCardTagForm = ({
  setIsOpen,
  newTagName,
  setSearchTerm
}: AddNewCardTagFormProps) => {
  const queryClient = useQueryClient()
  const { groupId } = useTypedSelector(state => state.groupState)
  const [newTagColor, setNewTagColor] = useState<AccentColorsType>('green')

  // TODO
  const { mutateAsync, isPending } = useMutation<
    unknown,
    unknown,
    { name: string; color: AccentColorsType },
    unknown
  >({
    mutationFn: async data => {
      await $axios.post(`v1/group/${groupId}/cardtag/create/`, data)
    },
    onSuccess: () => {
      setIsOpen(false)
      setNewTagColor('green')
      setSearchTerm('')
      queryClient.invalidateQueries({ queryKey: [`get all task tags`] })
    }
  })

  return (
    <div className='px-2'>
      <div className='d-flex flex-row gap-2'>
        <input
          checked={newTagColor == 'green' ? true : false}
          onChange={event =>
            setNewTagColor(event.target.value as AccentColorsType)
          }
          type='radio'
          className='btn-check'
          name='color'
          id='green-outlined'
          value='green'
          autoComplete='false'
        />
        <label className='btn btn-outline-success' htmlFor='green-outlined'>
          Зеленый
        </label>
        <input
          checked={newTagColor == 'red' ? true : false}
          onChange={event =>
            setNewTagColor(event.target.value as AccentColorsType)
          }
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
          checked={newTagColor == 'yellow' ? true : false}
          onChange={event =>
            setNewTagColor(event.target.value as AccentColorsType)
          }
          type='radio'
          className='btn-check'
          name='color'
          id='yellow-outlined'
          value='yellow'
          autoComplete='false'
        />
        <label className='btn btn-outline-warning' htmlFor='yellow-outlined'>
          Желтый
        </label>
        <input
          checked={newTagColor == 'blue' ? true : false}
          onChange={event =>
            setNewTagColor(event.target.value as AccentColorsType)
          }
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
      <button
        type='button'
        className='btn btn-primary mt-3 w-100'
        onClick={() => {
          if (newTagName !== '') {
            mutateAsync({ name: newTagName, color: newTagColor })
          }
        }}
      >
        {isPending ? <Spinner /> : 'Создать'}
      </button>
    </div>
  )
}
