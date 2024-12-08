import { createContext, Dispatch } from 'react'

export const UserContext = createContext<{
  userData: { name: string } | null,
  setUserData: Dispatch<any>
} | null>(null)
