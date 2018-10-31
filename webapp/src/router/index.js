import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('../views/Home/Home');
const HomeHot = () => import('../views/Home/children/hot/HomeHot');
const HomeOther = () => import('../views/Home/children/other/HomeOther');
const Recommend = () => import('../views/Recommend/Recommend');
const Search = () => import('../views/Search/Search');
const Cart = () => import('../views/Cart/Cart');
const User = () => import('../views/User/User');
const Login = () => import('../views/User/children/Login');
const Personal = () => import('../views/User/children/Personal');
const Profile = () => import('../views/User/children/Profile');
const Setting = () => import('../views/User/children/Setting');

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home', component: Home, name: 'home', redirect: '/home/hot', children: [
        {path: 'hot', component: HomeHot, name: 'homeHot', meta: {title: '拼夕夕', keep: true}},
        {path: ':type', component: HomeOther, name: 'homeOther', meta: {title: '拼夕夕', keep: true}}
      ]
    },
    {path: '/recommend', component: Recommend, name: 'recommend', meta: {title: '推荐', keep: true}},
    {path: '/search', component: Search, name: 'search', meta: {title: '搜索', keep: false}},
    {path: '/cart', component: Cart, name: 'cart', meta: {title: '购物车', requireUser: true, keep: false}},
    {
      path: '/user', component: User, name: 'user', redirect: '/user/personal', children: [
        {path: 'login', component: Login, name: 'login', meta: {title: '登录', keep: false}},
        {
          path: 'personal',
          component: Personal,
          name: 'personal',
          meta: {title: '个人中心', requireUser: true, keep: false}
        },
        {path: 'profile', component: Profile, name: 'profile', meta: {title: '我的资料', requireUser: true, keep: false}},
        {path: 'setting', component: Setting, name: 'setting', meta: {title: '设置', requireUser: true, keep: false}}
      ]
    },
    {path: '*', redirect: '/home/hot'}
  ]
});
