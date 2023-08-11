export default {
    menus : [
        {
            sort:1,
            name: '菜单一',
            path:"/firstPage",
            component:()=>import("/src/pages/demo/first.vue")
        },
        {
            sort:2,
            name: '菜单二',
            path:"/secondPage",
            component:()=>import("/src/pages/demo/second.vue")
        },
        {
            sort:3,
            name: '菜单三',
            path:"/thirdPage",
        },
        {
            sort:1,
            name: '菜单三-1',
            parent:"/thirdPage",
            path:"/thirdPage_one",
            component:()=>import("/src/pages/demo/third_one.vue")
        },
        {
            sort:2,
            name: '菜单三-2',
            parent:"/thirdPage",
            path:"/thirdPage_two",
        },
        {
            sort:1,
            name: '菜单三-2',
            parent:"/thirdPage_two",
            path:"/thirdPage_two_one",
            component:()=>import("/src/pages/demo/third_two_one.vue")
        },
    ]
}