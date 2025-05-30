import { BaseModel } from './base'
import { User } from './user'

export type WorkspaceModel = BaseModel & {
  name: string
  imagePath: string | null
  user_id: string
}

export type Workspace = WorkspaceModel & {
  user: User
}
