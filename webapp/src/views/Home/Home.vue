<template>
  <div class="home content">
    <TabBarHome/>
    <router-view></router-view>
  </div>
</template>

<script>
  import TabBarHome from "../../components/TabBarHome";

  export default {
    name: "Home",
    components: {TabBarHome}
  }
</script>

<style scoped lang='scss'>
  .home {
    .home-type {
      position: absolute;
      top: 41px;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
