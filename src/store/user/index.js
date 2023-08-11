//保存用户相关信息
const user = {
    state() {
        return {
            userInfo: {},
            menus:[],//用户菜单
            menuKey:0,//刷新菜单列表
        };
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setMenus(state,menus){
            state.menus = menus;
        },
        setMenusKey(state,key){
            state.menuKey = key;
        },
    },
};
  
export default user;