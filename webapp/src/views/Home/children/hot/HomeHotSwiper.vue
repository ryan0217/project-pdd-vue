<template>
  <div class="home-hot-swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(homeHotCarousel, index) in homeHotCarousels" :key="index">
          <img :src="homeHotCarousel.imgUrl" alt="">
        </div>
      </div>
      <!-- 分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import {mapState} from 'vuex';
  import {GET_HOME_HOT_CAROUSELS} from "../../../../store/mutation-types";

  export default {
    name: "HomeHotSwiper",
    computed: {
      ...mapState(['homeHotCarousels'])
    },
    methods: {
      createSwiper() {
        new Swiper('.home-hot-swiper .swiper-container', {
          autoplay: { //自动轮播选项
            disableOnInteraction: false,
          },
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.home-hot-swiper .swiper-pagination'
          }
        });
      }
    },
    mounted() {
      this.$store.dispatch(GET_HOME_HOT_CAROUSELS).then(() => {
        this.createSwiper();
      });
    }
  }
</script>

<style scoped lang='scss'>
  .home-hot-swiper {
    .swiper-slide img {
      width: 100%;
      height: 100%;
    }
    .swiper-pagination {
      text-align: right;
      span {
        width: 6px;
        height: 6px;
        margin: 0 0 0 6px !important;
        background-color: #fff;
        opacity: 1;
        &:last-child {
          margin-right: 16px !important;
        }
        &.swiper-pagination-bullet-active {
          background-color: #e02e24;
        }
      }
    }
  }
</style>
