import { $axios } from '@axios'
import { groupsDataList } from '@mocks/groupsDataList'
import { GroupType } from '@types'
import { AxiosResponse } from 'axios'

class GroupsService {
  async getGroups(): Promise<AxiosResponse<GroupType[]>> {
    if (import.meta.env.VITE_APP_IS_MOCKUP === 'true') {
      return { data: groupsDataList } as AxiosResponse<GroupType[]>
    }
    return await $axios.get<GroupType[]>(`/groups/`)
  }
}

export default new GroupsService()
