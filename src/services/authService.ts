import { $axios } from '@axios'
import { AuthMutationParamsType, TokensType } from '@types'
import { AxiosResponse } from 'axios'

interface UserData {
  id: number
  username: string
  email: string
}

const ENDPOINT_AUTHORIZATION = '/token/'
const ENDPOINT_REGISTRATION = '/v1/user/registration/'

class AuthService {
  async auth(
    username: AuthMutationParamsType['name'],
    password: AuthMutationParamsType['password']
  ): Promise<AxiosResponse<TokensType>> {
    return await $axios.post<TokensType>(ENDPOINT_AUTHORIZATION, {
      username,
      password
    })
  }

  async register(
    username: AuthMutationParamsType['name'],
    password: AuthMutationParamsType['password'],
    email: AuthMutationParamsType['email']
  ): Promise<AxiosResponse<UserData>> {
    return await $axios.post<UserData>(ENDPOINT_REGISTRATION, {
      username,
      email,
      password
    })
  }
}

export default new AuthService()
