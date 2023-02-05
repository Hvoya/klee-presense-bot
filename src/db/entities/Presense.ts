import { User } from './User'

export enum PresenseStatus {
  WillCome = 'will-come',
  WillNotCome = 'will-not-come',
  Unknown = 'unknown',
}

export interface Presense {
  id: number
  date: Date
  user: User
  status: PresenseStatus
}
