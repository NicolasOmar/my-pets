import { describe, test, expect } from 'vitest'
import {
  clearAllStorage,
  clearStorage,
  getLoggedUser,
  getStorage,
  logoutUser,
  setLoggedUser,
  setStorage
} from '../local-storage'
// MOCKS
import { mockedNames, mockedData, mockedUserData } from '../mocks/local-storage.mocks.json'

describe('[Functions.local-storage]', () => {
  test('setStorage', () => {
    setStorage(mockedNames[0], mockedData[0])
    expect(getStorage(mockedNames[0])).toEqual(mockedData[0])
  })

  test('set and clear storage', () => {
    setStorage(mockedNames[0], mockedData[0])
    clearStorage(mockedNames[0])
    expect(getStorage(mockedNames[0])).toBeNull()
  })

  test('set several storages and clear them all', () => {
    mockedNames.forEach((name, i) => {
      setStorage(name, mockedData[i])
      expect(getStorage(name)).toEqual(mockedData[i])
    })

    clearAllStorage()

    mockedNames.forEach(name => expect(getStorage(name)).toBeNull())
  })

  test('Should log userData and after logout, erasing it from the local storage', () => {
    setLoggedUser(mockedUserData)
    expect(getLoggedUser()).toEqual(mockedUserData)
    logoutUser()
    expect(getLoggedUser()).toBeNull()
  })
})
