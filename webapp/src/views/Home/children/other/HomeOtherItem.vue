<template>
  <router-link :to="{name: 'homeOther', params: {type}}" tag="li">{{type}}</router-link>
</template>

<script>
  export default {
    name: "HomeOtherItem",
    props: {
      type: String
    }
  }
</script>

<style scoped lang='scss'>

</style>
