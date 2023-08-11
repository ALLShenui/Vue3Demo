
import CryptoJS from 'crypto-js'
const key = CryptoJS.enc.Utf8.parse('caacetc@2020BP#$')
const iv = CryptoJS.enc.Utf8.parse('Y2020@#caacetc$*')
// 加密方法
export function encrypt (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
}

// 解密
export function decrypt (word) {
  let base64Str = CryptoJS.enc.Base64.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(base64Str)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
