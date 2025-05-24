import { AccentColorsType } from './accentColorsType'
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
    cards: Array<TaskType & { column_color: AccentColorsType }>
  }>
}

export interface CurrentUserProfileType {
  user: UserType
  user_tags: Array<{
    tag_name: string
    tag_code: string
    tag_color: AccentColorsType
  }>
  cards: Array<TaskType & { column_color: AccentColorsType }>
}
