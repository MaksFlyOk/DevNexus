import { useActions } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface DeleteCardTagParams {
  cardTagCode: string
}

export const useDeleteCardTag = (groupId: string) => {
  const queryClient = useQueryClient()

  const { setIsBoardLoading, addTimedNotification } = useActions()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    Error,
    DeleteCardTagParams,
    unknown
  >({
    mutationFn: async ({ cardTagCode }) => {
      return await groupService.deleteCardTagGroup(cardTagCode, groupId)
    },
    onError: error => {
      addTimedNotification({ message: error.message, type: 'danger' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })
      queryClient.invalidateQueries({ queryKey: ['get all task tags'] })

      setIsBoardLoading({ state: true })
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
