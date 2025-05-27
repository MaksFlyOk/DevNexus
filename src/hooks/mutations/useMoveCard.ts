import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TaskType } from '@types'

export const useMoveCard = () => {
  const { resetToStableState, addTimedNotification } = useActions()

  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    Error,
    { task: TaskType; column: TaskType['column'] },
    unknown
  >({
    mutationFn: async data => {
      return await groupService.putCardColumnGroup(groupId, data.task.code, {
        ...data.task,
        column: data.column
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })
    },
    onError: error => {
      addTimedNotification({ message: error.message, type: 'danger' })

      resetToStableState()
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
