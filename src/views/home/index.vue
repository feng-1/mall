<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    <tab-control :title="['流行','精选','新款']" @tabClick='tabClick' ref="tabControl1" class="tab-tob" v-show="isTopFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll" :pull-up-load='true' @pullingUp='loadMore'>
      <home-swiper :banner='banner'  @swiperImgLoad='swiperImgLoad'></home-swiper>
      <home-recommend :recommend='recommend'></home-recommend>
      <home-feature></home-feature>
      <tab-control :title="['流行','精选','新款']" @tabClick='tabClick' ref="tabControl2"></tab-control>
      <goods :goods = "showGoods" @homeImgLoad='homeImgLoad'></goods>
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

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeature from './childComps/HomeFeature'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'components/common/utils'

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
      tabOffsetTop: 0,
      isTopFixed: false,
      saveY: 0,
    }
  },
  components:{
    Navbar,
    HomeSwiper,
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
  mounted(){
    // 1.监听item中图片加载完成
    // const refresh = debounce(this.$refs.scroll.scroll.refresh, 200)
    // this.$bus.$on('homeImgLoad', () => {
    //   // console.log('homeImgLoad');
    //   this.$refs.scroll.scroll.refresh()
    //   // refresh()
    // })
    this.homeImgLoad()
  },
  activated(){
    // console.log('home activated')
    // console.log(this.saveY);
    
    // this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // this.$refs.scroll.refresh();

   // console.log(this.saveY);
  },
  deactivated(){
  //  console.log('home deactivated')
  //  console.log(this.saveY);
    // this.saveY = this.$refs.scroll.getScrollY();

    //取消监听
    // this.$bus.$off('homeImgLoad')
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

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
      // 1.判断上拉箭头是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2.判断 流行精选新款 是否吸顶
      this.isTopFixed = (-position.y) > (this.tabOffsetTop)

    },
    loadMore(){
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop);
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
    },
    homeImgLoad(){
      this.$refs.scroll.scroll.refresh()
      // console.log(111);
    }
  }
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  /* margin-bottom: 1000px; */
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: #ff8198;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 8;
}
.content{
  height: calc(100% - 94px);
  margin-top: 44px;
  /* overflow: hidden; */
}
.tab-tob{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 7;
  /* margin-top: 44px; */
}
</style>