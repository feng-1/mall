<template>
  <div class="recommend">
    <div v-for="(item,index) in recommend" :key="index" class="recommend-item">
      <a :href="item.lick">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props:{
    recommend:{
      type: Array
    }
  }
}
</script>

<style scoped>
.recommend{
  /* width: 100%; */
  display: flex;
  padding: 0 5px;
  border-bottom: 8px solid #eee;
}
.recommend-item{
  flex: 1;
  padding: 15px 5px;
  text-align: center;
}
.recommend-item img{
  max-width: 100%;
  margin-bottom: 5px;
}
</style>