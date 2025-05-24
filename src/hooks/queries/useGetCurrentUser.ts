import userService from '@services/userService'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { CurrentUserProfileType } from '@types'

export const useGetCurrentUser = (
  groupId: string | undefined,
  username: string | undefined
): QueryObserverResult<CurrentUserProfileType> => {
  return useQuery<CurrentUserProfileType>({
    queryKey: [`get current user`, groupId, username],
    queryFn: async () => {
      const response = await userService.getCurrentUser({ groupId, username })

      return response.data
    }
  })
}
