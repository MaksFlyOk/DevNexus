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
    mutationFn: async ({
      name,
      color
    }: {
      name: string
      color: AccentColorsType
    }) => {
      setMinimizeColumnsInfoState({ name, color })

      return await groupService.createColumn(boardId, {
        name,
        color
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })
      setIsBoardLoading({ state: true })
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
