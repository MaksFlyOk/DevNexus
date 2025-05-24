import { $axios } from '@axios'
import { CurrentUserProfileType, UserProfileType } from '@types'
import { AxiosResponse } from 'axios'

const ENDPOINT_USER = `v1/users/`

class UserService {
  async getUser(): Promise<AxiosResponse<UserProfileType>> {
    return await $axios.get<UserProfileType>(`${ENDPOINT_USER}me/`)
  }

  async getCurrentUser({
    groupId,
    username
  }: {
    groupId: string | undefined
    username: string | undefined
  }): Promise<AxiosResponse<CurrentUserProfileType>> {
    return await $axios.get<CurrentUserProfileType>(
      `${ENDPOINT_USER}${username}/${groupId}/`
    )
  }

  async putUpdateUserProfile(newData: {
    username: string
    email: string
    description: string
  }): Promise<
    AxiosResponse<{ username: string; email: string; description: string }>
  > {
    return await $axios.put<{
      username: string
      email: string
      description: string
    }>(`${ENDPOINT_USER}me/`, newData)
  }

  async putUpdateUserPassword(newData: {
    old_password: string
    new_password: string
  }): Promise<AxiosResponse<null>> {
    return await $axios.put<null>(`${ENDPOINT_USER}change_password/`, newData)
  }
}

export default new UserService()
