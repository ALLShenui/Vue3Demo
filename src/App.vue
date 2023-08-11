<template>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>
<script>
export default {
  created() {
    // 处理页面刷新丢失相关数据
		// 在页面加载时,读取sessionStorage里的状态信息
		if (sessionStorage.getItem('storeInfo')) {
			this.$store.replaceState(
				Object.assign(
					{},
					this.$store.state,
					JSON.parse(sessionStorage.getItem('storeInfo'))
				)
			)
		}
		// 在页面刷新时,将vuex里的信息保存到sessionStorage里
		window.addEventListener('beforeunload', () => {
			sessionStorage.setItem('storeInfo', JSON.stringify(this.$store.state))
		})
  },
}
</script>
<style scoped>
</style>
