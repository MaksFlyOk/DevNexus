import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TaskType } from '@types'

export const useMoveCard = () => {
  const { resetToStableState } = useActions()

  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    unknown,
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
    onError: () => {
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
