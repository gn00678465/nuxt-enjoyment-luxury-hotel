import type { RegistrationReqBody } from './auth.type'

export type OrderReqBody = Omit<RegistrationReqBody, 'password' | 'birthday'> & {
  peopleNum: number
  checkInDate: number
  checkOutDate: number
}