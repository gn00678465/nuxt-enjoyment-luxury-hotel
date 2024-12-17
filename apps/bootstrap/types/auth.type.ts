export interface RegistrationReqBody {
  name: string,
  email: string
  password: string
  phone: string
  birthday: string
  address: {
    zipcode: number
    detail: string
    city: string,
    county: string
  }
}
export type SignupReqBody = Omit<AuthEntry, '_id' | 'createdAt' | 'updatedAt' | 'id' | 'birthday'>

export type LoginReqBody = Pick<AuthEntry, 'email'> & { password: string }

export type UserDataReqBody = {
  userId: string
  name: string
  phone: string
  birthday: string
  address: {
    zipcode: number
    detail: string
  },
  oldPassword: string
  newPassword: string
}

export interface AuthEntry {
  address: {
    zipcode: number,
    detail: string,
    city: string,
    county: string
  },
  _id: string
  name: string
  email: string
  phone: string
  birthday: string
  createdAt: string
  updatedAt: string
  id: string
}

export interface AuthResponse {
  status: boolean,
  token: string,
  result: AuthEntry
}