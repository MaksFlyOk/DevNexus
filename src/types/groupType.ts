import { BoardType, MemberType } from '@types'

export interface GroupType {
  name: string
  img?: string
  members: MemberType[]
  board: BoardType
}
