import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [],
  },
  mutations: {
    addCounter(state, payload){
      payload.count++
    },
    addToCart(state, payload){
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload){
      // payload新添加的商品
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }

      return new Promise((res, rej) => {
        // 1.查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        // 2.判断oldProduct
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct)
          res('当前的商品数量+1')
        } else {
          payload.count = 1
          // state.cartList.push(payload)
          context.commit('addToCart', payload)
          res('添加了新的商品')
        }
      })
    }
  },
  modules: {
  },
  getters: {
    cartList(state) {
      return state.cartList
    },
    cartCount(state, getters) {
      return getters.cartList.length
    }
  }
})
