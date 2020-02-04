<template>
  <mt-swipe :auto="4000" class="detail">
    <mt-swipe-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="" width="100%">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  name: 'DetailSwiper',
  props:{
    topImages:{
      type: Array
    }
  },

}
</script>

<style scoped>
.detail{
  height: 300px;
  width: 100%;
}
</style>