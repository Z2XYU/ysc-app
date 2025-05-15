<template>
  <div class="wrapper">
    <!-- 第一部分 -->
    <div v-if="islogin === 1">
      <div class="header">
        <div class="title">请登录</div>
        <div class="info">Please Login Your Account</div>
      </div>
    </div>
    <!-- 找回密码 -->
    <div v-else-if="islogin === 2">
      <div class="header">
        <div class="title">找回密码</div>
        <div class="info">Retrieve the password</div>
      </div>
    </div>
    <!-- 请注册 -->
    <div v-else-if="islogin === 3">
      <div class="header">
        <div class="title">请注册</div>
        <div class="info">Please Register Your Account</div>
      </div>
    </div>
    <!-- 第二部分 -->
    <div class="body">
      <!-- 登录页面 -->
      <div v-if="islogin === 1">
        <div class="input1">
          <input class="one" type="number" @input="inputiphone1" maxlength="11" placeholder="请输入账号"
            v-model="strloginUser" />
          <input class="one" password="true" @input="password1" placeholder="请输入密码" v-model="strloginpassword" />
        </div>
        <div class="remenber">
          <switch type="checkbox" :checked="switchChecked" @change="bindswitchchange" style="transform:scale(0.8)" />
          记住密码
        </div>

        <button class="two" color="#3d7ef9" type="primary" @click="onlogin" :disabled="loginbtnstate">登录</button>
      </div>
      <!-- 找回密码 -->
      <div v-else-if="islogin === 2">
        <div class="input1">
          <input class="one" type="number" @input="compass" maxlength="11" placeholder="请输入账号" />
        </div>
        <button class="two" color="#3d7ef9" type="primary" @click="comebackpassword"
          :disabled="loginbtnstate1">找回密码</button>
      </div>
      <!-- 注册页面 -->
      <div v-else-if="islogin === 3">
        <form @submit="formsubmit">
          <div class="input1">
            <input class="one" type="number" @input="inputiphone2" maxlength="11" placeholder="请输入账号" name="iphone" />
            <input class="one" password="true" @input="password2" placeholder="请输入密码" name="inputpassword" />
          </div>
          <button class="two" color="#3d7ef9" type="primary" form-type="submit" :disabled="loginbtnstate2">注册</button>
        </form>
      </div>
      <!-- 第三部分 -->
      <!-- 登录 -->
      <div v-if="islogin === 1">
        <div class="end">
          <text @click="register">注册账户</text>
          <text>|</text>
          <text @click="forget">忘记密码</text>
        </div>
      </div>
      <!-- 找回密码 -->
      <div v-else-if="islogin === 2">
        <div class="end">
          <text @click="denglu">登录页面</text>
        </div>
      </div>
      <!-- 注册 -->
      <div v-else-if="islogin === 3">
        <div class="end">
          <text @click="denglu">登录页面</text>
        </div>
      </div>

      <div class="end-power">
        <div class="power">
          <text>Welcome to Luoyang !</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var that
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import user from '../../store/user';
  export default {
    created() {
      that = this
    },
    data() {
      return {
        // ip: '82.157.11.188',
        // port: 8080,
        password: '',
        islogin: 1,
        inputipone: '', //注册时时输入的手机号
        compassiphone: '', //找回密码时输入的手机号
        loginbtnstate: true, //登录按钮状态
        loginbtnstate1: true, //找回密码按钮状态
        loginbtnstate2: true, //注册按钮状态
        strloginUser: '', //登录用户名
        strloginpassword: '', //用户密码
        switchChecked: '', //选中按钮
        user: {
          account: '',
          password: '',
          
        },
        token:''

      }

    },
    onLoad() {
      this.strloginUser = uni.getStorageSync("iphone"),
        this.strloginpassword = uni.getStorageSync("password"),
        this.switchChecked = uni.getStorageSync('checkedValue'),
        this.loginbtnstate = uni.getStorageSync('wxlogin')
      console.log(this.strloginUser + this.strloginpassword + this.switchChecked)
    },
    computed: {
      ...mapState('m_user', ['loginState'])
    },

    methods: {

      ...mapMutations('m_user', ['updateLoginState','updateUserInfo','removeLoginState']),
      //判断是否要记住密码
      bindswitchchange: function(event) {
        //得到值
        var checkedValue = event.detail.value;
        console.log("开关状态" + checkedValue);
        if (checkedValue === true) {
          this.switchChecked = true,
            console.log(checkedValue);
        } else if (checkedValue === false) {

          this.switchChecked = false
          // uni.setStorageSync("iphone","");
          // uni.setStorageSync("password","");
        }
      },

      //输入密码（登录界面判断有无）
      password1: function(event) {
        var m = event.detail.value
        // console.log(event.detail.value)
        if (m !== '') {
          this.strloginpassword = m
          if (this.strloginUser !== '' && (this.strloginUser.length === 11)) {
            this.loginbtnstate = false
          } else {
            this.loginbtnstate = true
          }
        } else {
          this.loginbtnstate = true
          password: ''
        }
      },
      //输入手机号（登录界面判断有无）
      inputiphone1: function(event) {
        // console.log(event.detail.value)
        var m = event.detail.value
        if (m !== '' && (m.length === 11)) {
          this.strloginUser = m
          if (this.strloginpassword !== '') {
            this.loginbtnstate = false
          } else {
            this.loginbtnstate = true
          }
        } else {
          this.loginbtnstate = true
        }
      },

      //登录
      async onlogin() {
        this.user.account = this.strloginUser
        this.user.password = this.strloginpassword
        const{data:res} = await uni.$http.post('/user/login',this.user)
        console.log(res.data)

        if (res.code===1) {
          
          uni.showToast({
            title: '登录成功',
            duration: 2000,
          });
          this.token=res.data
          uni.setStorageSync('token',this.token)
          
          
          const {data: res2}=await uni.$http.get('/user/userinfo?account='+this.user.account+'&password='+this.user.password)
          
          console.log(res2.data)
          this.updateUserInfo(res2.data)
          this.updateLoginState(true)
          // uni.setStorageSync("loginstate",true)
          uni.reLaunch({
            url: '/pages/my/my',
          });
        } else {
          uni.showToast({
              title: '用户名或密码错误',
              icon: 'error',
              duration: 2000
            });

        }
      },
      //输入密码（注册界面判断有无）
      password2: function(event) {
        // console.log(event.detail.value)
        var m = event.detail.value

        
        if (m !== '') {
          this.password = m
          if (this.inputipone !== '' && (this.inputipone.length === 11)) {
            this.loginbtnstate2 = false
          } else {
            this.loginbtnstate2 = true
          }
        } else {
          this.loginbtnstate2 = true
          pasord: ''
        }
      },
      //输入手机号（注册界面判断有无）
      inputiphone2: function(event) {
        // const userinfos = uni.getStorageSync('userjobs') || []; //找数组
        const m = event.detail.value;
        if (m !== '' && m.length === 11) {
          this.inputipone = m;

          
          this.loginbtnstate2 = false;
        } else {
          this.loginbtnstate2 = true;
          this.inputipone = '';
        }
      },


      //找回密码输入框
      compass: function(event) {
        console.log("找回密码" + event.detail.value)
        var m = event.detail.value
        if (m !== '' && (m.length === 11)) {
          this.compassiphone = m,
            this.loginbtnstate1 = false
        } else {
          this.loginbtnstate1 = true,
            this.inputipone = ''
        }
      },
      //注册
       async formsubmit() {
        this.user.account = this.inputipone
        this.user.password = this.password
        
        // console.log(this.user.account)
        // const {data:res} =await uni.$http.get('/user/check',{account:this.inputipone})
        const {data:res} =await uni.$http.get('/user/check',this.user)
        if(res.code!==1) return uni.$showMsg()
        
        let isR= res.data
        console.log(isR)
        if(isR === 'true'){
          uni.showToast({
            icon:'error',
            title: '账号已被注册',
            duration: 1000,
            success: function() {
              this.islogin = 3
              this.password = ''
              this.inputipone = ''
              this.loginbtnstate2 = true
            }
          })
        }
        else{
          uni.$http.post('/user/register', this.user)
          uni.showToast({
            title: '注册成功',
            duration: 1000,
            success: function() {
              this.password = ''
              this.inputipone = ''
              this.loginbtnstate2 = true
            }
          })
          this.islogin = 1
        }


      },
      
      
      


      //找回密码
      comebackpassword: function(e) {
        const wsy = uni.getStorageSync('userjobs') || []; //找数组
        // console.log("输入的手机号" + this.compassiphone);
        // console.log("本地缓存的手机号" + wsy.iphone);

        if (wsy.iphone === this.compassiphone) {
          uni.setClipboardData({
            data: wsy.password,
            success: () => {
              console.log('密码已复制');
              this.islogin = 1;
              this.loginbtnstate1 = true;
              uni.showToast({
                title: '密码已复制',
                duration: 2000
              });
            }
          });
        } else {
          uni.showToast({
            title: '该账号未注册',
            duration: 2000
          });
        }
      },


      //转到注册
      register: function(event) {
        this.islogin = 3
      },
      //转到登录
      denglu: function(event) {
        this.islogin = 1
      },
      //转到忘记密码
      forget: function(event) {
        this.islogin = 2
      }
    }
  }
