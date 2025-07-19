// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

//导入网络请求包
import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http
//请求根路径
// $http.baseUrl = 'http://localhost:8889'
$http.baseUrl='http://129.211.26.112:8889'


// $http.baseUrl='https://www.yunsc.asia'

//请求拦截器s
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中'
  })
}

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
  if ((options.url.indexOf('/home') !== -1) ||
    (options.url.indexOf('/act') !== -1) ||
    (options.url.indexOf('/site') !== -1) ||
    (options.url.indexOf('/logout') !== -1) ||
    (options.url.indexOf('/my') !== -1) ||
    (options.url.indexOf('/upload') !== -1)
  ) {
    options.header = {
      'Authorization': 'Bearer ' + uni.getStorageSync('token')
    }
  }
}
//响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

//封装弹框的方法
uni.$showMsg = function(title = '数据请求失败', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

// main.js


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif