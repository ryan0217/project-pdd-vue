<template>
  <div class="search content">
    <SearchBar/>
    <SearchContent/>
  </div>
</template>

<script>
  import SearchBar from "./children/SearchBar";
  import SearchContent from "./children/SearchContent";
  import {SHOW_FOOTER_BAR} from "../../store/mutation-types";

  export default {
    name: "Search",
    components: {SearchContent, SearchBar},
    beforeRouteLeave(to, from, next) {
      this.$store.commit(SHOW_FOOTER_BAR);
      next();
    }
  }
</script>

<style scoped lang='scss'>
  .content {
    bottom: 0;
  }
</style>
