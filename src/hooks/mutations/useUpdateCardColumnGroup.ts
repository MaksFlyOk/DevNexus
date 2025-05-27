import { useActions } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TaskType } from '@types'

export const useUpdateCardColumnGroup = (groupId: string, cardCode: string) => {
  const queryClient = useQueryClient()

  const { setIsBoardLoading, addTimedNotification } = useActions()

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ['auth'],
    mutationFn: async (data: Omit<TaskType, 'column_color'>) => {
      return await groupService.putCardColumnGroup(groupId, cardCode, data)
    },
    onError: error => {
      addTimedNotification({ message: error.message, type: 'danger' })
    },
    onSuccess: () => {
      addTimedNotification({
        message: 'Карточка успешно обновлена',
        type: 'success'
      })

      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })
      queryClient.invalidateQueries({
        queryKey: [`get card`, groupId, cardCode]
      })

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
