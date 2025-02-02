import { RootState } from '@redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AccentColorsType, BoardType, TaskType } from '@types'

const initialState: BoardType = { columns: [] }

export const BoardStateSlice = createSlice({
  name: 'BoardState',
  initialState,
  reducers: {
    setInitial: (state, action: PayloadAction<BoardType>) => {
      state.columns = action.payload.columns
    },
    moveTask: (
      state,
      action: PayloadAction<{ task: TaskType; newColumn: TaskType['column'] }>
    ) => {
      const { payload } = action

      const updatedColumns = state.columns.map(column => {
        if (column.name === payload.task.column) {
          return {
            ...column,
            tasks: column.tasks.filter(task => task.name !== payload.task.name)
          }
        }

        if (column.name === payload.newColumn) {
          return {
            ...column,
            tasks: [
              { ...payload.task, column: payload.newColumn },
              ...column.tasks
            ]
          }
        }

        return column
      })

      state.columns =
        payload.newColumn === payload.task.column
          ? state.columns
          : [...updatedColumns]
    },
    addColumn: (
      state,
      action: PayloadAction<{ name: string; color: AccentColorsType }>
    ) => {
      const { payload } = action

      state.columns = [
        ...state.columns,
        { name: payload.name, color: payload.color, sum: 0, tasks: [] }
      ]
    }
  }
})

export const BoardStateActions = BoardStateSlice.actions
export const BoardStateReducer = BoardStateSlice.reducer
export const BoardState = (state: RootState) => state.boardState
