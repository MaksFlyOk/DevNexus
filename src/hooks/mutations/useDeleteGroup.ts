import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface useDeleteGroupParams {
  optionFunction?: () => void
}

export const useDeleteGroup = ({
  optionFunction = undefined
}: useDeleteGroupParams) => {
  const { setGroupId, addTimedNotification } = useActions()

  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      return await groupService.deleteGroup(groupId)
    },
    onError: error => {
      addTimedNotification({ message: error.message, type: 'danger' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get user'] })

      if (optionFunction) {
        optionFunction()
      }

      setGroupId(undefined)
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
