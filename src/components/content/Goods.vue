<template>
  <div class="goods">
    <div v-for="(item,index) in goods" :key="index" class="goods-item" @click="itemClick(item)">
      <img :src='item.image || item.show.img' alt="" @load="imageLoad">
      <div class="goods-info">
        <p>{{item.title}}</p>
        <span class="price">{{item.price}} </span>
        <span class="collect">{{item.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'goods',
  props:{
    goods:{
      type: Array
    }
  },
  methods:{
    imageLoad(){
      // this.$bus.$emit('homeImgLoad')
      if (this.$route.path.indexOf('/home') !== -1) {
        // this.$bus.$emit('homeImgLoad')
        this.$emit('homeImgLoad')
      } else if (this.$route.path.indexOf('/detail') !== -1) {
        // this.$bus.$emit('detailImgLoad')
        this.$emit('detailImgLoad')
      }
      
    },
    itemClick(item){
      // console.log(item.iid);
      // console.log(this.$router);
      this.$router.push(('/detail/' + item.iid) || ('/detail/' + item.item_id))

      // 隐藏下面tabbar
      this.$bus.$emit('falseTabbar')
    }
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  
}
.goods-item{
    padding-bottom:40px;
    position: relative;
    width: 50%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 10px;
    padding: 0 5px
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
    padding-left: 5px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>