import { AccentColorsType } from './accentColorsType'
import { TaskType } from './boardType'
import { TagType } from './tagType'

export type UserType = {
  username: string
  email: string
  description: string
  tags: TagType[]
}

export interface UserProfileType {
  user: Omit<UserType, 'tags'>
  groups: Array<{
    name: string
    id: number
    group_uuid: string
    icon?: string | null
    cards: Array<TaskType & { column_color: AccentColorsType }>
  }>
}

export interface CurrentUserProfileType {
  user: Omit<UserType, 'tags'>
  user_tags: Array<{
    tag_name: string
    tag_code: string
    tag_color: AccentColorsType
  }>
  cards: Array<TaskType & { column_color: AccentColorsType }>
}
