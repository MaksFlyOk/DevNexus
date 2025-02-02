import { $axios } from '@axios'
import { AuthMutationParamsType, TokensType } from '@types'
import { AxiosResponse } from 'axios'

interface UserData {
  id: number
  username: string
  email: string
}

class AuthService {
  async auth(
    username: AuthMutationParamsType['name'],
    password: AuthMutationParamsType['password']
  ): Promise<AxiosResponse<TokensType>> {
    if (import.meta.env.VITE_APP_IS_MOCKUP === 'true') {
      return {
        data: { access: 'access', refresh: 'refresh' }
      } as AxiosResponse<TokensType>
    }
    return await $axios.post<TokensType>('/token/', {
      username,
      password
    })
  }

  async register(
    username: AuthMutationParamsType['name'],
    password: AuthMutationParamsType['password'],
    email: AuthMutationParamsType['email']
  ): Promise<AxiosResponse<UserData>> {
    if (import.meta.env.VITE_APP_IS_MOCKUP === 'true') {
      return {
        data: {
          id: 0,
          username: 'username',
          email: 'email'
        }
      } as AxiosResponse<UserData>
    }
    return await $axios.post<UserData>('/v1/user/registration/', {
      username,
      email,
      password
    })
  }
}

export default new AuthService()
