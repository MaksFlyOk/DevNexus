import { $axios } from '@axios'
import { UserProfileType } from '@types'
import { AxiosResponse } from 'axios'

const ENDPOINT_USER = `v1/user/profile/`

class UserService {
  async getUser(): Promise<AxiosResponse<UserProfileType>> {
    return await $axios.get<UserProfileType>(`${ENDPOINT_USER}`)
  }
}

export default new UserService()
