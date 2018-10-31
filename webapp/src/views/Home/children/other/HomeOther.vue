<template>
  <div class="home-type home-other">
    {{type}}
  </div>
</template>

<script>
  export default {
    name: "HomeOther",
    computed: {
      type() {
        return this.$route.params.type;
      }
    }
  }
</script>

<style scoped lang='scss'>
  .home-other {

  }
</style>
