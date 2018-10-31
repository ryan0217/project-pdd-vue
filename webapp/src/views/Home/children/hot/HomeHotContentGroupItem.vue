<template>
  <div class="home-hot-content-group-item" :style="{background: `#fff url(${homeHotGoods.thumb_url}) 6px no-repeat`}">
    <div class="home-hot-content-group-item-wrap">
      <h4>{{homeHotGoods.short_name}}</h4>
      <div class="home-hot-content-group-item-wrap-bottom">
        <span class="currency">￥</span>
        <span class="price">{{homeHotGoods.normal_price | currency}}</span>
        <span class="info">{{homeHotGoods.sales_tip}}</span>
        <div class="user">
          <img :src="bubble.avatar" alt="" v-for="bubble in homeHotGoods.bubble" :key="bubble.group_order_id">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeHotContentGroupItem",
    props: {
      homeHotGoods: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped lang='scss'>
  .home-hot-content-group-item {
    position: relative;
    height: 168px;
    margin: 8px 6px 0;
    background-size: 156px 156px !important;
  }
  .home-hot-content-group-item-wrap {
    float: right;
    width: 191px;
    height: 100%;
    h4 {
      width: 178px;
      max-height: 60px;
      line-height: 20px;
      margin-top: 10px;
      margin-bottom: 6px;
      font-size: 14px;
      color: #151516;
      overflow: hidden;
    }
  }
  .home-hot-content-group-item-wrap-bottom {
    position: absolute;
    width: 191px;
    color: #e02e24;
    bottom: 14px;
    font-weight: 700;
    .currency {
      font-size: 12px;
    }
    .price {
      margin-left: -4px;
      font-size: 18px;
    }
    .info {
      font-size: 13px;
      font-weight: normal;
      color: #58595b;
    }
    .user {
      position: absolute;
      right: 6px;
      bottom: -5px;
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        &:last-child {
          margin-left: -6px;
        }
      }
    }
  }
</style>
