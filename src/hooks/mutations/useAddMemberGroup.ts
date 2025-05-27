import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddMemberGroup = () => {
  const { addTimedNotification } = useActions()

  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async (name: string) => {
      return await groupService.putMemberGroup(groupId, { username: name })
    },
    onError: error => {
      addTimedNotification({ message: error.message, type: 'danger' })
    },
    onSuccess: () => {
      addTimedNotification({
        message: 'Пользователь успешно добавлен',
        type: 'success'
      })
      queryClient.invalidateQueries({ queryKey: [`get board`] })
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
