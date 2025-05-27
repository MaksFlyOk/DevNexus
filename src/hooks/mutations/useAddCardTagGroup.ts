import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccentColorsType } from '@types'

export const useAddCardTagGroup = () => {
  const { addTimedNotification } = useActions()

  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    Error,
    { name: string; color: AccentColorsType },
    unknown
  >({
    mutationFn: async data => {
      return await groupService.createCardTagGroup(groupId, data)
    },
    onError: error => {
      addTimedNotification({ message: error.message, type: 'danger' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get all task tags`] })
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
