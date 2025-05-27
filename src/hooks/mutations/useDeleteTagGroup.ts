import { useActions } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface DeleteUserTagParams {
  userTagCode: string
}

export const useDeleteTagGroup = (groupId: string, username: string) => {
  const { addTimedNotification } = useActions()

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    Error,
    DeleteUserTagParams,
    unknown
  >({
    mutationFn: async ({ userTagCode }) => {
      return await groupService.deleteTagGroup(userTagCode, groupId)
    },
    onError: error => {
      addTimedNotification({ message: error.message, type: 'danger' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get all user tags'] })
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
