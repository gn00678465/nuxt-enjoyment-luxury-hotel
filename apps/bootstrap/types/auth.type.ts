export interface RegistrationReqBody {
  name: string,
  email: string
  password: string
  phone: string
  birthday: string
  address: {
    zipcode: number
    detail: string
  }
}
export type SignupReqBody = Omit<AuthEntry['result'], '_id' | 'createdAt' | 'updatedAt' | 'id' | 'birthday'>

export type LoginReqBody = Pick<AuthEntry['result'], 'email'> & { password: string }

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
  status: boolean,
  token: string,
  result: {
    address: {
      zipcode: 802,
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
}