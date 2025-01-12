import { UserContextProps } from '@interfaces/context'
import { createContext } from 'react'

export const UserContext = createContext<UserContextProps | null>(null)
