//1、引入创建路由需要的组件
import {createRouter,createWebHistory} from "vue-router"

import {systemCfgs} from '../systemCfg'
// 2、配置系统中的页面
const routes = [
    {
        name:'layout',
        path: "/", //项目启动后，可通过 http://localhost:3000/ 直接访问到该页面
        name: "index",
        redirect: '/login',
        component: () => import(/* @vite-ignore */"../layouts/"+systemCfgs.LAYOUT+"/_Layout.vue"),
        children:[],
        beforeEnter: (to, from, next) => {
            // if (!store.getters.userinfo) { // 判断当前用户是否已拉取完user_info信息
            //     next() // resolve 钩子
            // } else {
            //     next()
            // }
            next()
        }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import(/* @vite-ignore */'../layouts/' + systemCfgs.LAYOUT + '/login.vue'),
        beforeEnter: (to, from, next) => {
          next()
        }
      },
]



//全局注册路由组件
const compRoutes = import.meta.globEager('../pages/**/_menus.js')
for (const f in compRoutes) {
  const crs = compRoutes[f].default;
  //如果有菜单信息
  if(crs.menus){
    crs.menus.forEach(element => {
      routes[0].children.push(element)
    });
  }
}

//3、创建路由示例
const router = createRouter({
    history:createWebHistory(),
    routes
})


//4、声明外部引用的接口
export default router