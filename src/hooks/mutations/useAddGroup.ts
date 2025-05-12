import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddGroup = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    unknown,
    string,
    unknown
  >({
    mutationFn: async name => {
      await groupService.createGroup({ name })
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
