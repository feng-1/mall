<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    <home-swipe :banner='banner'></home-swipe>
    <home-recommend :recommend='recommend'></home-recommend>
  </div>
  
</template>

<script>
import Navbar from 'components/common/navbar/Navbar'
import HomeSwipe from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'

import {getHomeMultidata} from 'network/home'

export default {
  name:'home',
  data() {
    return {
      banner: [],
      recommend: []
    }
  },
  components:{
    Navbar,
    HomeSwipe,
    HomeRecommend
  },
  created(){
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      // console.log(res);
      this.banner = res.data.banner.list
      this.recommend = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
.home-nav{
  background-color: #ff8198;
  color: #fff;
}
</style>