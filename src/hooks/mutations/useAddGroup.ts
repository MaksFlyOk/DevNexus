import { useActions } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddGroup = () => {
  const { addTimedNotification } = useActions()

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    Error,
    string,
    unknown
  >({
    mutationFn: async name => {
      return await groupService.createGroup({ name })
    },
    onError: error => {
      addTimedNotification({
        message: error.message,
        type: 'danger'
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [`get user`] })
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
