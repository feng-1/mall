<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" :key="index" class="tab-control-item" :class="{active: index === currentIndex}" @click='itemClick(index)'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    title:{
      type: Array
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
.tab-control{
  display: flex;
  line-height: 44px;
  text-align: center;
  font-size: 15px;
  letter-spacing: 2px;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.active{
  color: #ff8198;
}
.active span{
  border-bottom: 2px solid #ff8198;
  padding: 4px;
}
</style>