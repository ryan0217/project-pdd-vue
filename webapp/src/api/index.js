import axios from 'axios';

// 拦截响应
axios.interceptors.response.use((res) => {
  res.data = JSON.parse(JSON.stringify(res.data).replace(/127.0.0.1:3000/g, 'www.srrrr.top:80'));
  return res.data;
});

// 获取首页轮播图
export const getHomeHotCarousels = () => axios.get('/GET/home/hotCarousels');
// 获取首页导航
export const getHomeHotNavs = () => axios.get('/GET/home/hotNavs');
// 获取首页特价轮播图
export const getHomeHotSpecialPriceCarousels = () => axios.get('/GET/home/hotSpecialPriceCarousels');
// 获取首页广告图
export const getHomeHotAds = () => axios.get('/GET/home/hotAds');
// 获取首页商品列表
export const getHomeHotGoodsList = () => axios.get('/GET/home/hotGoodsList');

// 获取推荐页商品列表
export const getRecommendGoodsList = () => axios.get('/GET/recommend/goodsList');
// 获取推荐页更多商品
export const getRecommendMoreGoods = ({offset, limit}) => axios.get(`/GET/recommend/moreGoods?offset=${offset}&limit=${limit}`);

// 获取搜索页商品列表
export const getSearchGoodsList = () => axios.get('/GET/search/goodsList');

// 获取个人中心页基本图片
export const getUserBaseImages = () => axios.get('/GET/user/baseImages');

// 获取短信验证码
export const getPhoneSms = (phone) => axios.get(`/GET/user/phoneSms?phone=${phone}`);

// 发送登录请求
export const postUserLogin = (userInfo) => axios.post('/POST/user/login', userInfo);

// 获取用户信息
export const getUserInfo = () => axios.get('/GET/user/info');

// 发送退出登录请求
export const getUserLogout = () => axios.get('/GET/user/logout');

// 修改用户信息
export const putUserInfo = (userInfo) => axios.put('/PUT/user/info', userInfo);

// 获取购物车
export const getCart = () => axios.get('/GET/cart');
// 操作购物车
export const putCart = (cart) => axios.put('/PUT/cart', cart);
