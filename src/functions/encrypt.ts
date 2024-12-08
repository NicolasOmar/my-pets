import * as CryptoJS from 'crypto-js'

export const encryptPass = pass =>
  CryptoJS[import.meta.env.VITE_CRYPT_METH]
    .encrypt(pass, import.meta.env.VITE_CRYPT_SECRET)
    .toString()
