export interface User {
    id?: number
    name?: string
    password?: string
    superuser?: boolean
    gecos?: string
    createdAt?: string
    updatedAt?: string
}

export type Users = User[]
