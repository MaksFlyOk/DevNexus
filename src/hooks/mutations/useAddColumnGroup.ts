import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccentColorsType } from '@types'

export const useAddColumnGroup = () => {
  const { resetToStableState, setIsBoardLoading, setMinimizeColumnsInfoState } =
    useActions()

  const { boardId } = useTypedSelector(state => state.boardState)
  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ({
      name,
      color
    }: {
      name: string
      color: AccentColorsType
    }) => {
      setIsBoardLoading({ state: true })
      setMinimizeColumnsInfoState({ name, color })

      return groupService.createColumn(boardId, {
        name,
        color
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
