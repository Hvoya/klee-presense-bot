import { UserWithPresenseStatus } from './User'

export interface DateNode {
  date: Date
  users: UserWithPresenseStatus[]
}
