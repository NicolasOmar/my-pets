import { Dispatch } from 'react'

export interface LoggedUserData {
  name: string
}

export interface UserContextProps {
  userData: LoggedUserData | null
  setUserData: Dispatch<React.SetStateAction<LoggedUserData | null>>
}
