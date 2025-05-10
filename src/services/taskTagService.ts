import { $axios } from '@axios'
import { taskTagsList } from '@mocks/taskTags'
import { TagType } from '@types'
import { AxiosResponse } from 'axios'

class TaskTagService {
  async getAllTaskTags(group_uuid: string): Promise<AxiosResponse<TagType[]>> {
    if (import.meta.env.VITE_APP_IS_MOCKUP === 'true') {
      return { data: taskTagsList } as AxiosResponse<TagType[]>
    }
    return await $axios.get<TagType[]>(`v1/group/${group_uuid}/cardtag/all`)
  }
}

export default new TaskTagService()
