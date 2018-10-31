<template>
  <div class="bar">
    <div class="bar-wrap" v-if="!isShow" @click.self="toggleShow">
      <div class="bar-inner" @click.self="toggleShow">手工小吃</div>
    </div>
    <div class="view" v-else>
      <div class="view-top">
        <div class="view-wrap">
          <input class="search" :class="{hasWord: searchWord}" :autofocus="isShow" type="text" placeholder="手工小吃"
                 v-model="searchWord">
          <i class="btn-cancel" v-show="showBtnClear" @click="clear"></i>
        </div>
        <p class="btn" v-show="!searchWord" @click.self="toggleShow">取消</p>
        <p class="btn" :class="{hasWord: searchWord}" v-show="searchWord" @click.self="showToast">搜索</p>
      </div>
      <div class="view-content">
        <div class="view-content-wrap">
          <div class="search-hot">
            <i class="iconfont icon-remen"></i>
            热门搜索
          </div>
          <div class="search-list">
            <span class="search-item">冬季四件套</span>
            <span class="search-item">珊瑚绒</span>
            <span class="search-item">休闲食物</span>
            <span class="search-item">悠闲食品</span>
            <span class="search-item">小吃特产</span>
            <span class="search-item">辣东西</span>
            <span class="search-item">被子固定器</span>
            <span class="search-item">饼干批发</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {SHOW_FOOTER_BAR, HIDDEN_FOOTER_BAR} from "../../../store/mutation-types";

  export default {
    name: "SearchBar",
    data() {
      return {
        isShow: false,
        searchWord: ''
      };
    },
    computed: {
      showBtnClear() {
        return this.searchWord;
      }
    },
    methods: {
      clear() {
        this.searchWord = '';
      },
      toggleShow() {
        if (this.isShow) {
          this.$store.commit(SHOW_FOOTER_BAR);
          this.isShow = false;
        } else {
          this.$store.commit(HIDDEN_FOOTER_BAR);
          this.isShow = true;
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
    }
  }
</script>

<style scoped lang='scss'>
  .bar {
    background-color: #fff;
    padding: 11px 16px;
    border-bottom: 1px solid #d2d2d2;
  }
  .bar-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    border-radius: 8px;
    background-color: #ededed;
  }
  .bar-inner {
    padding-left: 21px;
    font-size: 16px;
    color: #9c9c9c;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAM1BMVEUAAACenp6dnZ2lpaWdnZ2dnZ2enp6dnZ2dnZ2enp6fn5+cnJydnZ2enp6dnZ2dnZ2cnJwuBT3hAAAAEHRSTlMAL/AR2OVFlopkVcR7Hqa0bCS5IQAAANNJREFUKM91kdm6xRAMRiUSQ4v+7/+0Z2s5bHbXjWHJ8IXpOC8MlhKtWYmKDodvnU8AEuIRU92pmxwpcFE7WA/gGHEKPpa3/7EnmMyMFXBuvfQsA2KUZ6e4zEoC7mSurhuKUBcPWc24FYRFtHx1FIz4Q9JTrPa6Yz/yNTI/UpDeaxacP2SCtgHZXQr8XZrhN3f00Yd9RFZ6LavQJfE13jtAaI77uDBX4DROAsw/7BhQ78hml6oKPNtcMDjJULMNCnIb8fWy24ElorvtYTeGVfNutfwBiJYKBbU3umQAAAAASUVORK5CYII=") left center no-repeat;
    background-size: 14px 14px;
  }
  .view {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: #fff;
    overflow: hidden;
    z-index: 3;
  }
  .view-top {
    padding: 7px 0 7px 16px;
    border-bottom: 1px solid #ededed; /*no*/
  }
  .view-wrap {
    display: inline-block;
    position: relative;
    width: 295px;
    height: 36px;
    background: #ededed url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAM1BMVEUAAACenp6dnZ2lpaWdnZ2dnZ2enp6dnZ2dnZ2enp6fn5+cnJydnZ2enp6dnZ2dnZ2cnJwuBT3hAAAAEHRSTlMAL/AR2OVFlopkVcR7Hqa0bCS5IQAAANNJREFUKM91kdm6xRAMRiUSQ4v+7/+0Z2s5bHbXjWHJ8IXpOC8MlhKtWYmKDodvnU8AEuIRU92pmxwpcFE7WA/gGHEKPpa3/7EnmMyMFXBuvfQsA2KUZ6e4zEoC7mSurhuKUBcPWc24FYRFtHx1FIz4Q9JTrPa6Yz/yNTI/UpDeaxacP2SCtgHZXQr8XZrhN3f00Yd9RFZ6LavQJfE13jtAaI77uDBX4DROAsw/7BhQ78hml6oKPNtcMDjJULMNCnIb8fWy24ElorvtYTeGVfNutfwBiJYKBbU3umQAAAAASUVORK5CYII=") 10px center no-repeat;
    background-size: 12px 12px;
    border-radius: 8px;
  }
  .search {
    width: 230px;
    height: 24px;
    line-height: 24px;
    padding: 6px 0;
    margin-left: 35px;
    background-color: transparent;
    font-size: 15px;
    color: #9c9c9c;
    border: none;
    outline: none;
  }
  .btn-cancel {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    content: '';
    width: 18px;
    height: 18px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiBAMAAADIaRbxAAAAJFBMVEWxsbGdnZ2dnZ2cnJyenp6dnZ2cnJycnJyfn5+dnZ2cnJycnJwQ7JGfAAAAC3RSTlMBsKP0IHS92VJJMYswFMoAAADTSURBVCjPZVIrDgJBDO2wQAKKBNwagiIZAwFDMBAkBs8BEHgMDosh4QJ7hV2+SS9HZ9pJ2fSJZub1daY/YFwOs9MYFN0+BkyLRDQ9MqqVMHdMWDDRQsUuMntUvALRwX/ciNnUmDkxvsZUlEuIXsfbILxYgCP7hDy6t2R7kJEtoUF2GPkJXDE6PEkcEr50ZJFIyHFEFo1Ygm84I4tAfB9YoojafHgo4xKjUblE2Zfld6e/S4a5ZpiJRKvQSkuu1HbDdsx21XbeTsdO0E7ZboLdFrtRPzHeFgrIg1bIAAAAAElFTkSuQmCC") right center no-repeat;
    background-size: 18px 18px;
  }
  .btn {
    float: right;
    width: 47px;
    line-height: 36px;
    font-size: 16px;
    color: #9c9c9c;
  }
  .hasWord {
    color: #151516;
  }
  .view-content {
  }
  .view-content-wrap {
    padding: 22px 16px 20px 15px;
  }
  .search-hot {
    position: relative;
    padding-left: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    color: #9c9c9c;
  }
  .iconfont {
    position: absolute;
    top: 0;
    left: -2px;
    color: #d2d2d2;
    font-size: 20px;
  }
  .search-list {
    margin: 4px 12px 0 1px;
    height: 80px;
    font-size: 0;
    overflow: hidden;
  }
  .search-item {
    display: inline-block;
    margin: 8px 8px 0 0;
    padding: 0 15px;
    max-width: 120px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    background-color: #f9f9f9;
    font-size: 14px;
    color: #58595b;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
