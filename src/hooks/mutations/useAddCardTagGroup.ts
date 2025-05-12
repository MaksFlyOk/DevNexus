import { useTypedSelector } from '@hooks/redux-hooks'
import groupService from '@services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccentColorsType } from '@types'

interface useAddCardTagGroupParams {
  optionFunction?: () => void
}

export const useAddCardTagGroup = ({
  optionFunction = undefined
}: useAddCardTagGroupParams) => {
  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    unknown,
    { name: string; color: AccentColorsType },
    unknown
  >({
    mutationFn: async data => {
      await groupService.createCardTagGroup(groupId, data)
    },
    onSuccess: () => {
      if (optionFunction) {
        optionFunction()
      }

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
