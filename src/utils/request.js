//引入axios
import axois from 'axios'
import store from '/src/store'
import router from '/src/router'
import {getRefreshToken,setToken,setRefreshToken} from '/src/utils/auth'
import {refreshToken} from '/src/baseApi'
import {systemCfgs } from '/src/systemCfg'
//elementPlus使用消息提醒需引用ELMessage
import {ElMessage } from 'element-plus'
//配置axois基础信息
const service = axois.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    timeout:3000
})
// 添加请求拦截器
service.interceptors.request.use(
    (request) =>{
       // 发送请求前
        if ((request.url.indexOf('/token') === -1 && request.url.indexOf('/Token') === -1)) { // 排除登陆
            let auth = store.state.accessToken
            if(auth === undefined || auth === 'undefined'){
                auth = sessionStorage.getItem("Authorization")
            }
            auth && (request.headers['Authorization'] = `${auth}`)
        }
        return request
        },
        (error) =>{
            return Promise.reject(error);
        }
);
// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
      //获取状态码
      const status = response.data.code || response.status;
      //未经过认证
      if (status === 401) {
        //token过期，具体判断根据接口返回内容进行调整
        if(info.indexOf("token expired")>=0){
          doRefreshToken()
        }else{
          //其他错误
          router.push({ path: "/login" })
        }
      }else if(status === 404){
        ElMessage({
          message: "资源未找到",
          type: 'error',
          duration: 2000
        })
      }
      else if(status === 500){
        ElMessage({
          message: "服务内部错误",
          type: 'error',
          duration: 2000
        })
      }
      else{//其他错误代码
        if((response.request.responseURL.indexOf('/token') === -1 && response.request.responseUR.indexOf('/Token') === -1)){
          //拦截器统一输出错误信息，各业务API不再单独处理错误提示
          ElMessage({
            message: response.data.msg,
            type: 'error',
            duration: 2000
          })
        }
      };
  
      return response.data;
    },
    (error) => {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
  
  async function doRefreshToken(){
    let refresh_token = getRefreshToken()
    if(refresh_token === "" || refresh_token === null || refresh_token === undefined || refresh_token === 'undefined'){
      refresh_token = sessionStorage.getItem("refreshToken")
    }
    if(systemCfgs.WITH_SERVER){
      await refreshToken(refresh_token).then(res=>{
        if (res.access_token) {
          setToken(res.token_type + ' ' + res.access_token)
          setRefreshToken(res.refresh_token)
          //存储有效时间戳，刷新token
          let dateNow = parseInt(new Date().getTime() / 1000)
          store.commit("setRefreshTokenTime",dateNow+res.expires_in)
          //刷新当前页面
          window.location.reload()
        } else {
          ElMessage({
            message: 'token刷新失败，请重新登录!',
            type: 'info',
            duration: 2000
          })
          setTimeout(function () {
            router.push({path: '/login'})
          }, 1000)
        }
      })
    }
  }
export default service