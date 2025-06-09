export interface Tag {
  text: string
}

export interface Account {
  id: string
  tags: Tag[]
  type: AccountType
  login: string
  password: string | null
}

export type AccountType = 'LDAP' | 'Локальная'

export interface AccountFormData {
  id: string
  tagsInput: string
  type: AccountType
  login: string
  password: string
}

export interface ValidationErrors {
  login?: boolean
  password?: boolean
}
