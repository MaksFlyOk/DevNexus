import userService from '@services/userService'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { UserProfileType } from '@types'

export const useGetUser = (): QueryObserverResult<UserProfileType> => {
  return useQuery<UserProfileType>({
    queryKey: [`get user`],
    queryFn: async () => {
      const response = await userService.getUser()

      return response.data
    }
  })
}
