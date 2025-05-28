import {
  useAddCardTagGroup,
  useDeleteCardTag,
  useUpdateCardColumnGroup
} from '@hooks/mutations'
import { useGetAllTaskTags } from '@hooks/queries'
import { useTypedSelector } from '@hooks/redux-hooks'
import { AccentColorsType, TagType } from '@types'
import { Field } from '@ui/field'
import { FieldSelectMemberList } from '@ui/field-select-member-list'
import { FieldSelectTagList } from '@ui/field-select-task-tags-list'
import { FieldTextaria } from '@ui/field-textaria'
import { Spinner } from '@ui/spinner'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface UpdateCardModalProps {
  setIsShow: Dispatch<SetStateAction<boolean>>
  groupId: string
  cardCode: string
  placeholders: {
    title: string
    description: string
    assignee: string
    start_date: string
    end_date: string
    tags: string
  }
  columnName: string
  defaultDates: { start_date: string; end_date: string }
  defaultTags: TagType[]
}

type UpdateCardParamsType = {
  name: string
  description: string
  assignee: string
  start_date: string
  end_date: string
  tags: TagType[]
}

export const UpdateCardModal = ({
  setIsShow,
  columnName,
  placeholders,
  groupId,
  cardCode,
  defaultDates,
  defaultTags
}: UpdateCardModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<UpdateCardParamsType>({
    mode: 'onChange'
  })
  const { memberList } = useTypedSelector(state => state.userListState)

  const {
    data: taskTagList,
    isError: taskTagListIsError,
    isPending: taskTagListIsPending
  } = useGetAllTaskTags(groupId)

  const { mutateAsync: mutateUpdateCardColumnGroup } = useUpdateCardColumnGroup(
    groupId,
    cardCode
  )
  const { mutateAsync: mutateDeleteCardTag } = useDeleteCardTag(groupId)
  const {
    mutateAsync: mutateCreateCardTag,
    isPending: isPendingCreateCardTag
  } = useAddCardTagGroup()

  const onSubmit: SubmitHandler<UpdateCardParamsType> = data => {
    console.log(data)

    mutateUpdateCardColumnGroup({
      title: data.name ? data.name : placeholders.title,
      description: data.description
        ? data.description
        : placeholders.description,
      column: columnName,
      code: cardCode,
      assignee: data.assignee ? data.assignee : placeholders.assignee,
      start_date:
        data.start_date !== placeholders.start_date
          ? data.start_date
          : defaultDates.start_date,
      end_date:
        data.end_date !== placeholders.end_date
          ? data.end_date
          : defaultDates.end_date,
      tags: data.tags.length !== 0 ? data.tags : defaultTags
    })

    setIsShow(false)
    reset()
  }

  return (
    <div className='modal-dialog modal-lg'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1 className='modal-title fs-5' id='exampleModalLabel'>
            Обновление задачи
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
              placeholder={placeholders.title}
              options={{
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
              placeholder={placeholders.description}
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
              <FieldSelectTagList<UpdateCardParamsType>
                name='tags'
                groupId={groupId}
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
                placeholder={placeholders.tags}
                error={errors?.tags?.message}
                tagList={taskTagList as TagType[]}
                defaultValue={[]}
                control={control}
              />
            )}
            <FieldSelectMemberList<UpdateCardParamsType>
              name='assignee'
              label='Исполнитель'
              mandatory={false}
              placeholder={placeholders.assignee}
              error={errors?.assignee?.message}
              memberList={memberList}
              control={control}
            />
            <Field
              register={register}
              disabled={false}
              error={errors?.start_date?.message}
              defaultValue={placeholders.start_date}
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
              defaultValue={placeholders.end_date}
              label='Дедлайн'
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
