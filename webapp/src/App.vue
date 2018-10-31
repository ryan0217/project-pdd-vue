<template>
  <div id="app">
    <keep-alive v-if="this.$route.meta.keep">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
    <TabBar v-show="showTabBar"/>
  </div>
</template>

<script>
  import TabBar from "./components/TabBar";
  import {GET_USER_INFO} from "./store/mutation-types";

  export default {
    name: "App",
    components: {TabBar},
    computed: {
      showTabBar() {
        return this.$store.state.showFooterBar;
      }
    },
    created() {
      this.$store.dispatch(GET_USER_INFO);
    }
  }
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }
  #app {
    position: relative;
    height: 100%;
    background-color: #f5f5f5;
  }
  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 50px;
    left: 0;
    margin: auto;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .clearfix:after {
    display: block;
    height: 0;
    content: '';
    clear: both;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #c3c3c3;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #c3c3c3;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #c3c3c3;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #c3c3c3;
  }
  div, p, li, input, button {
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .mint-indicator, .mint-indicator-wrapper, .mint-indicator-mask {
    z-index: 9;
  }
  .mint-msgbox-input input {
    line-height: 24px;
    font-size: 15px;
    color: #151516;
  }
  .mint-msgbox-cancel, .mint-msgbox-confirm {
    font-size: 15px;
  }
</style>
