import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

// import VueLazyLoad from 'vue-lazyload'
// Vue.use(VueLazyLoad)
// Vue.use(VueLazyLoad,{
//   loading: require('./assets/img/common/placeholder.png')
// })

import FastClick from 'fastclick'

Vue.config.productionTip = false

// 创建事件总线
Vue.prototype.$bus = new Vue()

// 解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
