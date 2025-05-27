import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TagType, TaskType } from '@types'

export const useAddCardColumnGroup = () => {
  const { resetToStableState, setIsBoardLoading, addTimedNotification } =
    useActions()

  const { boardId } = useTypedSelector(state => state.boardState)
  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    Error,
    Omit<TaskType, 'code'> | { tags: Omit<TagType, 'code'>[] },
    unknown
  >({
    mutationFn: async data => {
      return await groupService.createCardColumnGroup(boardId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })
      setIsBoardLoading({ state: true })
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
