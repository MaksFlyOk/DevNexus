import { $axios } from '@axios'
import { groupData } from '@mocks/groupData'
import { GroupType } from '@types'
import { AxiosResponse } from 'axios'

class GroupService {
  async getGroup(
    groupId: string | undefined
  ): Promise<AxiosResponse<GroupType>> {
    if (import.meta.env.VITE_APP_IS_MOCKUP === 'true') {
      return { data: groupData } as AxiosResponse<GroupType>
    }
    return await $axios.get<GroupType>(`/v1/group/${groupId}/`)
  }
}

export default new GroupService()
