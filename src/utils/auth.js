import Cookies from 'vue-cookies'
import store from '/src/store'
const TokenKey = 'Authorization'
let RefreshToken = 'refreshToken'
/* token信息 */
export function getToken () {
  sessionStorage.getItem(TokenKey)
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  sessionStorage.removeItem(TokenKey)
  sessionStorage.setItem(TokenKey,token)
  store.commit("setToken",token)
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  sessionStorage.removeItem(TokenKey)
  store.commit("setToken","")
  return Cookies.remove(TokenKey)
}
/* refreshToken信息 */
export function getRefreshToken () {
  sessionStorage.getItem(RefreshToken)
  return Cookies.get(RefreshToken)
}

export function setRefreshToken (token) {
  sessionStorage.removeItem(RefreshToken)
  sessionStorage.setItem(RefreshToken,token)
  store.commit("setRefreshToken",token)
  return Cookies.set(RefreshToken, token)
}

export function removeRefreshToken () {
  sessionStorage.removeItem(RefreshToken)
  store.commit("setRefreshToken","")
  return Cookies.remove(RefreshToken)
}

//清除所有的Cookie信息
export function clearAllCookies(){
  removeRefreshToken()
  removeToken()
}

//清理所有会话存储与store存储
export function clearStorages (){
  //清除相关会话存储
  sessionStorage.clear()
}

//清理所有store存储
export function clearStore (){
  //初始化所有store信息
  
}
