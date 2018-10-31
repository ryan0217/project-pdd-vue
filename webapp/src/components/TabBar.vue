<template>
  <ul class="tab-bar">
    <router-link class="tab-bar-item" to="/home" tag="li">
      <i class="iconfont icon-shouye"></i>
      <span>首页</span>
    </router-link>
    <router-link class="tab-bar-item" to="/recommend" tag="li">
      <i class="iconfont icon-tuijian"></i>
      <span>推荐</span>
    </router-link>
    <router-link class="tab-bar-item" to="/search" tag="li">
      <i class="iconfont icon-sousuo"></i>
      <span>搜索</span>
    </router-link>
    <router-link class="tab-bar-item" to="/cart" tag="li">
      <i class="iconfont icon-gouwuche"></i>
      <span>购物车</span>
    </router-link>
    <router-link class="tab-bar-item" to="/user" tag="li">
      <i class="iconfont icon-gerenzhongxin"></i>
      <span>个人中心</span>
    </router-link>
  </ul>
</template>

<script>
  export default {
    name: "TabBar",
  }
</script>

<style lang='scss'>
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 2;
    background-color: #fff;
  }
  .tab-bar-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 49px;
    color: #7d7d7d;
    &.router-link-active {
      color: #e9232c;
    }
    .iconfont {
      font-size: 24px;
    }
    span {
      margin-top: 2px;
      font-size: 12px;
    }
  }
</style>
