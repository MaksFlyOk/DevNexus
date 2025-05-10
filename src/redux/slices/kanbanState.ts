import { BoardType, TaskType } from '@types'
import { useCallback, useReducer } from 'react'

type Action =
  | {
      type: 'move-ticket'
      payload: { newColumn: TaskType['column']; task: TaskType }
    }
  | { type: 'set-initial'; payload: BoardType }
const initialState = { tasks: {} }

type TasksState = {
  tasks: Record<string, TaskType[] | undefined>
}
const reducer = (state: TasksState, action: Action): TasksState => {
  const { type } = action
  switch (type) {
    case 'move-ticket': {
      const { payload } = action

      return payload.newColumn === payload.task.column
        ? state
        : {
            ...state,
            tasks: {
              ...state.tasks,
              [payload.task.column]:
                state.tasks[payload.task.column]?.filter(
                  task => task.name !== payload.task.name
                ) || [],
              [payload.newColumn]: [
                ...(state.tasks[payload.newColumn] || []),
                { ...payload.task, column: payload.newColumn }
              ]
            }
          }
    }
    case 'set-initial': {
      const newBoard: TasksState = { tasks: {} }
      action.payload.columns.forEach(
        column => (newBoard.tasks[column.name] = column.tasks)
      )
      return newBoard
    }
  }
}
export const useKanbanState = () => {
  const [state, dispatch] = useReducer(reducer, { ...initialState })

  const moveTicket = useCallback(
    (task: TaskType, newColumn: TaskType['column']) =>
      dispatch({ type: 'move-ticket', payload: { task, newColumn } }),
    []
  )

  const setInitial = useCallback(
    (boardData: BoardType) =>
      dispatch({ type: 'set-initial', payload: boardData }),
    []
  )
  return {
    state,
    moveTicket,
    setInitial
  }
}
