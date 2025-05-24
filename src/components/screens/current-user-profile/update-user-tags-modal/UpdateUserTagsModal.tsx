import {
  useAddTagGroup,
  useDeleteTagGroup,
  useUpdateUserTagsGroup
} from '@hooks/mutations'
import { useGetAllGroupTags } from '@hooks/queries'
import { AccentColorsType, TagType } from '@types'
import { FieldSelectTagList } from '@ui/field-select-task-tags-list'
import { Spinner } from '@ui/spinner'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface UpdateUserTagsModalProps {
  setIsShow: Dispatch<SetStateAction<boolean>>
  group_uuid: string
  username: string
  userTagList: Array<{
    tag_name: string
    tag_code: string
    tag_color: AccentColorsType
  }>
}

type UpdateUserTagsParamsType = {
  tags: TagType[]
}

const setPlaceholderFieldSelectTags = (
  tagsArray: Array<{
    tag_name: string
    tag_code: string
    tag_color: AccentColorsType
  }>
) => {
  let placeholder = ''

  tagsArray.forEach((tag, iter, arr) => {
    if (iter !== arr.length - 1) {
      placeholder += tag.tag_name + ', '
    } else {
      placeholder += tag.tag_name
    }
  })

  return placeholder === '' ? 'Здесь пустовато' : placeholder
}

export const UpdateUserTagsModal = ({
  setIsShow,
  group_uuid,
  username,
  userTagList
}: UpdateUserTagsModalProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<UpdateUserTagsParamsType>({
    mode: 'onChange'
  })

  const {
    data: allUserTagList,
    isError: allUserTagListIsError,
    isPending: allUserTagListIsPending
  } = useGetAllGroupTags(group_uuid)

  const { mutateAsync: mutateUpdateUserTagGroup } = useUpdateUserTagsGroup(
    userTagList,
    group_uuid,
    username
  )
  const { mutateAsync: mutateDeleteTagGroup } = useDeleteTagGroup(
    group_uuid,
    username
  )
  const {
    mutateAsync: mutateCreateTagGroup,
    isPending: isPendingCreateTagGroup
  } = useAddTagGroup()

  const onSubmit: SubmitHandler<UpdateUserTagsParamsType> = data => {
    mutateUpdateUserTagGroup({
      tags: data.tags
    })

    setIsShow(false)
    reset()
  }

  return (
    <div className='modal-dialog modal-lg'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1 className='modal-title fs-5' id='exampleModalLabel'>
            Обновление тэгов пользователя
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
          <form id='update-user-tags-form' onSubmit={handleSubmit(onSubmit)}>
            {allUserTagListIsPending ? (
              <Spinner />
            ) : allUserTagListIsError ? (
              <div className='d-flex justify-content-center py-3'>
                <h1>
                  <span className='badge text-bg-danger'>Error</span>
                </h1>
              </div>
            ) : group_uuid ? (
              <FieldSelectTagList<UpdateUserTagsParamsType>
                name='tags'
                maxTags={2}
                groupId={group_uuid}
                deleteTagFunction={(userTagCode: string) =>
                  mutateDeleteTagGroup({ userTagCode })
                }
                createTagFunctionWithGroupId={(
                  name: string,
                  color: AccentColorsType,
                  groupId: string
                ) => {
                  mutateCreateTagGroup({ groupId, data: { name, color } })
                }}
                createIsPending={isPendingCreateTagGroup}
                label='Тэги'
                placeholder={setPlaceholderFieldSelectTags(userTagList)}
                error={errors?.tags?.message}
                tagList={allUserTagList as TagType[]}
                defaultValue={[]}
                control={control}
              />
            ) : (
              <h1>Error</h1>
            )}
          </form>
        </div>
        <div className='modal-footer'>
          <button
            type='submit'
            form='update-user-tags-form'
            className='btn btn-primary'
          >
            Обновить
          </button>
        </div>
      </div>
    </div>
  )
}
