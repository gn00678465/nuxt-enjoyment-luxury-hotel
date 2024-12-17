import type { AuthEntry } from './auth.type'
import type { RoomEntry } from './room.type'

export type OrderReqBody = Pick<AuthEntry, 'address' | 'name' | 'email' | 'phone'> & {
  peopleNum: number
  checkInDate: string
  checkOutDate: string
}

export type OrderEntry = Pick<AuthEntry, 'address' | 'name' | 'email' | 'phone'> &
{
  roomId: RoomEntry
  _id: string
  checkInDate: string
  checkOutDate: string
  peopleNum: number
  orderUserId: string
  status: number
  createdAt: string
  updatedAt: string
}

export type OrderResponse = {
  status: boolean
  result: OrderEntry
}