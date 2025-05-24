import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface DeleteUserTagParams {
  userTagCode: string
}

export const useDeleteTagGroup = (groupId: string, username: string) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    unknown,
    DeleteUserTagParams,
    unknown
  >({
    mutationFn: async ({ userTagCode }) => {
      await groupService.deleteTagGroup(userTagCode, groupId)
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
