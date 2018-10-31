<template>
  <div class="profile">
    <div class="profile-wrap">
      <div class="title">基本信息</div>
      <ul class="list">
        <li class="item clearfix">
          <p class="item-left touxiang">头像</p>
          <img class="img" src="http://pinduoduoimg.yangkeduo.com/avatar/default/10.png" alt="">
        </li>
        <li class="item clearfix">
          <p class="item-left">昵称</p>
          <p class="item-right">{{phone}}</p>
        </li>
        <li class="item clearfix">
          <p class="item-left">性别</p>
          <p class="item-right iconfont icon-you" :class="{empty: !userInfo.sex}" @click="sheetVisible=true">{{sex}}</p>
        </li>
        <li class="item clearfix">
          <p class="item-left">常住地</p>
          <p class="item-right iconfont icon-you" :class="{empty: !userInfo.address}" @click="openAddress">
            {{address}}</p>
        </li>
        <li class="item clearfix">
          <p class="item-left">生日</p>
          <p class="item-right iconfont icon-you" :class="{empty: !userInfo.birth}" @click="openBirth">
            {{birth}}</p>
        </li>
        <li class="item clearfix">
          <p class="item-left">个性签名</p>
          <p class="item-right iconfont icon-you" :class="{empty: !userInfo.signature}" @click="openSignature">
            {{signature}}</p>
        </li>
      </ul>
      <!-- 性别 -->
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
      <!-- 生日 -->
      <mt-datetime-picker
        ref="birth"
        type="date"
        v-model="defaultDate"
        @confirm="setBirth"
        :startDate="startDate"
        :endDate="endDate">
      </mt-datetime-picker>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Indicator} from 'mint-ui';
  import {mapState} from 'vuex';
  import {SET_USER_INFO, HIDDEN_FOOTER_BAR, SHOW_FOOTER_BAR} from "../../../store/mutation-types";

  export default {
    name: "Profile",
    data() {
      return {
        sheetVisible: false, // 控制性别菜单现实和隐藏
        actions: [
          {name: '男', method: this.selectSex},
          {name: '女', method: this.selectSex}
        ], // 性别菜单项数组
        defaultDate: '', // 默认显示日期
        startDate: new Date('1900-01-01'), // 日期的最小可选值
        endDate: new Date(), // 日期的最大可选值
      };
    },
    computed: {
      ...mapState(['userInfo']),
      phone() {
        if (this.userInfo.phone) {
          return this.userInfo.phone.slice(0, 3) + '****' + this.userInfo.phone.slice(-4);
        }
      },
      sex() {
        return this.userInfo.sex ? this.userInfo.sex : '未知';
      },
      address() {
        return this.userInfo.address ? this.userInfo.address : '未填写';
      },
      birth() {
        return this.userInfo.birth ? this.userInfo.birth : '未填写';
      },
      signature() {
        return this.userInfo.signature ? this.userInfo.signature : '未填写';
      },
    },
    methods: {
      selectSex(props) {
        this.putUserInfo({sex: props.name});
      },
      openAddress() {
        MessageBox.prompt('请输入常住地', {
          closeOnClickModal: false,
          inputValue: this.userInfo.address
        }).then(({value, action}) => {
          if (action === 'confirm') {
            this.putUserInfo({address: value});
          }
        });
      },
      openBirth() {
        this.$refs.birth.open();
      },
      setBirth(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month > 9 ? month : ('0' + month);
        day = day > 9 ? day : ('0' + day);
        let birth = `${year}-${month}-${day}`;
        this.putUserInfo({birth});
      },
      openSignature() {
        MessageBox.prompt('请输入个性签名', {
          closeOnClickModal: false,
          inputValue: this.userInfo.signature
        }).then(({value, action}) => {
          if (action === 'confirm') {
            this.putUserInfo({signature: value});
          }
        });
      },
      putUserInfo(userInfo) {
        Indicator.open('请求加载中...');
        this.$store.dispatch(SET_USER_INFO, userInfo).then(() => {
          Indicator.close();
        });
      },
    },
    beforeCreate() {
      this.$store.commit(HIDDEN_FOOTER_BAR);
    },
    created() {
      this.defaultDate = this.userInfo.birth ? this.userInfo.birth : new Date();
    },
    beforeRouteLeave(to, from, next) {
      this.$store.commit(SHOW_FOOTER_BAR);
      next();
    }
  }
</script>

<style scoped lang='scss'>
  .profile {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    overflow: hidden;
    background-color: #f5f5f5;
    z-index: 3;
  }
  .profile-wrap {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .title {
    height: 48px;
    line-height: 48px;
    margin-left: 12px;
    font-size: 16px;
    color: #58595b;
  }
  .list {
    background-color: #fff;
  }
  .item {
    padding: 0 12px;
    border-bottom: 1px solid #ededed;
    line-height: 44px;
    font-size: 16px;
    &:first-child {
      padding: 10px 12px;
    }
  }
  .img {
    float: right;
    width: 48px;
    height: 48px;
    border: 1px solid #ededed;
    border-radius: 50%;
  }
  .item-left {
    float: left;
    &.touxiang {
      line-height: 50px;
    }
  }
  .item-right {
    float: right;
    min-width: 50%;
    max-width: 70%;
    text-align: right;
    color: #58595b;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:before {
      float: right;
      margin-right: -4px;
      font-size: 20px;
      font-weight: 600;
      color: #b8b8b8;
    }
  }
  .empty {
    color: #9c9c9c;
  }
</style>
