<template>
    <el-container style="background:white;">
        <testComp></testComp>
    </el-container>
</template>
<script setup>
import {onMounted ,getCurrentInstance,defineAsyncComponent} from "vue"
const vm = getCurrentInstance().appContext.config.globalProperties
// const testComp = defineAsyncComponent(()=>
//     import("/src/components/testComp.vue")
// )
onMounted(()=>{
    console.log(vm.$commonMethods.getBeforeDate(-1,new Date()))
    vm.$messageInfos("成功","success",1000)
})
</script>