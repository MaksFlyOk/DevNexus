import { $axios } from '@axios'
import { AccentColorsType, GroupType } from '@types'
import { AxiosResponse } from 'axios'

const ENDPOINT_GROUP = '/v1/group/'
const ENDPOINT_CREATE_COLUMN = '/column/create/'

class GroupService {
  async getGroup(
    groupId: string | undefined
  ): Promise<AxiosResponse<GroupType>> {
    return await $axios.get<GroupType>(`${ENDPOINT_GROUP}${groupId}/`)
  }

  async createColumn(
    groupId: string | undefined,
    columnParams: { name: string; color: AccentColorsType }
  ): Promise<AxiosResponse<GroupType>> {
    return await $axios.post(
      `${ENDPOINT_GROUP}${groupId}${ENDPOINT_CREATE_COLUMN}`,
      columnParams
    )
  }
}

export default new GroupService()
