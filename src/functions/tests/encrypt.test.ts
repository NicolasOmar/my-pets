import { describe, test, expect, vi, beforeAll } from 'vitest'
import { CryptoMethods, encryptPass } from '../encrypt'

const cryptMethods = Object.values(CryptoMethods)
const originalPass = 'password'

describe('[Functions.encrypt]', () => {
  beforeAll(() => {
    vi.stubGlobal('import.meta', { env: { VITE_CRYPT_SECRET: 'secret' } })
  })

  cryptMethods.forEach(method => {
    test(`Should encrypt correctly a password using ${method}`, () => {
      const encryptedPassword = encryptPass(originalPass, true, method)
      expect(encryptedPassword).toBeDefined()
      expect(typeof encryptedPassword).toBe('string')
    })
  })

  cryptMethods.forEach(method => {
    test(`Should encrypt and decrypt correctly a password using ${method}`, () => {
      const encryptedPassword = encryptPass(originalPass, true, method)
      const decryptedPassword = encryptPass(encryptedPassword!, false, method)
      expect(decryptedPassword).toBe(originalPass)
    })
  })

  cryptMethods.forEach(method => {
    test(`Should return correctly empty string on null pass using ${method}`, () => {
      const encryptedNull = encryptPass(null)
      expect(encryptedNull).toBe('')
    })
  })
})
