
export interface RoomInfo {
  title: string
  isProvide: boolean
}

export interface RoomEntry {
  name: string
  description: string
  imageUrl: string
  imageUrlList: string[]
  areaInfo: string
  bedInfo: string
  maxPeople: number
  price: number
  status: number
  layoutInfo: Array<RoomInfo>
  facilityInfo: Array<RoomInfo>
  amenityInfo: Array<RoomInfo>
  _id: string
  createdAt: string
  updatedAt: string
}

export type RoomEntries = Array<RoomEntry>

export type RoomResponse = {
  status: boolean
  result: RoomEntries
}