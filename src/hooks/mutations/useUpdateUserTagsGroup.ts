import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccentColorsType, TagType } from '@types'

interface UserProfileDataParams {
  tags: TagType[]
}

export const useUpdateUserTagsGroup = (
  userTagList: Array<{
    tag_name: string
    tag_code: string
    tag_color: AccentColorsType
  }>,
  groupId: string,
  username: string
) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    unknown,
    UserProfileDataParams,
    unknown
  >({
    mutationKey: ['update user tags group'],
    mutationFn: async ({ tags }) => {
      const deleteUserTagsArrayQueries = userTagList
        ?.filter(
          currentUserTag =>
            tags.findIndex(
              newUserTag =>
                currentUserTag.tag_name === newUserTag.name &&
                currentUserTag.tag_color === newUserTag.color
            ) === -1
        )
        .map(tag => tag.tag_code)

      const addUserTagsArrayQueries = tags
        ?.filter(
          newUserTag =>
            userTagList?.findIndex(
              currentUserTag =>
                currentUserTag.tag_name === newUserTag.name &&
                currentUserTag.tag_color === newUserTag.color
            ) === -1
        )
        .map(tag => tag.code)
      if (
        deleteUserTagsArrayQueries &&
        deleteUserTagsArrayQueries?.length !== 0
      ) {
        groupService.deleteUserTagGroup(
          groupId,
          username,
          deleteUserTagsArrayQueries
        )
      }

      if (addUserTagsArrayQueries.length !== 0) {
        groupService.createUserTagGroup(
          groupId,
          username,
          addUserTagsArrayQueries
        )
      }
    },
    onError: error => {
      console.log(error)
    },
    onSuccess: () => {
      console.log('success')

      queryClient.invalidateQueries({
        queryKey: [`get current user`, groupId, username]
      })
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