</script>
<style>
  /* pages/login/login.wxss */
  page {
    background: linear-gradient(#f8e2ba, white, #f8e2ba);

  }

  .header {
    height: 200rpx;
    padding: 40rpx 30rpx;
    display: flex;
    flex-direction: column;
    /* background: linear-gradient(#f0bf64,white,#f5ae2b); */
    color: rgb(180, 146, 101);
  }

  .title {
    font-size: 52rpx;
    font-weight: 700;
    padding: 20rpx;
  }

  .header .info {
    font-size: 28rpx;
    padding: 20rpx;
  }

  .body {
    padding: 40rpx;
  }

  .input {
    margin-top: 20rpx;

  }

  .one {
    height: 100rpx;
    margin-top: 20rpx;
    box-shadow: #77778a 0 0 5rpx;
    border-radius: 10rpx;
  }

  .two {
    border: solid 1rpx #73ccd8;
    margin-top: 40rpx;
    width: 100%;
    background-color: #73ccd8;
    border-radius: 40rpx;
  }

  .end {
    display: flex;
    justify-content: center;
    margin-top: 40rpx;
    color: #9f9f9f;
  }

  .end text {
    margin-left: 30rpx;
  }

  .end-power {
    display: flex;
    justify-content: center;
  }

  .power {
    color: rgb(180, 146, 101);
    position: fixed;
    bottom: 50rpx;

  }

  .remenber {
    margin-top: 20rpx;
  }
</style>