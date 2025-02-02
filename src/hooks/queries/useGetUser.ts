import userService from '@services/userService'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { UserType } from '@types'

export const useGetUser = (): QueryObserverResult<UserType> => {
  return useQuery<UserType>({
    queryKey: [`get user`],
    queryFn: async () => {
      const response = await userService.getUser()
      return response.data
    }
  })
}
