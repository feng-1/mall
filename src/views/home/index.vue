<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    
    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll" :pull-up-load='true' @pullingUp='loadMore'>
      <home-swipe :banner='banner'></home-swipe>
      <home-recommend :recommend='recommend'></home-recommend>
      <home-feature></home-feature>
      <tab-control :title="['流行','精选','新款']" @tabClick='tabClick'></tab-control>
      <goods :goods = "showGoods"></goods>
    </scroll>

    <back-top  @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
  
</template>

<script>
import Navbar from 'components/common/navbar/Navbar'
import TabControl from 'components/content/TabControl'
import Goods from 'components/content/Goods'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/BackTop'

import HomeSwipe from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeature from './childComps/HomeFeature'

import {getHomeMultidata, getHomeGoods} from 'network/home'

export default {
  name:'home',
  data() {
    return {
      banner: [],
      recommend: [],
      goods:{
        'pop':{page: 0, list: []},
        'new':{page: 0, list: []},
        'sell':{page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
    }
  },
  components:{
    Navbar,
    HomeSwipe,
    HomeRecommend,
    HomeFeature,
    TabControl,
    Goods,
    Scroll,
    BackTop
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    
  },
  methods:{
    // 事件监听相关方法
    tabClick(index){
      // console.log(index);
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }

      // if判断也行
      // if (index == 0) {
      //   this.currentType = 'pop'
      // } else if (index == 1) {
      //   this.currentType = 'new'
      // } else {
      //   this.currentType = 'sell'
      // }
    },
    backClick(){
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      
    },
    contentScroll(position){
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore(){
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },

    // 网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 再次加载30条商品
        this.$refs.scroll.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  /* margin-bottom: 1000px; */
  /* height: 100vh; */
}
.home-nav{
  background-color: #ff8198;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.content{
  height: calc(100vh - 94px);
  /* margin-top: 44px; */
  /* overflow: hidden; */
}
</style>