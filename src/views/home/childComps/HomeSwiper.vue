<template>
  <mt-swipe :auto="4000" class="banner">
    <mt-swipe-item v-for="(item,index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" height="100%" width="100%" @load="imageLoad">
      </a>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  name: 'swipe',
  data() {
    return {
      isLoad: false,
    }
  },
  props:{
    banner:{
      type: Array
    }
  },
  methods:{
    imageLoad(){
      if (!this.isLoad) {
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }
    }
  },

}
</script>

<style scoped>
.banner{
  height: 210px;
  width: 100%;
}
</style>