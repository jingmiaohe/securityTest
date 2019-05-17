import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import store from './store';
import './permission.js';
import '@/assets/styles/reset.less'
import "babel-polyfill";
Vue.use(ElementUI)
Vue.use(VideoPlayer)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
