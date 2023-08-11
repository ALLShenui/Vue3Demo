import store from '/src/store/index'
import {systemCfgs } from '/src/systemCfg'
import {setToken,setRefreshToken} from '/src/utils/auth'
import { loginByUsername } from "./baseAPI";
export default {
    doLogin: async function(userinfo,callback) {
        let rp = { Auth: false, msg: '用户名/密码错误！' }
        if(systemCfgs.WITH_SERVER){
          //访问后台服务
          await loginByUsername(userinfo.user, userinfo.pwd).then((res) => {
            if (res.access_token) {
              setToken(res.token_type + ' ' + res.access_token)
              setRefreshToken(res.refresh_token)
              //存储有效时间戳，刷新token
              let dateNow = parseInt(new Date().getTime() / 1000)
              store.commit("setRefreshTokenTime",dateNow+res.expires_in)
              let userinfo = {
                userDept:res.user_dept,
                userEmployee:res.user_employee,
                userId:res.user_id,
                userRealName:res.user_real_name
              }
              store.commit('setUserInfo',userinfo)
              rp = {Auth: true, msg: '', userid: res.user_id}
            } else {
              if (res.msg) {
                if (res.msg.indexOf('user_is_locked') >= 0) {
                  rp.msg = '用户已被锁定，请联系管理员!'
                } else if (res.msg.indexOf('logon_try_too_many_times') >= 0) {
                  rp.msg = '密码错误次数超过3次，账户冻结30分钟，请联系管理员！'
                } else if (res.msg.indexOf('user_not_existed') >= 0) {
                  rp.msg = '该用户不存在！'
                } else {
                  rp.msg = '用户名/密码错误'
                }
              }
            }
          })
        }else{
          //单机独立运行
          if (userinfo.user !== '' && userinfo.pwd !== '') {
            rp = {Auth: true, msg: '', userid: 1}
          }
        }
        callback(rp)
    },
    doGetCurrentUser: async function (userid,callback) {
        let rp = {username: 'admin', userid: 0, roles: [1], staff: {deptid: 0}}
        if(systemCfgs.WITH_SERVER){
          
        }else{
          store.commit('setUserInfo', JSON.stringify(rp))
        }
        callback(rp)
    },
    doGetMenu: async function(roleIds,callback){
      if(systemCfgs.WITH_SERVER){
          
      }else{
        let loadMenus = import.meta.glob('/src/pages/**/_menus.js', { eager: true })
        let menuList = []
        let firstMenu = []
        let firstNavPath = []
        let firstNav = []
        let secondNav = []
        for (const f in loadMenus) {
          const crs = loadMenus[f].default;
          //如果有菜单信息
          if(crs.menus){
            let ctrl = crs.menus
            for (var i = 0; i < ctrl.length; i++) {
              if (!ctrl[i].component) {
                if (!ctrl[i].parent) {
                  firstNavPath.push(ctrl[i].path)
                  firstNav.push({
                    name: ctrl[i].name,
                    href: ctrl[i].path,
                    isNav: true,
                    icon: 'bookmark',
                    children: [],
                    controls: ctrl[i].controls || [],
                    funtype: 'web'
                  })
                } else {
                  secondNav.push({
                    parent: ctrl[i].parent,
                    name: ctrl[i].name,
                    href: ctrl[i].path,
                    isNav: true,
                    icon: 'bookmark',
                    children: [],
                    controls: ctrl[i].controls || [],
                    funtype: 'web'
                  })
                }
              } else {
                if (!ctrl[i].parent) {
                  firstMenu.push(ctrl[i].path)
                  menuList.push({
                    name: ctrl[i].name,
                    href: ctrl[i].path,
                    isNav: false,
                    icon: 'bookmark',
                    controls: ctrl[i].controls || [],
                    funtype: 'web'
                  })
                } else {
                  if (firstNavPath.indexOf(ctrl[i].parent) > -1) {
                    for (let j = 0; j < firstNav.length; j++) {
                      if (firstNav[j].href === ctrl[i].parent) {
                        firstNav[j].children.push({
                          name: ctrl[i].name,
                          href: ctrl[i].path,
                          isNav: false,
                          icon: 'bookmark',
                          controls: ctrl[i].controls || [],
                          funtype: 'web'
                        })
                      }
                    }
                  } else {
                    for (let j = 0; j < secondNav.length; j++) {
                      if (secondNav[j].href === ctrl[i].parent) {
                        secondNav[j].children.push({
                          name: ctrl[i].name,
                          href: ctrl[i].path,
                          isNav: false,
                          icon: 'bookmark',
                          controls: ctrl[i].controls || [],
                          funtype: 'web'
                        })
                      }
                    }
                  }
                }
              }
            }
            secondNav.forEach(item => {
              for (let i = 0; i < firstNav.length; i++) {
                if (firstNav[i].href === item.parent) {
                  firstNav[i].children.push(item)
                }
              }
            })
            firstNav.forEach(item => {
              menuList.push(item)
            })
            store.commit("setMenus",menuList)
            store.commit("setMenusKey",store.state.menuKey+1)
          }
        }
      }
      callback(true)
    }
}