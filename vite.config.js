import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // 按需引入
      dts: true,
      dirs: ["src/components"]
    })
  ],
  base:"/",
  server: {
    proxy: {
      '/nc': {
        target:'http://localhost:6002',// 所要代理的目标地址
        rewrite: path => path.replace(/^\/nc/, ''), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
        changeOrigin: true,  // true/false, Default: false - changes the origin of the host header to the target URL
      }
    }
  }
})
