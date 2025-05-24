import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface DeleteCardTagParams {
  cardTagCode: string
}

export const useDeleteCardTag = (groupId: string) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    unknown,
    DeleteCardTagParams,
    unknown
  >({
    mutationFn: async ({ cardTagCode }) => {
      await groupService.deleteCardTagGroup(cardTagCode, groupId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })
      queryClient.invalidateQueries({ queryKey: ['get all task tags'] })
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
