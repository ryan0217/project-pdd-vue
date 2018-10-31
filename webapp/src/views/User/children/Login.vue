<template>
  <div class="login">
    <div class="container" :class="containerClass">
      <h2 class="title">选择登录方式</h2>
      <div class="type" @click="isShow=true">
        <span class="button iconfont icon-shouji1">手机登录</span>
      </div>
    </div>
    <img :src="userBaseImages.loginFooter" alt="">
    <div class="view" :class="viewClass"
         :style="{background: `#f4f4f4 url(${userBaseImages.loginFooter}) center 40px no-repeat`}">
      <div class="tab">
        <p :class="{active: smsIsActive}" @click="changeType('sms')">短信登录</p>
        <p :class="{active: !smsIsActive}" @click="changeType('pwd')">密码登录</p>
      </div>
      <div class="input">
        <div class="tel iconfont icon-shouji2">
          <input type="number" placeholder="手机号" v-model="phone" @input="clearPhoneErrTip">
        </div>
        <div class="sms iconfont icon-mima" v-if="type==='sms'">
          <input type="text" placeholder="验证码" v-model="sms" @input="clearPhoneSmsErrTip">
          <button v-if="!timing" :class="phoneErr" @click="sendSms">{{sendMsg}}</button>
          <button v-else class="send" disabled="disabled">已发送 ({{timing}})</button>
        </div>
        <div class="password iconfont icon-mima" v-else>
          <input :type="passwordType" placeholder="密码" v-model="password" @input="clearPasswordErrTip">
          <i class="iconfont icon-xianshimima" v-show="passwordType==='password'" @click="togglePasswordType"></i>
          <i class="iconfont icon-yincangmima" v-show="passwordType==='text'" @click="togglePasswordType"></i>
        </div>
      </div>
      <div class="errTip" v-show="errTip">{{errTip}}</div>
      <div class="tip">
        温馨提示：未注册的手机号，登录时将自动注册，且代表已同意
        <span>服务协议与隐私政策</span>
      </div>
      <div class="handle">
        <p class="btn-login" @click="doLogin">登录</p>
        <p class="btn-back" @click="back">返回</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {Indicator, Toast} from 'mint-ui';
  import {mapState} from 'vuex';
  import {HIDDEN_FOOTER_BAR, GET_USER_BASE_IMAGES, SHOW_FOOTER_BAR, SET_USER_INFO} from "../../../store/mutation-types";
  import {getPhoneSms, postUserLogin} from "../../../api";

  export default {
    name: "Login",
    data() {
      return {
        isShow: false, // 是否显示登录界面
        type: 'sms', // 登录类型，可取值为：sms pwd
        phone: '', // 手机号
        sms: '', // 手机验证码
        password: '', // 密码
        passwordType: 'password', // 密码框类型，可取值为：password text
        hasSendSms: false, // 是否发送过验证码
        timerId: 0, // 定时器ID
        timing: 0, // 倒计时
        errTip: '', // 错误提示
        toastInstance: '', // 消息框实例
        userInfo: {}, // 用户信息
      };
    },
    computed: {
      ...mapState(['userBaseImages']),
      containerClass() {
        return this.isShow ? 'containerHidden' : 'containerShow';
      },
      viewClass() {
        return this.isShow ? 'viewShow' : 'viewHidden';
      },
      smsIsActive() {
        return this.type === 'sms';
      },
      checkPhone() {
        this.hasSendSms = false;
        return /^1[34578]\d{9}$/.test(this.phone);
      },
      phoneErr() {
        return this.checkPhone ? '' : 'phone-err';
      },
      sendMsg() {
        return this.hasSendSms ? '重新发送' : '发送验证码';
      }
    },
    methods: {
      back() {
        this.isShow = this.hasSendSms = false;
        this.type = 'sms';
        this.passwordType = 'password';
        if (this.timing) clearInterval(this.timerId);
        this.timerId = this.timing = 0;
        this.phone = this.sms = this.password = this.errTip = '';
      },
      changeType(type) {
        if (type !== this.type) {
          this.type = type;
          this.sms = this.password = '';
          this.passwordType = 'password';
          this.errTip = this.errTip === '请填写正确的手机号' ? this.errTip : '';
        }
      },
      togglePasswordType() {
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
      },
      async sendSms() {
        if (this.checkPhone) {
          this.hasSendSms = true;
          Indicator.open('获取验证码中...');
          this.timing = 30;
          this.timerId = setInterval(() => {
            this.timing -= 1;
            if (!this.timing) {
              clearInterval(this.timerId);
            }
          }, 1000);
          let result = await getPhoneSms(this.phone);
          setTimeout(() => {
            this.sms = result.msg;
            Indicator.close();
            this.toastInstance = Toast({
              message: '获取验证码成功',
              position: 'bottom',
              duration: 2000
            });
          }, 1000);
        }
      },
      clearPhoneErrTip() {
        if (this.checkPhone) {
          this.errTip = this.errTip === '请填写正确的手机号' ? '' : this.errTip;
        }
      },
      clearPhoneSmsErrTip() {
        this.errTip = this.errTip === '请输入验证码' ? '' : this.errTip;
      },
      clearPasswordErrTip() {
        this.errTip = this.errTip === '请输入密码' ? '' : this.errTip;
      },
      async doLogin() {
        if (!this.checkPhone) {
          return this.errTip = '请填写正确的手机号';
        }
        if (this.type === 'sms' && !this.sms.trim()) { // 验证码登录
          return this.errTip = '请输入验证码';
        }
        if (this.type === 'pwd' && !this.password.trim()) { // 密码登录
          return this.errTip = '请输入密码';
        }
        let userInfo = {
          type: this.type,
          phone: this.phone,
          phoneSms: this.sms,
          password: this.password
        };
        // 清空错误提示后发送登录请求
        this.errTip = '';
        let result = await postUserLogin(userInfo);
        if (!result.status) {
          this.toastInstance && this.toastInstance.close();
          this.toastInstance = Toast({
            message: result.msg,
            position: 'bottom',
            duration: 2000
          });
          this.sms = '';
        } else {
          this.userInfo = result.msg;
          this.$store.commit(SET_USER_INFO, result.msg);
          this.toastInstance && this.toastInstance.close();
          this.toastInstance = Toast({
            message: `欢迎登录，${result.msg.username}`,
            position: 'bottom',
            duration: 2000
          });
          this.$router.replace('/user/personal');
        }
      },
    },
    beforeCreate() {
      // if (JSON.stringify(this.$store.state.userInfo) !== '{}') return this.$router.replace('/user/personal');
      this.$store.commit(HIDDEN_FOOTER_BAR);
      this.$store.dispatch(GET_USER_BASE_IMAGES);
    },
    beforeRouteLeave(to, from, next) {
      this.$store.commit(SHOW_FOOTER_BAR);
      next();
    }
  }
