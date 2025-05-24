import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccentColorsType } from '@types'

export const useAddTagGroup = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    unknown,
    { groupId: string; data: { name: string; color: AccentColorsType } },
    unknown
  >({
    mutationFn: async ({ groupId, data }) => {
      await groupService.createTagGroup(groupId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get all user tags`] })
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
