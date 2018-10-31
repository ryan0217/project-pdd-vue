<template>
  <div class="cart content">
    <List/>
    <Balance/>
  </div>
</template>

<script>
  import List from "./children/List";
  import Balance from "./children/Balance";
  import {HIDDEN_FOOTER_BAR, SHOW_FOOTER_BAR} from "../../store/mutation-types";

  export default {
    name: "Cart",
    components: {List, Balance},
    beforeCreate() {
      this.$store.commit(HIDDEN_FOOTER_BAR);
    },
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
