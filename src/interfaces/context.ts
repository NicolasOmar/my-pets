import { Dispatch } from 'react'

export interface UserContextProps {
  userData: { name: string } | null
  setUserData: Dispatch<any>
}
