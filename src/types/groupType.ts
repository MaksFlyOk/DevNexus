import { AccentColorsType } from './accentColorsType'
import { BoardType } from './boardType'
import { UserType } from './userType'

export interface GroupType {
  admin: UserType
  description: string
  group_uuid: string
  icon?: string | null
  id: number
  name: string
  board: BoardType
  members: Array<
    UserType & { tags: Array<{ name: string; color: AccentColorsType }> }
  >
}
