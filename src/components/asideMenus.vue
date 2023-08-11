<template>
  <div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
    >
      <!-- 一级菜单 -->
      <template v-for="firstSubMenu in menuV">
        <!-- 不是导航---即一级菜单 -->
        <div v-if="!firstSubMenu.isNav" :key="firstSubMenu.name">
          <el-menu-item
            :index="firstSubMenu.href"
            :key="firstSubMenu.name"
            @click="push(firstSubMenu)"
            >{{ firstSubMenu.name }}</el-menu-item
          >
        </div>
        <!-- 一级导航 -->
        <div v-else :key="firstSubMenu.name">
          <el-sub-menu :index="firstSubMenu.href">
            <template #title>{{ firstSubMenu.name }}</template>
            <template v-for="secendSubMenu in firstSubMenu.children">
              <!-- 不是导航---即二级菜单 -->
              <div v-if="!secendSubMenu.isNav" :key="secendSubMenu.name">
                <el-menu-item
                  :index="secendSubMenu.href"
                  :key="secendSubMenu.name"
                  @click="push(secendSubMenu)"
                >
                  {{ secendSubMenu.name }}
                </el-menu-item>
              </div>
              <!-- 二级导航 -->
              <div v-else :key="secendSubMenu.name">
                <el-sub-menu :index="secendSubMenu.href">
                  <template #title>{{ secendSubMenu.name }}</template>
                  <div
                    v-for="(thirdSubMenu, index) in secendSubMenu.children"
                    :key="index"
                  >
                    <el-menu-item
                      :index="thirdSubMenu.href"
                      :key="thirdSubMenu.name"
                      @click="push(thirdSubMenu)"
                      >{{ thirdSubMenu.name }}</el-menu-item
                    >
                  </div>
                </el-sub-menu>
              </div>
            </template>
          </el-sub-menu>
        </div>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { ref, reactive, onMounted } from "vue";
export default {
  setup(props) {
    const store = new useStore();
    let menuV = store.state.user.menus;
    onMounted(() => {});
    const handleClose = function () {};
    const handleOpen = function () {};
    const push = function () {};
    return {
      menuV,
      handleClose,
      handleOpen,
      push,
    };
  },
};
</script>
