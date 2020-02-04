<template>
  <div class="cart">
    <!-- 导航 -->
    <navbar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </navbar>

    <scroll class="content" ref="scroll">
      <!-- 商品描述 -->
      <cart-list></cart-list>

      <!-- 添加购物车 -->
      <cart-bottom-bar></cart-bottom-bar>
    </scroll>
  </div>
</template>

<script>
import Navbar from 'components/common/navbar/Navbar'
import Scroll from 'components/common/scroll/Scroll'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

export default {
  name:'cart',
  components:{
    Navbar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    cartLength(){
      return this.$store.state.cartList.length
    }
  },
  activated(){
    this.$refs.scroll.scroll.refresh()
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: #ff8198;
  color: #fff;
}
.content{
  height: calc(100vh - 94px);
  overflow: hidden;
}
</style>