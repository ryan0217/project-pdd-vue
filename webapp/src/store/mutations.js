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
  SHOW_FOOTER_BAR,
  HIDDEN_FOOTER_BAR,
  SET_USER_INFO,
  GET_USER_INFO,
  CLEAR_USER_INFO, OPERATE_CART, GET_CART
} from "./mutation-types";

export default {
  // 获取首页轮播图
  [GET_HOME_HOT_CAROUSELS](state, homeHotCarousels) {
    state.homeHotCarousels = homeHotCarousels;
  },
  // 获取首页导航
  [GET_HOME_HOT_NAVS](state, homeHotNavs) {
    state.homeHotNavs = homeHotNavs;
  },
  // 获取首页特价轮播图
  [GET_HOME_HOT_SPECIAL_PRICE_CAROUSELS](state, homeHotSpecialPriceCarousels) {
    state.homeHotSpecialPriceCarousels = {
      bgImgUrl: homeHotSpecialPriceCarousels[0].imgUrl,
      carousels: homeHotSpecialPriceCarousels.slice(1)
    };
  },
  // 获取首页广告图
  [GET_HOME_HOT_ADS](state, homeHotAd) {
    state.homeHotAd = homeHotAd[0];
  },
  // 获取首页商品列表
  [GET_HOME_HOT_GOODS_LIST](state, homeHotGoodsList) {
    state.homeHotGoodsList = homeHotGoodsList;
  },

  // 获取推荐页商品列表
  [GET_RECOMMEND_GOODS_LIST](state, recommendGoodsList) {
    state.recommendGoodsList = recommendGoodsList;
  },
  // 获取推荐页更多商品
  [GET_RECOMMEND_MORE_GOODS](state, moreGoods) {
    state.recommendGoodsList = [...state.recommendGoodsList, ...moreGoods];
  },

  // 获取搜索页商品列表
  [GET_SEARCH_GOODS_LIST](state, searchGoodsList) {
    state.searchGoodsList = searchGoodsList;
  },

  // 获取个人中心页基本图片
  [GET_USER_BASE_IMAGES](state, baseImages) {
    let obj = {};
    baseImages.forEach((item) => {
      obj[item.type] = item.imgUrl;
    });
    state.userBaseImages = obj;
  },

  // 显示底部导航
  [SHOW_FOOTER_BAR](state) {
    state.showFooterBar = true;
  },
  // 隐藏底部导航
  [HIDDEN_FOOTER_BAR](state) {
    state.showFooterBar = false;
  },

  // 保存用户信息
  [SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  },
  // 获取用户信息
  [GET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  },
  // 清除用户信息
  [CLEAR_USER_INFO](state) {
    state.userInfo = {};
    localStorage.removeItem('userInfo');
  },

  // 获取购物车
  [GET_CART](state, cart) {
    state.cart = cart;
  },
  // 操作购物车
  [OPERATE_CART](state, info) {
    let {goods, type, operate} = info;
    let newCart = JSON.parse(JSON.stringify(state.cart));
    if (goods === 'all' && type === 'checked') {
      newCart.forEach((item) => item.goods_checked = operate);
    } else {
      let flag = true;
      for (let i = 0; i < newCart.length; i++) {
        let cur = newCart[i];
        if (cur.goods_id === goods.goods_id) {
          flag = false;
          if (type === 'num') {
            cur.goods_num = parseInt(cur.goods_num);
            cur.goods_num = operate === 'increase' ? (cur.goods_num + 1) : (cur.goods_num - 1);
          } else if (type === 'remove') {
            newCart.splice(i, 1);
          } else if (type === 'checked') {
            cur.goods_checked = operate;
          }
          break;
        }
      }
      if (flag) {
        goods.goods_num = 1;
        goods.goods_checked = true;
        newCart.push(goods);
      }
    }
    state.cart = newCart;
  },
};
