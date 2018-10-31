<template>
  <div class="goods-item">
    <div class="goods-item-wrap" :style="{background: `#fff url(${goods.thumb_url}) no-repeat`}">
      <div class="goods-item-inner">
        <p>{{goods.short_name}}</p>
        <div class="goods-item-inner-bottom">
          <span class="currency">￥</span>
          <span class="price">{{goods.price | currency}}</span>
          <span class="info">{{goods.sales_tip}}</span>
        </div>
        <!--<button class="goods-item-inner-find">发现 &gt;</button>-->
        <i class="iconfont icon-gouwuche1" @click.stop="addCart"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import {OPERATE_CART} from "../store/mutation-types";
  import {Indicator} from 'mint-ui';

  export default {
    name: "GoodsItem",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    methods: {
      addCart() {
        if (JSON.stringify(this.$store.state.userInfo) === '{}') return this.$router.push('/user/login');
        Indicator.open('请求加载中...');
        let cart = {
          goods: {
            goods_id: this.goods._id,
            goods_name: this.goods.short_name,
            goods_url: this.goods.thumb_url,
            goods_price: this.goods.price,
          },
          type: 'num',
          operate: 'increase'
        };
        this.$store.dispatch(OPERATE_CART, cart).then(() => {
          Indicator.close();
        });
      },
    }
  }
</script>

<style lang='scss'>
  .goods-item {
    position: relative;
    float: left;
    width: 50%;
    height: 265px;
    margin-bottom: 3px;
    &:nth-child(odd) .goods-item-wrap {
      margin-right: 1px;
    }
    &:nth-child(even) .goods-item-wrap {
      margin-left: 1px;
    }
  }
  .goods-item-wrap {
    box-sizing: border-box;
    padding-top: 186px;
    height: 100%;
    background-size: 186px 186px !important;
  }
  .goods-item-inner {
    padding: 0 8px;
    p {
      margin-top: 6px;
      max-height: 36px;
      line-height: 18px;
      font-size: 13px;
      color: #151516;
      overflow: hidden;
    }
  }
  .goods-item-inner-bottom {
    position: absolute;
    bottom: 12px;
    left: 6px;
    max-height: 14px;
    overflow: hidden;
    color: #e02e24;
    font-weight: 700;
    .currency {
      font-size: 11px;
    }
    .price {
      margin-left: -2px;
      font-size: 14px;
    }
    .info {
      font-size: 10px;
      font-weight: normal;
      color: #9c9c9c;
    }
  }
  /*.goods-item-inner-find {
    position: absolute;
    right: 0;
    bottom: 5px;
    padding-left: 12px;
    padding-right: 10px;
    line-height: 22px;
    background-color: #fff;
    font-size: 12px;
    color: #58595b;
    border: 1px solid #d5d5d5; !*no*!
    border-right: none;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    outline: none;
  }*/
  .icon-gouwuche1 {
    position: absolute;
    right: 8px;
    bottom: 6px;
    padding: 4px;
    font-size: 20px;
    color: #e02e24;
  }
</style>
