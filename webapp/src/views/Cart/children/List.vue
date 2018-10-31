<template>
  <div class="list">
    <div class="list-wrap">
      <p class="tip-empty" v-if="!cart.length">购物车空荡荡，请前往 <router-link to="/recommend">推荐页</router-link> 添加商品</p>
      <div class="item" v-for="goods in cart" :key="goods.goods_id">
        <i class="iconfont icon-xuanzhong" v-if="goods.goods_checked" @click="checked(goods, false)"></i>
        <i class="iconfont icon-meixuanzhong" v-else @click="checked(goods, true)"></i>
        <img class="item-left" :src="goods.goods_url" alt="">
        <div class="item-right">
          <div class="title">{{goods.goods_name}}</div>
          <div class="line">
            <span class="price">{{goods.goods_price | currency}}</span>
            <div class="num">
              <span class="decrease iconfont icon-jian" :class="{disabled: goods.goods_num.toString() === '1'}"
                    @click="decrease(goods)"></span>
              <div class="number">{{goods.goods_num}}</div>
              <span class="increase iconfont icon-jia" @click="increase(goods)"></span>
            </div>
          </div>
          <i class="remove iconfont icon-shanchu" @click="remove(goods)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Indicator, MessageBox} from 'mint-ui';
  import {mapState} from 'vuex';
  import {GET_CART, OPERATE_CART} from "../../../store/mutation-types";

  export default {
    name: "List",
    data() {
      return {};
    },
    computed: {
      ...mapState(['cart']),
    },
    methods: {
      getCart() {
        Indicator.open('购物车加载中');
        this.$store.dispatch(GET_CART).then(() => {
          Indicator.close();
        });
      },
      increase(goods) {
        this.putCart({goods, type: 'num', operate: 'increase'});
      },
      decrease(goods) {
        if (goods.goods_num.toString() !== '1') {
          this.putCart({goods, type: 'num', operate: 'decrease'});
        }
      },
      remove(goods) {
        MessageBox.confirm('确定删除吗?').then((action) => {
          if (action === 'confirm') {
            this.putCart({goods, type: 'remove'});
          }
        });
      },
      checked(goods, checked) {
        this.putCart({goods, type: 'checked', operate: checked});
      },
      putCart(info) {
        if (JSON.stringify(this.$store.state.userInfo) === '{}') return this.$router.push('/user/login');
        Indicator.open('请求加载中');
        this.$store.dispatch(OPERATE_CART, info).then(() => {
          Indicator.close();
        });
      },
    },
    created() {
      this.getCart();
    }
  }
</script>

<style scoped lang='scss'>
  .list {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: #f5f5f5;
    z-index: 3;
  }
  .list-wrap {
    box-sizing: border-box;
    height: 100%;
    padding-bottom: 50px;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .tip-empty {
    position: absolute;
    top: 44%;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 18px;
    text-align: center;
    color: #999;
    a {
      color: #e02e24;
      text-decoration: underline;
    }
  }
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    height: 110px;
    padding: 10px 14px 10px 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #fff;
  }
  i {
    position: absolute;
    font-size: 18px;
  }
  .icon-xuanzhong {
    padding: 36px 6px;
    left: 0;
    color: #e02e24;
  }
  .icon-meixuanzhong {
    padding: 36px 6px;
    left: 0;
    color: #999;
  }
  .icon-shanchu {
    top: -2px;
    right: -4px;
    padding: 4px;
    font-size: 16px;
    color: #e02e24;
  }
  .icon-jian {
    color: #999;
  }
  .icon-jia {
    color: #999;
  }
  .item-left {
    position: absolute;
    left: 31px;
    width: 90px;
    height: 90px;
  }
  .item-right {
    position: relative;
    width: 100%;
    height: 90px;
    overflow: hidden;
    margin-left: 124px;
  }
  .title {
    height: 34px;
    line-height: 17px;
    padding-right: 20px;
    font-size: 14px;
    color: #151516;
    overflow: hidden;
  }
  .line {
    display: flex;
    position: relative;
    align-items: center;
    height: 28px;
    margin-top: 28px;
    overflow: hidden;
  }
  .price {
    width: 100px;
    font-size: 16px;
    color: #e02e24;
    overflow: hidden;
    &:before {
      content: '￥';
      font-size: 12px;
    }
  }
  .num {
    display: flex;
    position: absolute;
    right: 0;
    height: 28px;
    line-height: 28px;
    justify-content: center;
    background-color: #f7f7f7;
    text-align: center;
  }
  .decrease, .increase {
    width: 28px;
    &.disabled {
      color: #e9e9e9;
    }
  }
  .number {
    width: 40px;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    font-size: 12px;
    color: #999;
    overflow: hidden;
  }
</style>
