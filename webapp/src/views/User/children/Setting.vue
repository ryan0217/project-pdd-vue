<template>
  <div class="setting">
    <div class="setting-wrap">
      <ul class="list">
        <li class="item iconfont icon-you" @click="showToast('免密支付设置')"><span>免密支付设置</span></li>
        <li class="item iconfont icon-you" @click="showToast('免拼卡设置')"><span>免拼卡设置</span></li>
        <li class="item iconfont icon-you" @click="showToast('消息接收设置')"><span>消息接收设置</span></li>
      </ul>
      <ul class="list">
        <li class="item iconfont icon-you" @click="showToast('常见问题')"><span>常见问题</span></li>
        <li class="item iconfont icon-you" @click="showToast('意见反馈')"><span>意见反馈</span></li>
      </ul>
      <ul class="list">
        <li class="item iconfont icon-you" @click="showToast('商家免费入住')"><span>商家免费入住</span></li>
      </ul>
      <div class="logout" @click="logout">退出登录</div>
      <div class="server">服务协议与隐私政策</div>
    </div>
  </div>
</template>

<script>
  import {Toast, MessageBox} from 'mint-ui';
  import {HIDDEN_FOOTER_BAR, SHOW_FOOTER_BAR, CLEAR_USER_INFO} from "../../../store/mutation-types";
  import {getUserLogout} from "../../../api";

  export default {
    name: "Setting",
    data() {
      return {
        toastInstance: ''
      };
    },
    methods: {
      showToast(content) {
        this.toastInstance && this.toastInstance.close();
        this.toastInstance = Toast({
          message: `${content}还未实现`,
          position: 'bottom',
          duration: 2000
        });
      },
      logout() {
        MessageBox.confirm('确定退出登录吗？').then(async (action) => {
          if (action === 'confirm') {
            this.$store.commit(CLEAR_USER_INFO);
            let result = await getUserLogout();
            this.toastInstance && this.toastInstance.close();
            this.toastInstance = Toast({
              message: result.msg,
              position: 'bottom',
              duration: 2000
            });
            this.$router.replace('/home/hot');
          }
        });
      }
    },
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
  .setting {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-top: 12px;
    margin: auto;
    overflow: hidden;
  }
  .setting-wrap {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .list {
    position: relative;
    margin-bottom: 8px;
    background-color: #fff;
  }
  .item {
    display: flex;
    align-items: center;
    height: 44px;
    margin-left: 24px;
    border-bottom: 1px solid #ededed;
    &:before {
      position: absolute;
      right: 4px;
      font-size: 20px;
      font-weight: 600;
      color: #b8b8b8;
    }
    span {
      display: inline-block;
      padding-top: 2px;
      font-size: 15px;
      color: #151516;
    }
  }
  .logout {
    text-align: center;
    line-height: 46px;
    margin-top: 12px;
    font-size: 15px;
    color: #58595b;
    background-color: #fff;
  }
  .server {
    position: fixed;
    bottom: 28px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #5b9ce7;
  }
</style>
