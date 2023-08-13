export interface Account {
  id: string
  email: string
  createdAt: string
  updatedAt: string
  profile?: ResponseProfile | null
}

export interface UpdateAccount {
  email: string
}

export interface Profile {
  id: string
  name: string
  user: Account
  createdAt: string
  updatedAt: string
}

export interface NewProfile {
  name: string
}

export interface UpdateProfile {
  name?: string
}
