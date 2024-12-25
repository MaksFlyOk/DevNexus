export type BoardViewType = 'kanban' | 'timeline' | 'table'

export interface BoardViewStateType {
  boardView: BoardViewType
}

export type AuthType = boolean

export interface AuthStateType {
  auth: AuthType
}
