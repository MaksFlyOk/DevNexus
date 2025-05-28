import { useActions } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCardColumnGroup = (
  groupId: string | undefined,
  cardCode: string | undefined,
  optionFunction?: () => void
) => {
  const queryClient = useQueryClient()

  const { setIsBoardLoading, addTimedNotification } = useActions()

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      return await groupService.deleteCardColumnGroup(groupId, cardCode)
    },
    onError: error => {
      addTimedNotification({ message: error.message, type: 'danger' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })

      if (optionFunction) {
        optionFunction()
      }

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
