import { AccentColorsType } from './accentColorsType'
import { TagType } from './tagType'

export interface BoardType {
  columns: Array<ColumnType>
}

export interface ColumnType {
  code: number
  color: AccentColorsType
  name: string
  tasks: TaskType[]
}

export interface TaskType {
  assignee: string
  code?: string
  column: ColumnType['name']
  description: string
  start_date: string
  end_date: string
  tags: TagType[]
  title: string
}