</script>

<style scoped lang='scss'>
  .login {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    text-align: center;
    background: #f4f4f4;
    overflow: hidden;
    z-index: 3;
  }
  .container {
    position: absolute;
    top: 26%;
    width: 295px;
    margin: auto;
  }
  img {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 60px;
    margin: auto;
    width: 140px;
  }
  .containerShow {
    opacity: 1 !important;
    transition: all .3s ease-out;
  }
  .containerHidden {
    opacity: 0 !important;
    transition: all .3s ease-out;
  }
  .title {
    font-size: 19px;
    font-weight: 100;
    margin-bottom: 46px;
  }
  .type {
    height: 45px;
    background-color: rgb(246, 166, 34);
    border-radius: 5px;
  }
  .button {
    line-height: 42px;
    letter-spacing: 2px;
    font-size: 15px;
    color: #fff;
    &:before {
      position: relative;
      top: 2px;
      right: 4px;
      font-size: 20px;
    }
  }
  .viewShow {
    transform: translateY(0) !important;
    transition: all .3s ease-out;
  }
  .viewHidden {
    transform: translateY(100%) !important;
    transition: all .3s ease-out;
  }
  .view {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-top: 120px;
    transform: translateY(100%);
    background-color: #fff;
    z-index: 4;
    background-size: 140px !important;
  }
  .tab {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    margin: 0 100px;
    height: 40px;
    line-height: 40px;
    color: #767676;
    p {
      box-sizing: border-box;
      /*width: 50%;*/
      padding: 4px 0;
      margin: 0 10px;
      font-size: 16px;
      &.active {
        color: #e02e24 !important;
        border-bottom: 2px solid #e02e24;
      }
    }
  }
  .input {
    margin-top: 14px;
    text-align: left;
    color: #767676;
    background-color: #fff;
  }
  input {
    width: 60%;
    height: 30px;
    padding: 4px 0;
    margin-left: 18px;
    border: none;
    outline: none;
    font-size: 16px;
    color: #4a4a4a;
  }
  .tel, .sms, .password {
    box-sizing: border-box;
    width: 100%;
    height: 46px;
    padding: 3px 8px;
    border-bottom: 1px solid #F4F5F5;
    &:before {
      position: relative;
      top: 3px;
      font-size: 24px;
      color: #e1e1e1;
    }
  }
  .sms {
    input {
      width: 40%;
    }
    button {
      float: right;
      margin-top: 3px;
      margin-right: 2%;
      width: 94px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #e02e24;
      background-color: #fff;
      border: 1px solid #e02e24;
      border-radius: 3px;
      text-align: center;
      &.phone-err, &.send {
        color: #c3c3c3;
        border: 1px solid #c3c3c3;
      }
    }
  }
  .password .iconfont {
    float: right;
    font-size: 20px;
    margin-top: 10px;
    padding-right: 4px;
  }
  .sms-image {
    position: absolute;
    right: 4px;
    width: 120px;
    height: 38px;
  }
  .tip, .errTip {
    margin: 10px 14px 14px;
    line-height: 18px;
    font-size: 14px;
    text-align: left;
    color: #58595b;
    span {
      color: #5b9ce7;
    }
  }
  .errTip {
    margin-bottom: -4px;
    color: red;
  }
  .handle {
    width: 100%;
  }
  .btn-login, .btn-back {
    box-sizing: border-box;
    width: 93%;
    height: 46px;
    line-height: 46px;
    margin: 0 auto 10px;
    text-align: center;
    font-size: 15px;
    border-radius: 4px;
  }
  .btn-login {
    color: #fff;
    background-color: #de3025;
  }
  .btn-back {
    color: #de3025;
    background-color: #fff;
    border: 1px solid #de3025;
  }
</style>
