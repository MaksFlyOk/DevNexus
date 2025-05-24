import { $axios } from '@axios'
import { AccentColorsType, GroupType, TagType, TaskType } from '@types'
import { AxiosResponse } from 'axios'

const ENDPOINT_GROUP = '/v1/groups/'
const ENDPOINT_CREATE_COLUMN = '/columns/create/'
const ENDPOINT_CREATE_CARD = '/cards/create/'
const ENDPOINT_CREATE_CARDTAG = '/cardtags/create/'
const ENDPOINT_GET_ALL_CARDTAGS = '/cardtags/all/'
const ENDPOINT_CREATE__GROUP_TAG = '/tags/create/'
const ENDPOINT_GET_ALL_GROUP_TAGS = '/tags/all/'
const ENDPOINT_CREATE_USERTAG = '/usertags/create/'
const ENDPOINT_ADD_MEMBER = '/add_members/'

class GroupService {
  async createGroup(groupParams: {
    name: string
  }): Promise<AxiosResponse<{ name: string }>> {
    return await $axios.post(`${ENDPOINT_GROUP}`, groupParams)
  }

  async getGroup(
    groupId: string | undefined
  ): Promise<AxiosResponse<GroupType>> {
    return await $axios.get(`${ENDPOINT_GROUP}${groupId}/`)
  }

  async deleteGroup(groupId: string | undefined): Promise<AxiosResponse<null>> {
    return await $axios.delete(`${ENDPOINT_GROUP}${groupId}/`)
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
    cardParams: Omit<TaskType, 'code'> | { tags: Omit<TagType, 'code'>[] }
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
      `${ENDPOINT_GROUP}${groupId}/cards/${cardId}/`,
      cardParams
    )
  }

  async createCardTagGroup(
    groupId: string | undefined,
    cardTagParams: { name: string; color: AccentColorsType }
  ): Promise<AxiosResponse<{ name: string; color: AccentColorsType }>> {
    return await $axios.post(
      `${ENDPOINT_GROUP}${groupId}${ENDPOINT_CREATE_CARDTAG}`,
      cardTagParams
    )
  }

  async deleteCardTagGroup(
    cardTagCode: string,
    groupId: string | undefined
  ): Promise<AxiosResponse<null>> {
    return await $axios.delete(
      `${ENDPOINT_GROUP}${groupId}/cardtags/${cardTagCode}/`
    )
  }

  async getAllCardTagGroup(
    groupId: string | undefined
  ): Promise<AxiosResponse<TagType[]>> {
    return await $axios.get(
      `${ENDPOINT_GROUP}${groupId}${ENDPOINT_GET_ALL_CARDTAGS}`
    )
  }

  async createTagGroup(
    groupId: string | undefined,
    userTagParams: { name: string; color: AccentColorsType }
  ): Promise<AxiosResponse<{ name: string; color: AccentColorsType }>> {
    return await $axios.post(
      `${ENDPOINT_GROUP}${groupId}${ENDPOINT_CREATE__GROUP_TAG}`,
      userTagParams
    )
  }

  async deleteTagGroup(
    userTagCode: string,
    groupId: string | undefined
  ): Promise<AxiosResponse<null>> {
    return await $axios.delete(
      `${ENDPOINT_GROUP}${groupId}/tags/${userTagCode}/`
    )
  }

  async getAllTagGroup(
    groupId: string | undefined
  ): Promise<AxiosResponse<TagType[]>> {
    return await $axios.get(
      `${ENDPOINT_GROUP}${groupId}${ENDPOINT_GET_ALL_GROUP_TAGS}`
    )
  }

  async createUserTagGroup(
    groupId: string | undefined,
    username: string,
    userTagCodes: Array<string>
  ): Promise<AxiosResponse<null>[]> {
    return await Promise.all(
      userTagCodes.map(userTagCode =>
        $axios.post(`${ENDPOINT_GROUP}${groupId}${ENDPOINT_CREATE_USERTAG}`, {
          username,
          tag_code: userTagCode
        })
      )
    )
  }

  async deleteUserTagGroup(
    groupId: string | undefined,
    username: string,
    userTagCodes: Array<string>
  ): Promise<AxiosResponse<null>[]> {
    return await Promise.all(
      userTagCodes.map(userTagCode =>
        $axios.delete(
          `${ENDPOINT_GROUP}${groupId}/usertags/delete/${username}/${userTagCode}/`
        )
      )
    )
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
    return await $axios.put(
      `${ENDPOINT_GROUP}${groupId}${ENDPOINT_ADD_MEMBER}`,
      memberParams
    )
  }
}

export default new GroupService()
