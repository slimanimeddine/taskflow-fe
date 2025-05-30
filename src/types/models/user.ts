import { BaseModel } from './base'
import { Workspace } from './workspace'

export type UserModel = BaseModel & {
  name: string
  email: string
  email_verified_at?: string
}

export type User = UserModel & {
  workspaces: Workspace[]
}
