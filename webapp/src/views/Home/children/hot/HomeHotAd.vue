<template>
  <img class="home-hot-ad" :src="homeHotAd.imgUrl" alt="">
</template>

<script>
  import {mapState} from 'vuex';
  import {GET_HOME_HOT_ADS} from "../../../../store/mutation-types";

  export default {
    name: "HomeHotAd",
    computed: {
      ...mapState(['homeHotAd'])
    },
    created() {
      this.$store.dispatch(GET_HOME_HOT_ADS);
    }
  }
</script>

<style scoped lang='scss'>
  .home-hot-ad {
    margin-top: 8px;
    width: 100%;
  }
</style>
