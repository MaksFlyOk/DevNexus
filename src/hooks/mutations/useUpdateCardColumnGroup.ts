import { useActions } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TaskType } from '@types'

export const useUpdateCardColumnGroup = (groupId: string, cardCode: string) => {
  const queryClient = useQueryClient()

  const { setIsBoardLoading } = useActions()

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ['auth'],
    mutationFn: async (data: Omit<TaskType, 'column_color'>) => {
      await groupService.putCardColumnGroup(groupId, cardCode, data)
    },
    onError: error => {
      console.log(error)
    },
    onSuccess: () => {
      console.log('success')

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
