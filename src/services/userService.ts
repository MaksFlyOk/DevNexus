import { $axios } from '@axios'
import { userData } from '@mocks/userData'
import { UserProfileType } from '@types'
import { AxiosResponse } from 'axios'

const ENDPOINT_USER = `v1/user/profile/`

class UserService {
  async getUser(): Promise<AxiosResponse<UserProfileType>> {
    if (import.meta.env.VITE_APP_IS_MOCKUP === 'true') {
      return { data: userData } as AxiosResponse<UserProfileType>
    }
    return await $axios.get<UserProfileType>(`${ENDPOINT_USER}`)
  }
}

export default new UserService()
