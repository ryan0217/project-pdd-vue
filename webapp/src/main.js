import 'lib-flexible/flexible.js';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import '../static/css/reset.css';
import '../static/font/iconfont.css';

// 滚动加载插件
import infiniteScroll from 'vue-infinite-scroll';
Vue.use(infiniteScroll);

// mint-ui
import {Actionsheet, DatetimePicker} from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Actionsheet.name, Actionsheet);

let checkUser = () => localStorage.getItem('userInfo');

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.meta.requireUser && !checkUser()) return next('/user/login');
  if (to.path === '/user/login' && checkUser()) return next('/user/personal');
  next();
});

Vue.filter('currency', (val) => (val / 100).toFixed(2));

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
