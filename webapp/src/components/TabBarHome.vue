<template>
  <div class="tab-bar-home">
    <ul class="wrap">
      <router-link to="/home/hot" tag="li">热门</router-link>
      <HomeOtherItem
        v-for="(type, index) in types"
        :key="index"
        :type="type"
      />
    </ul>
  </div>
</template>

<script>
  import HomeOtherItem from "../views/Home/children/other/HomeOtherItem";

  export default {
    name: "TabBarHome",
    components: {HomeOtherItem},
    data() {
      return {
        types: ['女装', '百货', '鞋包', '食品', '母婴', '内衣', '电器', '男装', '家具', '水果', '美妆', '手机', '家纺', '运动', '电脑', '汽车', '家装']
      };
    }
  }
</script>

<style lang='scss'>
  .tab-bar-home {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    overflow-y: hidden;
    background-color: #fff;
    z-index: 2;
    .wrap {
      padding: 0 4% 10px;
      line-height: 39px;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      white-space: nowrap;
      font-size: 0;
      li {
        display: inline-block;
        margin-left: 20px;
        font-size: 14px;
        color: rgb(68, 68, 68);
        &:first-child {
          margin-left: 0;
        }
        &.router-link-active {
          color: rgb(224, 46, 36);
          border-bottom: 2px solid #e02e24;
        }
      }
    }
  }
</style>
