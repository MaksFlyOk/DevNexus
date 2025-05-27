import { deleteCardColumnGroup } from './handlers/deleteCardColumnGroup'
import { deleteCardTagGroup } from './handlers/deleteCardTagGroup'
import { deleteGroupHandler } from './handlers/deleteGroupHandler'
import { deleteTagGroup } from './handlers/deleteTagGroup'
import { getAllCardTagGroup } from './handlers/getAllCardTagGroup'
import { getAllTagGroup } from './handlers/getAllTagGroup'
import { getCurrentUserProfileHandler } from './handlers/getCurrentUserProfileHandler'
import { getGroupColumnCardHandler } from './handlers/getGroupColumnCardHandler'
import { getGroupHandler } from './handlers/getGroupHandler'
import { getUserProfileHandler } from './handlers/getUserProfileHandler'
import { postAddCardColumnGroup } from './handlers/postAddCardColumnGroup'
import { postAddColumnGroup } from './handlers/postAddColumnGroup'
import { postAddGroupHandler } from './handlers/postAddGroupHandler'
import { postAuthUserHandler } from './handlers/postAuthUserHandler'
import { postCreateCardTagGroup } from './handlers/postCreateCardTagGroup'
import { postCreateTagGroup } from './handlers/postCreateTagGroup'
import { postCurrentUserCreateTagsHandler } from './handlers/postCurrentUserCreateTags'
import { postCurrentUserDeleteTags } from './handlers/postCurrentUserDeleteTags'
import { postRegisterUserHandler } from './handlers/postRegisterUserHandler'
import { putAddMemberGroup } from './handlers/putAddMemberGroup'
import { putUpdateCardColumnGroup } from './handlers/putUpdateCardColumnGroup'
import { putUserProfileHandler } from './handlers/putUserProfileHandler'

export const handlers = [
  // Auth
  postAuthUserHandler,
  postRegisterUserHandler,
  // Group
  postAddGroupHandler,
  getGroupHandler,
  deleteGroupHandler,
  postAddColumnGroup,
  postAddCardColumnGroup,
  getGroupColumnCardHandler,
  putUpdateCardColumnGroup,
  deleteCardColumnGroup,
  postCreateCardTagGroup,
  deleteCardTagGroup,
  getAllCardTagGroup,
  postCreateTagGroup,
  deleteTagGroup,
  getAllTagGroup,
  postCurrentUserCreateTagsHandler,
  postCurrentUserDeleteTags,
  putAddMemberGroup,

  // User
  getUserProfileHandler,
  putUserProfileHandler,
  getCurrentUserProfileHandler
]

// PUT
// /api/v1/groups/{group_uuid}/

// GET
// /api/v1/groups/{group_uuid}/columns/{id}/

// PUT
// /api/v1/groups/{group_uuid}/columns/{id}/

// DELETE
// /api/v1/group/{group_uuid}/columns/{id}/

// - - - - - - - - - - - - -

// POST
// /api/token/refresh/

// POST
// /api/token/verify/

// GET
// /api/v1/users/profile/{username}/

// PUT
// /api/v1/users/profile/{username}/

// PUT
// /api/v1/groups/{group_uuid}/cardtags/{code}/

// PUT
// /api/v1/group/{group_uuid}/tags/{code}/

// GET
// /api/v1/group/{group_uuid}/tags/{code}/
