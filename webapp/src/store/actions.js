import {
  GET_HOME_HOT_ADS,
  GET_HOME_HOT_CAROUSELS,
  GET_HOME_HOT_GOODS_LIST,
  GET_HOME_HOT_NAVS,
  GET_HOME_HOT_SPECIAL_PRICE_CAROUSELS,
  GET_RECOMMEND_MORE_GOODS,
  GET_RECOMMEND_GOODS_LIST,
  GET_SEARCH_GOODS_LIST,
  GET_USER_BASE_IMAGES,
  GET_USER_INFO,
  SET_USER_INFO, OPERATE_CART, GET_CART
} from "./mutation-types";
import {
  getHomeHotAds,
  getHomeHotCarousels,
  getHomeHotGoodsList,
  getHomeHotNavs,
  getHomeHotSpecialPriceCarousels,
  getRecommendMoreGoods,
  getRecommendGoodsList,
  getSearchGoodsList,
  getUserBaseImages,
  getUserInfo,
  putUserInfo, putCart, getCart
} from "../api";
import {Indicator, Toast} from 'mint-ui';

export default {
  // 获取首页轮播图
  async GET_HOME_HOT_CAROUSELS({commit}) {
    const result = await getHomeHotCarousels();
    if (!result.status) {
      Toast({
        message: '轮播图获取失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(GET_HOME_HOT_CAROUSELS, result.msg);
    }
  },
  // 获取首页导航
  async GET_HOME_HOT_NAVS({commit}) {
    const result = await getHomeHotNavs();
    if (!result.status) {
      Toast({
        message: '导航获取失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(GET_HOME_HOT_NAVS, result.msg);
    }
  },
  // 获取首页特价轮播图
  async GET_HOME_HOT_SPECIAL_PRICE_CAROUSELS({commit}) {
    const result = await getHomeHotSpecialPriceCarousels();
    if (!result.status) {
      Toast({
        message: '特价轮播图获取失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(GET_HOME_HOT_SPECIAL_PRICE_CAROUSELS, result.msg);
    }
  },
  // 获取首页广告图
  async GET_HOME_HOT_ADS({commit}) {
    let result = await getHomeHotAds();
    if (!result.status) {
      Toast({
        message: '广告图获取失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(GET_HOME_HOT_ADS, result.msg);
    }
  },
  // 获取首页商品列表
  async GET_HOME_HOT_GOODS_LIST({commit}) {
    let result = await getHomeHotGoodsList();
    if (!result.status) {
      Toast({
        message: '商品列表获取失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(GET_HOME_HOT_GOODS_LIST, result.msg);
    }
  },

  // 获取推荐页商品列表
  async GET_RECOMMEND_GOODS_LIST({commit}) {
    let result = await getRecommendGoodsList();
    if (!result.status) {
      Toast({
        message: '商品列表获取失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(GET_RECOMMEND_GOODS_LIST, result.msg);
    }
  },
  // 获取推荐页更多商品
  async GET_RECOMMEND_MORE_GOODS({commit}, args) {
    let result = await getRecommendMoreGoods(args);
    if (!result.status) {
      Toast({
        message: '更多商品获取失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(GET_RECOMMEND_MORE_GOODS, result.msg);
    }
  },

  // 获取搜索页商品列表
  async GET_SEARCH_GOODS_LIST({commit}) {
    let result = await getSearchGoodsList();
    if (!result.status) {
      Toast({
        message: '商品列表获取失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(GET_SEARCH_GOODS_LIST, result.msg);
    }
  },

  // 获取个人中心页基本图片
  async GET_USER_BASE_IMAGES({commit}) {
    let result = await getUserBaseImages();
    if (!result.status) {
      Toast({
        message: '基本图片获取失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(GET_USER_BASE_IMAGES, result.msg);
    }
  },
  // 获取用户信息
  async GET_USER_INFO({commit}) {
    let result = await getUserInfo();
    if (!result.status) {
      console.log(result.msg);
      localStorage.removeItem('userInfo');
    } else {
      commit(GET_USER_INFO, result.msg);
    }
  },
  // 保存用户信息
  async SET_USER_INFO({commit}, userInfo) {
    let result = await putUserInfo(userInfo);
    if (!result.status) {
      Toast({
        message: '修改用户信息失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(SET_USER_INFO, result.msg);
    }
  },

  // 获取购物车
  async GET_CART({commit}) {
    let result = await getCart();
    if (!result.status) {
      Toast({
        message: '购物车获取失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(GET_CART, result.msg);
    }
  },
  // 操作购物车
  async OPERATE_CART({commit}, info) {
    let result = await putCart(info);
    if (!result.status) {
      Toast({
        message: '操作购物车失败',
        position: 'bottom',
        duration: 2000
      });
      console.log(result.msg);
    } else {
      commit(OPERATE_CART, info);
    }
  },
};
