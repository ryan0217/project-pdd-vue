<template>
  <div class="user content">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: "User",
  }
</script>

<style scoped lang='scss'>
  .content {
    bottom: 0;
  }
</style>
