<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <tabbar v-show="isTabbar" />
  </div>
</template>

<script>
import tabbar from 'components/content/tabbar'

export default {
  name:'app',
  components:{
    tabbar
  },
  data() {
    return {
      isTabbar: true,
    }
  },
  updated(){
    // 隐藏下面tabbar组件
    // this.$bus.$on('falseTabbar', () => {
    //   this.isTabbar = false
    // })
    // this.$bus.$on('trueTabbar', () => {
    //   this.isTabbar = true
    // })
  }
}
</script>

<style scoped>
  @import 'assets/css/base.css';
</style>
