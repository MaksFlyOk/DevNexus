import { BoardType, ColumnType, TaskType } from '@types'

export const moveTaskToColumn = (
  board: BoardType,
  taskName: TaskType['name'],
  newColumnName: ColumnType['name']
) => {
  let task = null
  let oldColumn = null

  for (const column of board.columns) {
    const taskIndex = column.tasks.findIndex(t => t.name === taskName)
    if (taskIndex !== -1) {
      task = column.tasks[taskIndex]
      oldColumn = column
      break
    }
  }

  if (!task || !oldColumn) {
    return board
  }

  const newColumn = board.columns.find(column => column.name === newColumnName)

  if (!newColumn) {
    return board
  }

  oldColumn.tasks = oldColumn.tasks.filter(t => {
    if (t.name !== taskName) return t
  })
  oldColumn.sum = oldColumn.tasks.length

  task.column = newColumnName
  newColumn.tasks.unshift(task)
  newColumn.sum = newColumn.tasks.length

  return board
}
