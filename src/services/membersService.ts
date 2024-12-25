import { $axios } from '@axios'
import { membersDataList } from '@mocks/membersDataList'
import { MemberType } from '@types'
import { AxiosResponse } from 'axios'

class MembersService {
  async getMembers(groupId: number): Promise<AxiosResponse<MemberType[]>> {
    if (import.meta.env.VITE_APP_IS_MOCKUP === 'true') {
      return { data: membersDataList } as AxiosResponse<MemberType[]>
    }
    return await $axios.get<MemberType[]>(`/group/${groupId}`)
  }
}

export default new MembersService()
