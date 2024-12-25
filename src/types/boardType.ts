import { AccentColorsType } from './accentColorsType'
import { TagType } from './tagType'

export interface BoardType {
  columns: ColumnType[]
}

export interface ColumnType {
  name: string
  color: AccentColorsType
  sum: number
  tasks: TaskType[]
}

export interface TaskType {
  name: string
  column: ColumnType['name']
  worker: string
  description: string
  date: string
  tags: TagType[]
}
