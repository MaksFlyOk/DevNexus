import { useActions } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccentColorsType } from '@types'

export const useAddTagGroup = () => {
  const { addTimedNotification } = useActions()

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    Error,
    { groupId: string; data: { name: string; color: AccentColorsType } },
    unknown
  >({
    mutationFn: async ({ groupId, data }) => {
      return await groupService.createTagGroup(groupId, data)
    },
    onError: error => {
      addTimedNotification({ message: error.message, type: 'danger' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get all user tags`] })
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
