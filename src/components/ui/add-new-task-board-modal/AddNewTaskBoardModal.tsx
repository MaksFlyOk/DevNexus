import {
  useAddCardColumnGroup,
  useAddCardTagGroup,
  useDeleteCardTag
} from '@hooks/mutations'
import { useGetAllTaskTags } from '@hooks/queries'
import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import { AccentColorsType, TagType } from '@types'
import { Field } from '@ui/field'
import { FieldSelectMemberList } from '@ui/field-select-member-list'
import { FieldSelectTagList } from '@ui/field-select-task-tags-list'
import { FieldTextaria } from '@ui/field-textaria'
import { Spinner } from '@ui/spinner'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface AddNewTaskModalProps {
  setIsShow: Dispatch<SetStateAction<boolean>>
  columnName: string
  group_uuid: string
}

type AddNewTaskParamsType = {
  name: string
  description: string
  column: number
  assignee: string
  tags: TagType[]
  start_date: string
  end_date: string
}

export const AddNewTaskBoardModal = ({
  setIsShow,
  columnName,
  group_uuid
}: AddNewTaskModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<AddNewTaskParamsType>({
    mode: 'onChange'
  })
  const { addTask } = useActions()

  const { memberList } = useTypedSelector(state => state.userListState)

  const {
    data: taskTagList,
    isError: taskTagListIsError,
    isPending: taskTagListIsPending
  } = useGetAllTaskTags(group_uuid)

  const { mutateAsync: mutateAddCardColumnGroup } = useAddCardColumnGroup()
  const { mutateAsync: mutateDeleteCardTag } = useDeleteCardTag(group_uuid)
  const {
    mutateAsync: mutateCreateCardTag,
    isPending: isPendingCreateCardTag
  } = useAddCardTagGroup()

  const onSubmit: SubmitHandler<AddNewTaskParamsType> = data => {
    // TODO:
    const defaultStartDate = new Date().toISOString()

    addTask({
      title: data.name,
      description: data.description,
      column: columnName,
      assignee: data.assignee,
      start_date: data.start_date ? data.start_date : defaultStartDate,
      end_date: data.end_date,
      tags: data.tags
    })

    mutateAddCardColumnGroup({
      title: data.name,
      description: data.description,
      column: columnName,
      assignee: data.assignee,
      start_date: data.start_date ? data.start_date : defaultStartDate,
      end_date: data.end_date,
      tags: data.tags?.map(tag => {
        return { name: tag.name, color: tag.color }
      })
    })

    setIsShow(false)
    reset()
  }

  return (
    <div className='modal-dialog modal-lg'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1 className='modal-title fs-5' id='exampleModalLabel'>
            Добавление новой задачи
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
          <form id='new-task-form' onSubmit={handleSubmit(onSubmit)}>
            <Field
              register={register}
              disabled={false}
              error={errors?.name?.message}
              name='name'
              type='text'
              label='Название задачи'
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
            <FieldTextaria
              register={register}
              disabled={false}
              error={errors?.description?.message}
              options={{
                maxLength: {
                  value: 250,
                  message: 'Максимальная длина описания 250 символов'
                }
              }}
              name='description'
              type='textaria'
              label='Описание'
              placeholder='example'
            />
            {taskTagListIsPending ? (
              <Spinner />
            ) : taskTagListIsError ? (
              <div className='d-flex justify-content-center py-3'>
                <h1>
                  <span className='badge text-bg-danger'>Error</span>
                </h1>
              </div>
            ) : (
              <FieldSelectTagList<AddNewTaskParamsType>
                name='tags'
                groupId={group_uuid}
                deleteTagFunction={(cardTagCode: string) =>
                  mutateDeleteCardTag({ cardTagCode })
                }
                createTagFunctionWithoutGroupId={(
                  name: string,
                  color: AccentColorsType
                ) => {
                  mutateCreateCardTag({ name, color })
                }}
                createIsPending={isPendingCreateCardTag}
                label='Тэги'
                placeholder='Тэги'
                error={errors?.tags?.message}
                tagList={taskTagList as TagType[]}
                defaultValue={[]}
                control={control}
              />
            )}
            <FieldSelectMemberList<AddNewTaskParamsType>
              name='assignee'
              label='Исполнитель'
              placeholder='Исполнитель'
              mandatory
              error={errors?.assignee?.message}
              memberList={memberList}
              control={control}
            />
            <Field
              register={register}
              disabled={false}
              error={errors?.start_date?.message}
              name='start_date'
              type='datetime-local'
              label='Начальная дата'
            />
            <Field
              register={register}
              disabled={false}
              error={errors?.end_date?.message}
              name='end_date'
              type='datetime-local'
              label='Дедлайн'
              options={{
                required: { value: true, message: 'Выберите дату' }
              }}
            />
          </form>
        </div>
        <div className='modal-footer'>
          <button
            type='submit'
            form='new-task-form'
            className='btn btn-primary'
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}
