import { TaskType } from './boardType'

export type UserType = {
  username: string
  email: string
  description: string
}

export interface UserProfileType {
  user: UserType
  groups: Array<{
    name: string
    id: number
    group_uuid: string
    icon?: string | null
    cards: Array<TaskType>
  }>
}
