<template>
  <div class="balance" v-if="cart.length">
    <div class="left" @click="checkedAll">
      <i class="iconfont icon-xuanzhong" v-if="isCheckedAll"></i>
      <i class="iconfont icon-meixuanzhong" v-else></i>
      <span class="all">全选</span>
    </div>
    <div class="right">
      <div class="pay">
        <p>去结算</p>
        <span>({{count}}件)</span>
      </div>
      <div class="total">
        <p>总计</p>
        <span>￥{{total | currency}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {mapState} from 'vuex';
  import {OPERATE_CART} from "../../../store/mutation-types";

  export default {
    name: "Balance",
    computed: {
      ...mapState(['cart']),
      count() {
        return this.cart.reduce((prev, cur) => {
          return parseInt(prev) + (cur.goods_checked ? parseInt(cur.goods_num) : 0);
        }, 0);
      },
      total() {
        return this.cart.reduce((prev, cur) => {
          return parseFloat(prev) + (cur.goods_checked ? parseInt(cur.goods_num) * parseFloat(cur.goods_price) : 0);
        }, 0);
      },
      isCheckedAll() {
        return this.cart.every((item) => item.goods_checked);
      },
    },
    methods: {
      checkedAll() {
        Indicator.open('请求加载中...');
        this.$store.dispatch(OPERATE_CART, {goods: 'all', type: 'checked', operate: !this.isCheckedAll}).then(() => {
          Indicator.close();
        });
      }
    }
  }
</script>

<style scoped lang='scss'>
  .balance {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 49px;
    background-color: #fff;
    z-index: 4;
  }
  i {
    font-size: 18px;
  }
  .icon-xuanzhong {
    color: #e02e24;
  }
  .icon-meixuanzhong {
    color: #999;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 100%;
  }
  .all {
    margin-top: 8px;
    font-size: 10px;
    color: #999;
  }
  .right {
    width: 100%;
    text-align: right;
  }
  .total, .pay {
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    height: 100%;
    font-size: 16px;
    font-weight: 700;
  }
  .total {
    color: #333;
    span {
      color: #e02e24;
    }
  }
  .pay {
    width: 110px;
    margin-left: 10px;
    color: #fff;
    background-color: #e02e24;
    span {
      font-size: 12px;
      font-weight: 400;
      margin-top: 4px;
    }
    &.empty {
      color: #999;
      background-color: #d7d7d7;
    }
  }
</style>
