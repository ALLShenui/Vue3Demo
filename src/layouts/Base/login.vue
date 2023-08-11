<template>
  <div class="login-body">
      <div class="login-panel">
          <div class="login-title">用户登录</div>
          <el-form :model="formData"  ref="formDataRef">
              <el-form-item prop="username">
                  <el-input placeholder="请输入账号" v-model="formData.username" size="large" type="text">
                      <template #prefix>
                          <el-icon>
                              <User />
                          </el-icon>
                      </template>
                  </el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input placeholder="请输入密码" v-model="formData.pwd" size="large" type="password"
                      @keyup.enter.native="login()">
                      <template #prefix>
                          <el-icon>
                              <Lock />
                          </el-icon>
                      </template>
                  </el-input>
              </el-form-item>
              <!-- <el-form-item label="">
                  <div class="check-code-panel">
                      <el-input placeholder="请输入验证码" v-model="formData.checkCode" class="input-panel" />
                      <img src="checkCodeUrl" class="check-code">
                  </div>
              </el-form-item> -->
              <!-- <el-form-item label="">
                  <el-checkbox label="记住密码" name="type" />
              </el-form-item> -->
              <el-form-item label="">
                  <el-button type="primary" style="width: 100%;" @click="login()" :loading="loading">{{loginTxt}}</el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>
<script setup>
import { loginByUsername } from "/src/baseApi";
import { ref, reactive, getCurrentInstance, onMounted, inject} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {systemCfgs } from '/src/systemCfg'
const store = new useStore()
const router = new useRouter()
const vm = getCurrentInstance().appContext.config.globalProperties
let formData = reactive({username:"",pwd:""})
let loginTxt = ref("登     录")
let loading = ref(false)
onMounted(()=>{
  inject("$messageInfos").success("成功")
  vm.$baseCore.doGetMenu(1,(res)=>{
      console.log(res)
  })
})
const login = ()=>{
  loading.value = true
  loginTxt.value = ""
  vm.$onLoading("系统登录中,请稍候...",true)
  let userinfo = {
      user:formData.username,pwd:formData.pwd
  }
  vm.$baseCore.doLogin(userinfo,(res)=>{
      if(res.Auth){
          router.push("/home")
          vm.$messageInfos("登录成功","success",1000)
      }else{
          vm.$messageInfos(res.msg,"error",1000)
          loginTxt.value="登     录"
          loading.value =false
      }
      vm.$unLoading()
  })
}
</script>

<style lang="scss" scoped >
.login-body {
    background: url("/src/assets/Base/loginBG.png") no-repeat center center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;

    .login-panel {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;

        padding: 25px;
        width: 26%;
        min-width: 460px;
        height: 30%;
        min-height: 300px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 5%;
        box-shadow: 2px 2px 10px #ddd;

        .login-title {
            font-size: 22px;
            text-align: center;
            margin-bottom: 22px;
        }
    }
}
</style>
