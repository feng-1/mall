<template>
  <div id="detail">
    <detail-navbar :top-images='topImages' class="detail-navbar" @titleClick='titClick' ref="nav"></detail-navbar>
    <scroll class="content" ref="detailScroll" :probe-type='3' @scroll="contentScroll" >
      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :param-info='paramInfo' ref="params"></detail-param-info>
      <detail-comment-info :comment-info='commentInfo' ref="comment"></detail-comment-info>
      <goods-item :goods='recommends' ref="recommend" @detailImgLoad='detailImgLoad'></goods-item>
    </scroll>
    <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
    <back-top  @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavbar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
// import BackTop from 'components/content/BackTop'

import { Toast } from 'mint-ui';

import Scroll from 'components/common/scroll/Scroll'
import GoodsItem from 'components/content/Goods'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {backTopMixin} from 'components/common/mixin'

export default {
  name: 'Detail',
  mixins: [backTopMixin],
  components:{
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsItem,
    DetailBottomBar,
    // BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
    }
  },
  created() {
    // 1.保存传入的id
    // console.log(this.$route.params);
    this.iid = this.$route.params.id

    // 2.根据id请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      // 1.获取顶部轮播图图片
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // this.$nextTick(()=>{
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      //   console.log(this.themeTopYs);
      // })
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted(){
    // this.$bus.$on('detailImgLoad', () => {
    //   // console.log('detailImgLoad');
    //   this.$refs.detailScroll.scroll.refresh()

    //   this.themeTopYs = []
    //     this.themeTopYs.push(0)
    //     this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
    //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
    //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
    //     console.log(this.themeTopYs);
    // })

    this.detailImgLoad()
    this.imageLoad()

  },
  updated(){
    
    // this.themeTopYs = []
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
    // console.log(this.themeTopYs);
    
  },
  methods:{
    titClick(index){
      // console.log(index);
      this.$refs.detailScroll.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    detailImgLoad(){
      this.$refs.detailScroll.scroll.refresh()
      // console.log(111);
    },
    imageLoad(){
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      // console.log(this.themeTopYs);
    },
    contentScroll(position){
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y
      // 2.positionY和主题中值进行对比
      this.themeTopYs.push(Infinity)
      for (let i = 0; i < this.themeTopYs.length; i++) {
        if (this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // if (positionY > this.themeTopYs[0] && positionY < this.themeTopYs[1]) {
      //   console.log(0);
      // }else if (positionY > this.themeTopYs[1] && positionY < this.themeTopYs[2]) {
      //   console.log(1);
      // }else if (positionY > this.themeTopYs[2] && positionY < this.themeTopYs[3]) {
      //   console.log(2);
      // }else if (positionY > this.themeTopYs[3]) {
      //   console.log(3);
      // }

      // 是否显示回到顶部
      this.listenShowBackTop(position)
    },
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product);

      // 2.将商品添加到购物车里面
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product).then(res => {
        console.log(res);
        // 3.添加到购物车成功
        Toast({
          message: '添加商品成功',
          duration: 1000,
          className: 'toast'
        });
      })

    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-navbar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100vh - 102px);
}
</style>
<style>
  .toast{
    width: 120px;
    line-height: 20px;
    letter-spacing: 1px;
    font-size: 14px;
  }
</style>