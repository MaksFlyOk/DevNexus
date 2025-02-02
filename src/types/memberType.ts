import { TagType } from '@types'

export interface MemberType {
  id: number
  name: string
  img?: string
  tags: TagType[]
}
