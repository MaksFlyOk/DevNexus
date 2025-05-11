import { $axios } from '@axios'
import { AccentColorsType, GroupType, TagType, TaskType } from '@types'
import { AxiosResponse } from 'axios'

const ENDPOINT_GROUP = '/v1/group/'
const ENDPOINT_CREATE_COLUMN = '/column/create/'
const ENDPOINT_CREATE_CARD = '/card/create/'
const ENDPOINT_CREATE_CARDTAG = '/cardtag/create/'
const ENDPOINT_ADD_MEMBER = '/add_member/'

class GroupService {
  async createGroup(groupParams: {
    name: string
  }): Promise<AxiosResponse<{ name: string }>> {
    return await $axios.post(`${ENDPOINT_GROUP}/`, groupParams)
  }

  async getGroup(
    groupId: string | undefined
  ): Promise<AxiosResponse<GroupType>> {
    return await $axios.get(`${ENDPOINT_GROUP}${groupId}/`)
  }
  async deleteGroup(groupId: string | undefined): Promise<AxiosResponse<null>> {
    return $axios.delete(`${ENDPOINT_GROUP}${groupId}/`)
  }

  async createColumn(
    groupId: string | undefined,
    columnParams: { name: string; color: AccentColorsType }
  ): Promise<
    AxiosResponse<{ id: number; name: string; color: AccentColorsType }>
  > {
    return await $axios.post(
      `${ENDPOINT_GROUP}${groupId}${ENDPOINT_CREATE_COLUMN}`,
      columnParams
    )
  }

  async createCardColumnGroup(
    groupId: string | undefined,
    cardParams: Omit<TaskType, 'code'>
  ): Promise<AxiosResponse<TaskType>> {
    return await $axios.post(
      `${ENDPOINT_GROUP}${groupId}${ENDPOINT_CREATE_CARD}`,
      cardParams
    )
  }

  async putCardColumnGroupMove(
    groupId: string | undefined,
    cardId: string | undefined,
    cardParams: TaskType
  ): Promise<AxiosResponse<TaskType>> {
    return await $axios.put(
      `${ENDPOINT_GROUP}${groupId}/card/${cardId}/`,
      cardParams
    )
  }

  async createCardTagGroup(
    groupId: string | undefined,
    cardTagParams: { name: string; color: AccentColorsType }
  ): Promise<AxiosResponse<{ name: string; color: AccentColorsType }>> {
    return $axios.post(
      `${ENDPOINT_GROUP}${groupId}${ENDPOINT_CREATE_CARDTAG}`,
      cardTagParams
    )
  }

  async getAllCardTagGroup(
    groupId: string | undefined
  ): Promise<AxiosResponse<TagType[]>> {
    return await $axios.get(`v1/group/${groupId}/cardtag/all`)
  }

  async putMemberGroup(
    groupId: string | undefined,
    memberParams: { username: string }
  ): Promise<
    AxiosResponse<
      | { success: 'Пользователь успешно добавлен в группу.' }
      | { error: 'Пользователь не найден.' }
    >
  > {
    return $axios.put(
      `${ENDPOINT_GROUP}${groupId}${ENDPOINT_ADD_MEMBER}`,
      memberParams
    )
  }
}

export default new GroupService()
