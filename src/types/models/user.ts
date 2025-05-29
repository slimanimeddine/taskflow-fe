import { BaseModel } from './base'

export type UserModel = BaseModel & {
  name: string
  email: string
  email_verified_at?: string
}

export type User = UserModel & {}
