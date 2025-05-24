import { RootState } from '@redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AccentColorsType,
  BoardType,
  GroupType,
  TagType,
  TaskType
} from '@types'

type BoardStateType = {
  boardId: string
  isBoardLoading: boolean
  board: BoardType
  prevBoard: BoardType
  minimizeColumnsInfo:
    | Array<{ name: string; color: AccentColorsType; columnIter: number }>
    | []
}

const initialState: BoardStateType = {
  boardId: '0',
  isBoardLoading: false,
  board: { columns: [] },
  prevBoard: { columns: [] },
  minimizeColumnsInfo: []
}

const setMinimizeColumnsInfo = (board: BoardStateType['board']) => {
  const arr: Array<{
    name: string
    color: AccentColorsType
    columnIter: number
  }> = []

  board.columns.forEach((column, iter) =>
    arr.push({ name: column.name, color: column.color, columnIter: iter })
  )

  return arr
}

export const BoardStateSlice = createSlice({
  name: 'BoardState',
  initialState,
  reducers: {
    setInitialBoardState: (state, action: PayloadAction<GroupType>) => {
      state.board.columns = action.payload.board.columns
      state.boardId = action.payload.group_uuid
      state.minimizeColumnsInfo = setMinimizeColumnsInfo(state.board)
    },
    moveTask: (
      state,
      action: PayloadAction<{ task: TaskType; newColumn: TaskType['column'] }>
    ) => {
      const { payload } = action
      state.prevBoard = { ...state.board }

      const updatedColumns = state.board.columns.map(column => {
        if (column.name === payload.task.column) {
          return {
            ...column,
            tasks: column.tasks.filter(task => task.code !== payload.task.code)
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

      state.board.columns =
        payload.newColumn === payload.task.column
          ? state.board.columns
          : [...updatedColumns]
    },
    addColumn: (
      state,
      action: PayloadAction<{ name: string; color: AccentColorsType }>
    ) => {
      const { payload } = action
      state.prevBoard = { ...state.board }

      state.board.columns = [
        ...state.board.columns,
        { code: 0, name: payload.name, color: payload.color, tasks: [] }
      ]
    },
    addTask: (
      state,
      action: PayloadAction<{
        title: string
        description: string
        column: string
        assignee: string
        start_date: string
        end_date: string
        tags: TagType[]
      }>
    ) => {
      const { payload } = action
      state.prevBoard = { ...state.board }

      state.board.columns.map(column => {
        if (column.name === payload.column) {
          column.tasks.unshift({
            code: '000000',
            title: payload.title,
            column: column.name,
            assignee: payload.assignee,
            description: payload.description,
            start_date: payload.start_date,
            end_date: payload.end_date,
            tags: payload.tags
          })
        }
      })
    },
    resetToStableState: state => {
      state.board = { ...state.prevBoard }
    },
    setIsBoardLoading: (state, action: PayloadAction<{ state: boolean }>) => {
      state.isBoardLoading = action.payload.state
    },
    setMinimizeColumnsInfoState: (
      state,
      action: PayloadAction<{
        color: AccentColorsType
        name: string
      }>
    ) => {
      const { payload } = action

      state.prevBoard = { ...state.board }

      state.minimizeColumnsInfo = [
        ...state.minimizeColumnsInfo,
        { ...payload, columnIter: state.minimizeColumnsInfo.length }
      ]
    }
  }
})

export const BoardStateActions = BoardStateSlice.actions
export const BoardStateReducer = BoardStateSlice.reducer
export const BoardState = (state: RootState) => state.boardState
