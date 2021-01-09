import * as CryptoJS from 'crypto-js'

export const encryptPass = (pass) => CryptoJS[process.env.REACT_APP_CRYPT_METH].encrypt(pass, process.env.REACT_APP_CRYPT_SECRET).toString()