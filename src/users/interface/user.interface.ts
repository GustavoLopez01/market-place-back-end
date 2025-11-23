

export interface User {
  id: number
  name: string
  lastName: string
  phoneNumber: string
  password: string
  email: string
  isEnabled: boolean
}

export type CreateUser = Omit<User, 'id'>;