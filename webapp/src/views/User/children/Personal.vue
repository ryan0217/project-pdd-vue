<template>
  <div class="personal">
    <div class="personal-wrap">
      <div class="header">
        <div class="info">
          <router-link to="/user/profile" tag="div" class="info-left">
            <div class="user-icon-wrap">
              <img class="user-icon" src="http://pinduoduoimg.yangkeduo.com/avatar/default/10.png" alt="">
            </div>
            <p class="username iconfont icon-shouji1">{{userInfo.username | hide}}</p>
          </router-link>
          <div class="info-right">
            <span class="iconfont icon-hongbao" @click="showToast('今日满返')">今日满返</span>
          </div>
        </div>
      </div>
      <div class="menu-top">
        <div class="menu-title iconfont icon-you">
          <div @click="showToast('我的订单')">我的订单</div>
          <span @click="showToast('查看全部')">查看全部</span>
        </div>
        <div class="menu-wrap">
          <div class="iconfont icon-daifukuan" @click="showToast('待付款')">待付款</div>
          <div class="iconfont icon-daifenxiang" @click="showToast('待分享')">待分享</div>
          <div class="iconfont icon-daifahuo" @click="showToast('待发货')">待发货</div>
          <div class="iconfont icon-daishouhuo" @click="showToast('待收货')">待收货</div>
          <div class="iconfont icon-daipingjia" @click="showToast('待评价')">待评价</div>
        </div>
      </div>
      <div class="menu-middle">
        <div class="menu-wrap">
          <div class="iconfont icon-youhuiquan" @click="showToast('优惠券')">优惠券</div>
          <div class="iconfont icon-shangpinshoucang" @click="showToast('商品收藏')">商品收藏</div>
          <div class="iconfont icon-dianpushoucang" @click="showToast('店铺收藏')">店铺收藏</div>
          <div class="iconfont icon-zuji" @click="showToast('历史浏览')">历史浏览</div>
          <div class="iconfont icon-tuikuan" @click="showToast('退款售后')">退款售后</div>
        </div>
      </div>
      <div class="menu-bottom">
        <div class="menu-wrap clearfix">
          <div class="iconfont icon-hongbao1" @click="showToast('新人红包')">新人红包</div>
          <div class="iconfont icon-shu" @click="showToast('多多果园')">多多果园</div>
          <div class="iconfont icon-kanjia" @click="showToast('砍价免费拿')">砍价免费拿</div>
          <div class="iconfont icon-bianguangbianzhuan" @click="showToast('边逛边赚')">边逛边赚</div>
          <div class="iconfont icon-hongbao2" @click="showToast('天天领现金')">天天领现金</div>
          <div class="iconfont icon-shouhuodizhi" @click="showToast('收货地址')">收货地址</div>
          <div class="iconfont icon-pingjia" @click="showToast('我的评价')">我的评价</div>
          <div class="iconfont icon-kefu" @click="showToast('官方客服')">官方客服</div>
          <router-link to="/user/setting" tag="div" class="iconfont icon-shezhi">设置</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {mapState} from 'vuex';

  export default {
    name: "Personal",
    computed: {
      ...mapState(['userInfo']),
    },
    methods: {
      showToast(content) {
        this.toastInstance && this.toastInstance.close();
        this.toastInstance = Toast({
          message: `${content}还未实现`,
          position: 'bottom',
          duration: 2000
        });
      },
    },
    filters: {
      hide(val) {
        if (val) return val.slice(0, 3) + '****' + val.slice(-4);
      }
    }
  }
</script>

<style scoped lang='scss'>
  .personal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding-bottom: 50px;
    overflow: hidden;
  }
  .personal-wrap {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    margin: auto;
  }
  .header {
    padding: 15px 16px 0 14px;
    background-color: #fff;
  }
  .info {
    position: relative;
    height: 78px;
  }
  .info-left {
    float: left;
  }
  .user-icon-wrap {
    float: left;
    box-sizing: border-box;
    width: 64px;
    height: 64px;
    margin-right: 12px;
    border: 1.5px solid rgba(219, 80, 79, .06);
    border-radius: 50%;
    overflow: hidden;
    background-color: #fafafa;
  }
  .user-icon {
    width: 100%;
  }
  .username {
    display: inline-block;
    position: relative;
    padding-right: 23px;
    max-width: 130px;
    line-height: 64px;
    color: #151516;
    font-size: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:before {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      margin: auto;
      font-size: 22px;
      color: #12b7f6;
    }
  }
  .info-right {
    float: right;
    margin: 17px 0;
    span {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      padding: 0 12px 0 10px;
      font-size: 13px;
      background-color: #fff;
      border: 1px solid hsla(0, 0%, 61%, 0.6);
      border-radius: 14.5px;
      &:before {
        position: relative;
        top: 1px;
        left: -3px;
        color: #e02e24;
        font-size: 18px;
      }
    }
  }
  .menu-top {
    padding-bottom: 7px;
    margin-top: 8px;
    background-color: #fff;
  }
  .menu-title {
    position: relative;
    height: 36px;
    overflow: hidden;
    box-sizing: border-box;
    vertical-align: bottom;
    &:before {
      position: absolute;
      top: 12px;
      right: 5px;
      font-size: 22px;
      font-weight: 600;
      color: #a7a7a7;
    }
    div {
      position: absolute;
      bottom: 0;
      line-height: 24px;
      float: left;
      margin-left: 16px;
      font-size: 17px;
      color: #151516;
    }
    span {
      position: absolute;
      bottom: 3px;
      right: 27px;
      height: 18px;
      line-height: 18px;
      font-size: 13px;
      color: #999;
    }
  }
  .menu-wrap {
    display: flex;
    position: relative;
    height: 77px;
    div {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      color: #58595b;
      &:before {
        margin-bottom: 12px;
        font-size: 30px;
        color: #a7a7a7;
      }
    }
  }
  .menu-middle {
    padding-top: 7px;
    padding-bottom: 7px;
    margin-top: 8px;
    background-color: #fff;
    div:before {
      color: #e02e24;
    }
  }
  .menu-bottom {
    padding: 10px 0;
    margin-top: 8px;
    background-color: #fff;
    .menu-wrap {
      display: block;
      height: auto;
      font-size: 0;
      div {
        float: left;
        width: 25%;
        height: 72px;
        &:before {
          color: #FE6D00;
        }
      }
    }
  }
</style>
