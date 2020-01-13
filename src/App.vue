<template>
  <div id="app">
    <router-view></router-view>
    <tabbar/>
  </div>
</template>

<script>
import tabbar from 'components/content/tabber'

export default {
  name:'app',
  components:{
    tabbar
  }
}
</script>

<style>
  @import 'assets/css/base.css';
</style>
