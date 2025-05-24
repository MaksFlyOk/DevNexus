import { BoardType } from './boardType'
import { TagType } from './tagType'
import { UserType } from './userType'

export interface GroupType {
  admin: UserType
  description: string
  group_uuid: string
  icon?: string | null
  id: number
  name: string
  board: BoardType
  members: Array<UserType & { tags: TagType[] }>
}
