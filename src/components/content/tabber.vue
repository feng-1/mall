<template>
  <div>
    <footer id="footer">
	    <ul>
			<router-link tag="li" to="/home">
				<svg class="icon" aria-hidden="true"><use xlink:href="#icon-zhuye"></use></svg>
				<span>首页</span>
			</router-link>
			<router-link tag="li" to="/categary">
				<svg class="icon" aria-hidden="true"><use xlink:href="#icon-leimupinleifenleileibie"></use></svg>
				<span>分类</span>
			</router-link>
			<router-link tag="li" to="/cart">
				<svg class="icon" aria-hidden="true"><use xlink:href="#icon-gouwuche"></use></svg>
				<span>购物车</span>
			</router-link>
			<router-link tag="li" to="/profile">
				<svg class="icon" aria-hidden="true"><use xlink:href="#icon-wode"></use></svg>
				<span>我的</span>
			</router-link>
		</ul>
		</footer>
  </div>
</template>

<script>

import iconfont from 'assets/iconfont/iconfont.js'

export default {
  name: 'tabbar',
}
</script>

<style scoped>
.icon {
  width: 1.6em;
  height: 1.6em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#footer{ width:100%; height:50px; background: white; border-top:2px #ebe8e3 solid; position: fixed; left: 0; bottom:0; background-color: #eee;}
#footer ul{ display: flex; text-align: center; height:50px; align-items:center;}
#footer ul li{ flex:1; height:40px;}
#footer ul li.active{ color: #f03d37;}
#footer ul li.router-link-active{ color: #f03d37;}
#footer ul i{ font-size: 20px;}
#footer ul span{ font-size: 12px; line-height: 18px;  display: block; letter-spacing: 2px}
</style>