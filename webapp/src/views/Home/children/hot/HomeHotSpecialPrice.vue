<template>
  <div class="home-hot-special-price" :style="{background: `url(${homeHotSpecialPriceCarousels.bgImgUrl}) no-repeat`}">
    <div class="home-hot-special-price-swiper">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(carousel, index) in homeHotSpecialPriceCarousels.carousels" :key="index">
            <img :src="carousel.imgUrl" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import {mapState} from 'vuex';
  import {GET_HOME_HOT_SPECIAL_PRICE_CAROUSELS} from "../../../../store/mutation-types";

  export default {
    name: "HomeHotSpecialPrice",
    computed: {
      ...mapState(['homeHotSpecialPriceCarousels']),
      /*bgImgStyle() {
        return {
          background: `url(${this.homeHotSpecialPriceCarousels[0]}) no-repeat`,
        }
      }*/
    },
    methods: {
      createSwiper() {
        new Swiper('.home-hot-special-price-swiper .swiper-container', {
          autoplay: {
            delay: 2000 // 轮播间隔
          },
          loop: true, // 循环模式选项
          allowTouchMove: false, // 禁止滑动

        })
      }
    },
    mounted() {
      this.$store.dispatch(GET_HOME_HOT_SPECIAL_PRICE_CAROUSELS).then(() => {
        this.createSwiper();
      });
    }
  }
</script>

<style scoped lang='scss'>
  .home-hot-special-price {
    position: relative;
    height: 175px;
    margin-top: 8px;
    background-size: 100% 100% !important;
  }
  .home-hot-special-price-swiper {
    position: absolute;
    top: 54px;
    left: 155px;
    width: 99px;
    height: 103px;
    img {
      width: 99px;
      height: 103px;
    }
  }
</style>
