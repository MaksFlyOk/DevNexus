import { getGroupHandler } from './handlers/getGroupHandler'
import { getUserPorfileHandler } from './handlers/getUserProfileHandler'
import { postAddColumnGroup } from './handlers/postAddColumnGroup'
import { postAddGroupHandler } from './handlers/postAddGroupHandler'
import { postAuthUserHandler } from './handlers/postAuthUserHandler'
import { postRegisterUserHandler } from './handlers/postRegisterUserHandler'

// const putChangeCardColumnGroupHandler = http.put()

export const handlers = [
  // Auth
  postAuthUserHandler,
  postRegisterUserHandler,
  // Group
  postAddGroupHandler,
  getGroupHandler,
  postAddColumnGroup,

  // User
  getUserPorfileHandler
]

// POST
// /api/token/refresh/

// POST
// /api/token/verify/

// - - - - - - - - - - - - -

// PUT
// /api/v1/group/{group_uuid}/

// DELETE
// /api/v1/group/{group_uuid}/

// PUT
// /api/v1/group/{group_uuid}/add_member/

// GET
// /api/v1/group/{group_uuid}/card/{code}/

// PUT
// /api/v1/group/{group_uuid}/card/{code}/

// DELETE
// /api/v1/group/{group_uuid}/card/{code}/

// POST
// /api/v1/group/{group_uuid}/card/create/

// GET
// /api/v1/group/{group_uuid}/cardtag/{code}/

// PUT
// /api/v1/group/{group_uuid}/cardtag/{code}/

// DELETE
// /api/v1/group/{group_uuid}/cardtag/{code}/

// GET
// /api/v1/group/{group_uuid}/cardtag/all

// POST
// /api/v1/group/{group_uuid}/cardtag/create/

// GET
// /api/v1/group/{group_uuid}/column/{id}/

// PUT
// /api/v1/group/{group_uuid}/column/{id}/

// DELETE
// /api/v1/group/{group_uuid}/column/{id}/

// GET
// /api/v1/group/{group_uuid}/tag/{code}/

// PUT
// /api/v1/group/{group_uuid}/tag/{code}/

// DELETE
// /api/v1/group/{group_uuid}/tag/{code}/

// POST
// /api/v1/group/{group_uuid}/tag/create/

// POST
// /api/v1/group/{group_uuid}/usertag/create/

// DELETE
// /api/v1/group/{group_uuid}/usertag/delete/{username}/{tag}/

// GET
// /api/v1/user/profile/

// PUT
// /api/v1/user/profile/

// GET
// /api/v1/user/profile/{username}/

// PUT
// /api/v1/user/profile/{username}/
