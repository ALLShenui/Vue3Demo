import { createApp  } from 'vue'
import App from './App.vue'
import  './commonStyle/base.css'
const app = createApp(App)

//引入
import router from '/src/router/index'
import store from '/src/store/index'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import {ElLoading } from 'element-plus'
import commonMethods from '/src/utils/commonMethods'
import validate from '/src/utils/validate'
import baseCore from '/src/baseCore'
//样式引入
import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/base.css'

//批量注册element-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 注册全局组件
// const requireModules = import.meta.glob('./components/**.vue', { eager: true });
// for (const path in requireModules) {
//   const moduleName = path.match(/.*\/(.+).vue$/)[1];
//   const moduleConent = requireModules[path].default;
//   app.component(moduleName, moduleConent);
// }


app.use(router)
app.use(store)
app.use(ElementPlus)
//vue3通过globalProperties来定义全局方法
//全局消息通知方法
app.config.globalProperties.$messageInfos = function(msg, type, dur) {
    ElMessage({ message: msg, type: type, duration: dur ,showClose:true})
}
app.provide("$messageInfos",ElMessage)

//全局遮罩
let fullLoading = {}
app.config.globalProperties.$onLoading =function (text,autoUnLoading) {
    this.fullLoading =  ElLoading.service({
        lock: true,
        text: text||'',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    if(autoUnLoading){
        setTimeout(() => {
            this.fullLoading && this.fullLoading.close()
        }, 3000)
    }
}
app.config.globalProperties.$unLoading =function () {
    setTimeout(() => {
        this.fullLoading && this.fullLoading.close()
    }, 100)
}
//全局常用方法
app.config.globalProperties.$commonMethods = commonMethods
app.config.globalProperties.$validate = validate
app.config.globalProperties.$baseCore = baseCore

app.mount('#app')
