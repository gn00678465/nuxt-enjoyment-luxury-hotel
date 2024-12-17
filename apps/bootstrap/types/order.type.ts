import type { AuthEntry } from './auth.type'
import type { RoomEntry } from './room.type'

export type OrderReqBody = {
  peopleNum: number
  checkInDate: string
  checkOutDate: string
  roomId: string
  userInfo: Pick<AuthEntry, 'address' | 'name' | 'email' | 'phone'>
}

export type OrderEntry = {
  roomId: RoomEntry
  userInfo: Pick<AuthEntry, 'address' | 'name' | 'email' | 'phone'>
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

export type OrderEntries = OrderEntry[]

export type OrdersResponse = {
  status: boolean
  result: OrderEntries
}