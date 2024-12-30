import { UserWithToken } from '@interfaces/graphql'

const loggedUser = 'loggedUser'

export const setStorage: <T>(storageName: string, data: T) => void = (storageName, data) =>
  localStorage.setItem(storageName, JSON.stringify(data))

export const getStorage: <T = string>(storageName: string) => T | null = (storageName: string) =>
  JSON.parse(localStorage.getItem(storageName) ?? '')

export const clearStorage = (storageName: string) => localStorage.removeItem(storageName)

export const clearAllStorage = () => localStorage.clear()

export const setLoggedUser: <T>(data: T) => void = data => setStorage(loggedUser, data)

// USER FOR USERS SESSION ONLY
export const getLoggedUser = () => getStorage<UserWithToken>(loggedUser) || null

export const logoutUser = () => clearStorage(loggedUser)
