import { $axios } from '@axios'
import { userData } from '@mocks/userData'
import { UserType } from '@types'
import { AxiosResponse } from 'axios'

class UserService {
  async getUser(): Promise<AxiosResponse<UserType>> {
    if (import.meta.env.VITE_APP_IS_MOCKUP === 'true') {
      return { data: userData } as AxiosResponse<UserType>
    }
    return await $axios.get<UserType>(`/user/`)
  }
}

export default new UserService()
