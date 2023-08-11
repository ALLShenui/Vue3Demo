import request from '/src/utils/request'
import {encrypt} from '/src/utils/crypto'
import {systemCfgs} from '/src/systemCfg'
const LOGIN_URL = '/security/oauth/token'
/* 用户登录 */
export function loginByUsername (name, password) {
  var reg = new RegExp('[+]', 'g')
  let pwd = encrypt(password).replace(reg, '%2B')// 避免+被后台服务替换成空格
  let secret = encrypt(systemCfgs.SECRET)
  let data = 'client_id=vue&client_secret=' + secret + '&grant_type=password&username=' + name + '&password=' + pwd

  return request({
    url: LOGIN_URL,
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: data
  })
}
/* 刷新token */
export function refreshToken(refresh_token){
  let secret = encrypt(systemCfgs.SECRET)
  let data = 'client_id=vue&client_secret=' + secret + '&grant_type=refresh_token&refresh_token=' + refresh_token
  return request({
    url: LOGIN_URL,
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: data
  })
}