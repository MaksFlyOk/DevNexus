import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TagType, TaskType } from '@types'

export const useAddCardColumnGroup = () => {
  const { resetToStableState, setIsBoardLoading } = useActions()

  const { boardId } = useTypedSelector(state => state.boardState)
  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    unknown,
    Omit<TaskType, 'code'> | { tags: Omit<TagType, 'code'>[] },
    unknown
  >({
    mutationFn: data => {
      setIsBoardLoading({ state: true })

      return groupService.createCardColumnGroup(boardId, data)
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
