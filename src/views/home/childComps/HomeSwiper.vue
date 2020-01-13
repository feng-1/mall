<template>
  <mt-swipe :auto="4000" class="banner">
    <mt-swipe-item v-for="(item,index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" height="100%" width="100%">
      </a>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  name: 'swipe',
  props:{
    banner:{
      type: Array
    }
  }

}
</script>

<style>
.banner{
  height: 210px;
  width: 100%;
}
</style>