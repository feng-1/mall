<template>
  <div>
    <navbar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" class="title-item" :class="{active: index === currentIndex}" @click='titleClick(index)'>{{item}}</div>
      </div>
    </navbar>
  </div>
</template>

<script>
import Navbar from 'components/common/navbar/Navbar'

export default {
  name: 'childComps',
  components:{
    Navbar,
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0,
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick(){
      this.$router.back()
      // this.$bus.$off('detailImgLoad')

      // 显示下面tabbar
      this.$bus.$emit('trueTabbar')
    }
  }

}
</script>

<style scoped>
.title{
  display: flex;
  font-size: 15px;
}
.title-item{
  flex: 1;
}
.active{
  color: #f8525b;
}
.back img{
  margin-top: 12px;
  margin-left: 14px;
}
</style>