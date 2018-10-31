<template>
  <div class="container">
    <div class="nav">
      <ul class="nav-wrap" ref="nav">
        <li class="nav-inner" v-for="(goods, index) in searchGoodsList" :key="index" @click="jump(index)">
          {{goods.name}}
        </li>
      </ul>
    </div>
    <div class="list">
      <ul class="list-wrap" ref="list">
        <li class="list-inner" v-for="(goodsList, index) in searchGoodsList" :key="index">
          <div class="title">
            <span class="type">{{goodsList.name}}</span>
            <span class="more">查看更多></span>
          </div>
          <img class="banner" v-if="goodsList.banner" :src="goodsList.banner" alt="">
          <ul class="brand-wrap clearfix" v-if="goodsList.tag">
            <li class="brand-inner" :style="{background: `url(${category.icon}) no-repeat`}"
                v-for="(category, index) in goodsList.category" :key="index"></li>
          </ul>
          <div class="detail clearfix">
            <div class="goods" :style="{background: `url(${goods.icon}) center top no-repeat`}"
                 v-for="(goods, index) in goodsList.items" :key="index" @click="showToast">
              {{goods.title}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {mapState} from 'vuex';
  import {GET_SEARCH_GOODS_LIST} from "../../../store/mutation-types";

  export default {
    name: "SearchContent",
    data() {
      return {
        navChildren: [],
        listChildren: [],
        listOffsetTop: [],
        clientHeight: 0,
        curListTop: 0,
        curIndex: 0,
        isClick: false,
        timerJump: 0,
      };
    },
    computed: {
      ...mapState(['searchGoodsList']),
    },
    methods: {
      setChildren() { // 设置子元素
        this.listChildren = Array.from(this.$refs.list.children);
        this.navChildren = Array.from(this.$refs.nav.children);
      },
      setListTop() { // 设置列表中每项的上偏移量
        this.listOffsetTop = this.listChildren.map((item, index) => {
          return {
            index,
            offsetTop: item.offsetTop
          };
        });
      },
      setNavAttr() { // 设置导航可视高度
        this.clientHeight = this.$refs.nav.clientHeight;
      },
      setNavOffsetTop() { // 设置导航上偏移量
        let curIndexNavHeight = this.navChildren.slice(0, this.curIndex + 1).reduce((prev, cur) => prev + cur.scrollHeight, 0);
        this.$refs.nav.scrollTop = curIndexNavHeight > this.clientHeight ? curIndexNavHeight - this.clientHeight : 0;
      },
      bindEvent() { // 绑定事件
        this.$refs.list.addEventListener('scroll', this.listScroll);
      },
      listScroll() { // 列表滚动时执行
        this.curListTop = this.$refs.list.scrollTop;
        if (!this.isClick) {
          for (let i = 1; i < this.listOffsetTop.length; i++) {
            if (this.listOffsetTop[i].offsetTop >= this.curListTop) {
              if (this.curIndex !== i - 1) {
                this.curIndex = i - 1;
                this.setNavOffsetTop();
                this.setActiveClass();
              }
              break;
            }
          }
        }
      },
      setActiveClass() { // 设置导航激活样式
        this.navChildren.forEach((item, index) => {
          item.className = index === this.curIndex ? 'nav-inner active' : 'nav-inner';
        });
      },
      jump(index) { // 导航跳转
        if (this.timerJump) clearTimeout(this.timerJump);
        this.isClick = true;
        let flag = index - this.curIndex;
        this.curIndex = index;
        this.setActiveClass();
        let curListTop = this.curListTop;
        let tarTop = this.listOffsetTop[index].offsetTop;
        let distance, step, prevTop;
        let jumpDown = () => {
          if (this.curListTop + step >= tarTop) {
            this.$refs.list.scrollTop = tarTop + 1;
            this.isClick = false;
          } else {
            prevTop = this.$refs.list.scrollTop;
            this.$refs.list.scrollTop += step;
            if (prevTop !== this.$refs.list.scrollTop) {
              this.timerJump = setTimeout(jumpDown, 1);
            }
          }
        };
        let jumpUp = () => {
          if (this.curListTop - step <= tarTop) {
            this.$refs.list.scrollTop = tarTop + 1;
            this.isClick = false;
          } else {
            this.$refs.list.scrollTop -= step;
            this.timerJump = setTimeout(jumpUp, 1);
          }
        };
        if (flag > 0) {
          distance = tarTop - curListTop;
          step = distance / 50;
          jumpDown();
        } else if (flag < 0) {
          distance = curListTop - tarTop;
          step = distance / 50;
          jumpUp();
        }
      },
      showToast() {
        this.toastInstance && this.toastInstance.close();
        this.toastInstance = Toast({
          message: '由于缺少商品搜索数据，故该功能未实现',
          position: 'bottom',
          duration: 2000
        });
      },
    },
    created() {
      this.$store.dispatch(GET_SEARCH_GOODS_LIST).then(() => {
        this.setChildren();
        this.setListTop();
        this.setNavAttr();
        this.setActiveClass();
      });
    },
    mounted() {
      this.bindEvent();
    }
  }
</script>

<style scoped lang='scss'>
  .container {
    position: absolute;
    top: 64px;
    right: 0;
    bottom: 50px;
    left: 0;
    overflow: hidden;
  }
  .nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 89px;
    height: 100%;
    background-color: #fafafa;
    overflow: hidden;
  }
  .nav-wrap, .list-wrap {
    width: 100%;
    height: 100%;
    padding-right: 10px;
    text-align: center;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .nav-inner {
    position: relative;
    line-height: 52px;
    font-size: 15px;
    color: #666;
    &.active {
      color: #e02e24;
      background-color: #fff;
      &:before {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        content: '';
        width: 4px;
        height: 26px;
        background-color: #e02e24;
      }
    }
  }
  .list {
    position: absolute;
    top: 0;
    right: 0;
    width: 286px;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
  }
  .list-wrap {
    position: relative;
    margin-top: 5px;
  }
  .title {
    height: 37px;
    line-height: 37px;
    clear: both;
  }
  .type {
    float: left;
    margin-left: 18px;
    font-size: 15px;
    color: #58595b;
  }
  .more {
    float: right;
    margin-right: 10px;
    font-size: 14px;
    color: #959595;
  }
  .banner {
    width: 262px;
    height: 80px;
    padding: 0 12px 20px;
  }
  .brand-wrap:after {
    display: block;
    position: relative;
    top: -10px;
    height: 1px;
    margin-bottom: 6px;
    border-bottom: 1px solid #f4f4f4;
  }
  .brand-inner {
    float: left;
    width: 64px;
    height: 22px;
    margin: 0 9px 25px 19px;
    background-size: 64px 22px !important;
  }
  .goods {
    float: left;
    width: 95px;
    height: 75px;
    box-sizing: border-box;
    padding-top: 62px;
    margin-bottom: 16px;
    font-size: 13px;
    color: #151516;
    background-size: 56px 56px !important;
  }
</style>
