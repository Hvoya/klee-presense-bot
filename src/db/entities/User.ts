import { Presense, PresenseStatus } from './Presense'
import { Space } from './Space'

export interface User {
  username: string | null
  first_name: string | null
  last_name: string | null
  id: string
  space: Space
}

export type UserWithPresenseStatus = User & { presense_status: PresenseStatus }

export type UserWithPresenses = User & { presenses: Presense[] }
