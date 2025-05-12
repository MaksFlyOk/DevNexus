import { useTypedSelector } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddMemberGroup = () => {
  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async (name: string) => {
      await groupService.putMemberGroup(groupId, { username: name })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [`get user`] })
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
