<template>
  <div class="home-hot-nav">
    <!-- 滚动区域 -->
    <ul class="home-hot-nav-content" ref="scrollContent">
      <li class="home-hot-nav-wrap">
        <div class="home-hot-nav-inner" v-for="(homeHotNav, index) in homeHotNavs.slice(0, 8)" :key="index">
          <img :src="homeHotNav.imgUrl" alt="">
          <span>{{homeHotNav.title}}</span>
        </div>
      </li>
      <li class="home-hot-nav-wrap">
        <div class="home-hot-nav-inner" v-for="(homeHotNav, index) in homeHotNavs.slice(8)" :key="index">
          <img :src="homeHotNav.imgUrl" alt="">
          <span>{{homeHotNav.title}}</span>
        </div>
      </li>
    </ul>
    <!-- 滚动条 -->
    <div class="home-hot-nav-bar">
      <div class="home-hot-nav-bar-inner" :style="barStyle"></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {GET_HOME_HOT_NAVS} from "../../../../store/mutation-types";

  export default {
    name: "HomeHotNav",
    data() {
      return {
        screenWidth: window.innerWidth || document.documentElement.clientWidth | document.body.clientWidth,
        scrollContentWidth: 584,
        barBgWidth: 100,
        barMoveOffset: 0
      };
    },
    computed: {
      ...mapState(['homeHotNavs']),
      barWidth() {
        return this.screenWidth / this.scrollContentWidth * this.barBgWidth;
      },
      barStyle() {
        let htmlFz = parseFloat(document.documentElement.style.fontSize);
        return {
          width: (this.barWidth / htmlFz) + 'rem',
          left: (this.barMoveOffset / htmlFz) + 'rem'
        };
      }
    },
    methods: {
      bindEvent() {
        // 监听滚动区域的滚动事件
        this.$refs.scrollContent.addEventListener('scroll', this.scrollEvent);
      },
      scrollEvent() {
        // 获取滚动区域滚动的左值
        let left = this.$refs.scrollContent.scrollLeft;
        // 等比转换上述左值
        this.barMoveOffset = (left / this.scrollContentWidth) * this.barBgWidth;
      }
    },
    created() {
      this.$store.dispatch(GET_HOME_HOT_NAVS);
    },
    mounted() {
      this.bindEvent();
    }
  }
</script>

<style scoped lang='scss'>
  .home-hot-nav {
    position: relative;
    height: 155px;
    background-color: #fff;
    overflow: hidden;
  }
  ul.home-hot-nav-content {
    padding: 5px 0 30px;
    margin: 0 5px;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }
  li.home-hot-nav-wrap {
    display: flex;
    flex-wrap: nowrap;
    width: 584px;
    height: 60px;
    margin-top: 5px;
    &:last-child {
      margin-top: 10px;
    }
  }
  div.home-hot-nav-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 73px;
    height: 60px;
    img {
      width: 39px;
      height: 39px;
    }
    span {
      margin-top: 7px;
      font-size: 12px;
      color: rgb(102, 102, 102);
    }
  }
  .home-hot-nav-bar {
    position: absolute;
    left: 50%;
    bottom: 7px;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    overflow: hidden;
    background-color: #E8E8E8;
  }
  .home-hot-nav-bar-inner {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background-color: #FF6969;
  }
</style>
