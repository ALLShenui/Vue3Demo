import { createStore } from 'vuex'
import user from "./user";
// 创建一个新的 store 实例
const store = createStore({
	state () {
	  return {
		//公共参数
		accessToken: '',//token
		refreshTokenTime:'',  //全局token刷新时间
	  }
	},
	mutations: {
	  setToken (state,accessToken) {
		state.accessToken = accessToken
	  },
	  setRefreshToken (state, refreshToken) {
		state.refreshToken = refreshToken
	  },
	  setRefreshTokenTime(state,time){
		state.refreshTokenTime = time
	  },
	  
    },
    modules: {
        user,
    },
  })

export default store