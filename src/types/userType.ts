import { BoardType } from './boardType'

export interface UserType {
  name: string
  img?: string
  email: string
  about: string
  tasks: BoardType['columns']
}
