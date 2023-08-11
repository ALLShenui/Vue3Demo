//对不同模块添加路由注册脚本
export default {
    menus : [
        {
            sort: 0,
            name: '主页',
            path: '/home',
            component: () => import('/src/pages/core/home.vue')
        }
    ],
    
}
