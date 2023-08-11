<template>
    <el-container style="height:100%;">
      <el-header  >
        <el-container >
            <el-aside  width="200px">
                <div style="width:120px;">
                    <el-image src="/src/assets/vue.svg"  class="logoDiv" />
                </div>
            </el-aside>
            <el-main >
                <div style="display:block;float:right;margin-right:20px;">
                    <div class="msgDiv">
                        <el-badge is-dot style="margin-right:20px;">
                            <el-button text class="msgBtn"><el-icon :size="20"><Bell  /></el-icon></el-button>
                        </el-badge>
                    </div>
                    <div class="avatarkDiv">
                        <el-avatar :src="photo" style="vertical-align: middle;" fit="contain" :size="35" />
                    </div>
                    <div class="userInfosDiv"  >
                        <div class="pointerDiv" style="padding-right:15px;" title="用户" @click="personal">username</div>
                        <div class="pointerDiv" @click="logout">
                            <el-icon :size="15"  color="black" title="注销 "><SwitchButton   /></el-icon>
                            <span style="padding-left:5px;">注销</span>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
      </el-header>
      <el-container>
        <el-aside width="200px" style="border-right:1px solid white;">
            <asideMenus></asideMenus>
        </el-aside>
        <el-main class="demoMain">
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script setup>
import {useRouter } from 'vue-router'
import {ElMessageBox} from 'element-plus'
import {getCurrentInstance} from "vue"
const router = new useRouter()
const vm = getCurrentInstance()
const photo = "/src/assets/Base/person.png"
const personal = ()=>{

}

const logout = ()=>{
    ElMessageBox.confirm("确认退出系统？","提示",
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'info',
        }
    ).then(()=>{
        vm.appContext.config.globalProperties.$messageInfos("成功","success",1000)
        vm.appContext.config.globalProperties.$onLoading("...")
        setTimeout(()=>{
            router.push("/login")
            vm.appContext.config.globalProperties.$unLoading()
        },1000)
    }).catch(()=>{
        vm.appContext.config.globalProperties.$messageInfos("取消","info",1000)
    })
}
</script>
<style scoped>
    *{
        padding: 0;
        margin: 0;
    }
    .el-header,.el-header .el-aside{
        background-color: azure;
    }
    .el-aside{
        background-color: bisque;
    }
    .demoMain.el-main{
      /* background-color:gainsboro; */
    }
    .logoDiv{
        margin-top:10px;margin-left:40px;width:40px;height:40px;
    }
    .msgDiv{
        display: inline-block;
    }
    .msgDiv .msgBtn:hover{
        background-color: transparent;
    }
    .avatarkDiv{
        display: inline-block;margin-right:20px;
    }
    .userInfosDiv{
        display: inline-block;line-height:60px;
    }
    .pointerDiv{
        cursor: pointer;display: inline-block;
    }
</style>