export type BoardViewType = 'kanban' | 'list' | 'table'

export interface BoardViewStateType {
  boardView: BoardViewType
}

export type AuthType = boolean

export interface AuthStateType {
  auth: AuthType
}
