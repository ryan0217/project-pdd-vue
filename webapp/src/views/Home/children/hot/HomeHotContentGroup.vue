<template>
  <div class="home-hot-content-group">
    <HomeHotContentGroupItem v-for="(homeHotGoods, index) in homeHotGoodsList" :key="homeHotGoods._id" :homeHotGoods="homeHotGoods" @click.native="showToast"/>
    <!--<HomeHotContentGroupList/>-->
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import HomeHotContentGroupItem from "./HomeHotContentGroupItem";
  import HomeHotContentGroupList from "./HomeHotContentGroupList";
  import {mapState} from 'vuex';
  import {GET_HOME_HOT_GOODS_LIST} from "../../../../store/mutation-types";

  export default {
    name: "HomeHotContentGroup",
    components: {HomeHotContentGroupList, HomeHotContentGroupItem},
    computed: {
      ...mapState(['homeHotGoodsList'])
    },
    methods: {
      showToast() {
        this.toastInstance && this.toastInstance.close();
        this.toastInstance = Toast({
          message: '由于缺少商品详情数据，故该功能未实现',
          position: 'bottom',
          duration: 2000
        });
      },
    },
    created() {
      this.$store.dispatch(GET_HOME_HOT_GOODS_LIST);
    }
  }
</script>

<style scoped lang='scss'>
  .home-hot-content-group {
  }
</style>
