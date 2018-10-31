<template>
  <div class="home-type home-hot" ref="scrollEle">
    <HomeHotSwiper/>
    <HomeHotNav/>
    <HomeHotSpecialPrice/>
    <HomeHotContent/>
    <div class="go-top" :class="{active: flag}" @click="goTop">
      <span class="top">顶部</span>
    </div>
  </div>
</template>

<script>
  import HomeHotSwiper from "./HomeHotSwiper";
  import HomeHotNav from "./HomeHotNav";
  import HomeHotSpecialPrice from "./HomeHotSpecialPrice";
  import HomeHotContent from "./HomeHotContent";

  export default {
    name: "HomeHot",
    data() {
      return {
        flag: false,
        isScrolling: false,
      };
    },
    methods: {
      goTop() {
        if (!this.isScrolling) {
          this.isScrolling = true;
          let step = this.$refs.scrollEle.scrollTop / 50;
          let timerId;
          let scrolling = () => {
            if (this.$refs.scrollEle.scrollTop - step <= 0) {
              this.$refs.scrollEle.scrollTop = 0;
              this.isScrolling = false;
            } else {
              this.$refs.scrollEle.scrollTop -= step;
              this.timerId = setTimeout(scrolling, 5);
            }
          };
          scrolling();
        }
      },
      bindEvent() {
        this.$refs.scrollEle.addEventListener('scroll', (e) => {
          this.flag = e.target.scrollTop > e.target.clientHeight;
        });
      },
    },
    mounted() {
      this.bindEvent();
    },
    components: {HomeHotContent, HomeHotSpecialPrice, HomeHotNav, HomeHotSwiper}
  }
</script>

<style scoped lang='scss'>
  .home-hot {
  }
  .go-top {
    position: fixed;
    right: 20px;
    bottom: -64px;
    width: 42px;
    height: 42px;
    opacity: 0;
    background: url(data:image/png;base64,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);
    background-size: contain;
    z-index: 2;
    transition: all .8s ease-out;
    &.active {
      bottom: 64px;
      opacity: 1;
    }
    .top {
      position: absolute;
      bottom: 7px;
      width: 100%;
      height: 12px;
      line-height: 12px;
      text-align: center;
      font-size: 10px;
      color: #333;
    }
  }
</style>
