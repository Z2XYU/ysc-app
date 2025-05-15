<template>
  <view class="my">
    <view class="userinfo-container">

      <view class="userinfo" v-if="!loginState">
        <image src="https://ynusc-proj.oss-cn-beijing.aliyuncs.com/%E7%94%A8%E6%88%B7.png"></image>
        <text @click="gotoLogin">点击登录</text>
      </view>
      <view class="userinfo" v-else @click="gotoUserInfo">
        <image :src="userInfo.avatar"></image>
        <!-- <image src="https://znzf.oss-cn-beijing.aliyuncs.com/avatar/zwz.jpg"></image> -->
        <text>{{userInfo.name}}</text>
      </view>

      <view class="dy">
        <text>订阅者</text>
        <view class="logout" @click="logout">
          <uni-icons type="closeempty" size="15px"></uni-icons>
          <text>退出登录</text>
        </view>
      </view>
    </view>

    <view class="recording-container">
      <view class="title">
        <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/recording.png"></image>
        <text>我的记录</text>
      </view>

      <view class="nav">
        <view class="nav-item">
          <uni-icons type="eye" size="30px" color="#98ff98"></uni-icons>
          <text>浏览记录</text>
        </view>

        <view class="nav-item">
          <uni-icons type="chatbubble-filled" size="30px" color="#f5b041 "></uni-icons>
          <text>我的评论</text>
        </view>

        <view class="nav-item">
          <uni-icons type="heart-filled" size="30px" color="#5dade2"></uni-icons>
          <text>点赞记录</text>
        </view>
      </view>

    </view>

    <view class="func-container">
      <view class="shop-item" @click="gotoMyShop">
        <view class="item-name">
          <uni-icons type="shop" size="40rpx"></uni-icons>
          <text>我的店铺</text>
        </view>
        <view class="item-func">
          <uni-icons type="right" size="35rpx"></uni-icons>
        </view>
      </view>
      <view class="divider"></view>
      <view class="setting-item" @click="gotoSetting">
        <view class="item-name">
          <uni-icons type="gear" size="40rpx"></uni-icons>
          <text>设置</text>
        </view>
        <view class="item-func">
          <uni-icons type="right" size="35rpx"></uni-icons>
        </view>
      </view>
      
      
    </view>


  </view>
</template>
<script>
  import {
    computed
  } from "vue";
  import {
    mapState,
    mapMutations
  } from 'vuex';
  export default {
    data() {
      return {
        nickname: '微信用户',
        avatar: 'https://ynusc-proj.oss-cn-beijing.aliyuncs.com/%E7%94%A8%E6%88%B7.png',
        
        userInfo:''
      }
    },
    
    onLoad() {
      // console.log(this.avatar)
      this.userInfo=uni.getStorageSync('userInfo')
      // console.log(this.userInfo)
    },
    
    onShow(){
      this.userInfo=uni.getStorageSync('userInfo')
    },
    

    computed: {
      ...mapState('m_user', ['loginState'])
    },
    methods: {
      ...mapMutations('m_user', ['updateLoginState','removeUserInfoStorage']),
      
      
      wxLogin(){
        uni.getUserProfile({
          desc:'登录的数据',
          success(ures){
            console.log(ures,'返回的用户信息')
            uni.login({
              success(lres){
                console.log(lres,'请求微信登录返回的数据')
              }
            })
          }
        })
      },
      gotoLogin() {
        uni.navigateTo({
          url: '/subpkg/login/login'
        });
      },
      async logout() {
        if (!this.loginState) {
          const [err, succ] = await uni.showModal({
            title: '提示',
            content: '请先登录后再操作'
          }).catch(err => err)
          if (succ && succ.confirm) {
            this.gotoLogin()
          }
          return
        }
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？'
        }).catch(err => err)
        if (succ && succ.confirm) {
          // this.removeLoginState()
          this.updateLoginState(false)
          this.removeUserInfoStorage()
          uni.removeStorageSync('token')
        }
        // 假设 authToken 存储在 localStorage 或 uni-storage 中
        let authToken = uni.getStorageSync('token'); // 获取 token
        
        uni.$http.post('/user/logout')
        .then(response => {
            // 处理注销后的逻辑，例如跳转到登录页
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
      },
      gotoMyShop() {
          if (!this.userInfo.shopId || this.userInfo.shopId === 0) {
              // 如果 shopId 不存在或为 0，弹出注册确认窗口
              uni.showModal({
                  title: '提示',
                  content: '您还未注册店铺，是否立即注册？',
                  confirmText: '去注册',
                  cancelText: '取消',
                  success: (res) => {
                      if (res.confirm) {
                          // 用户点击了“去注册”
                          uni.navigateTo({
                              url: '/subpkg/register/register'
                          });
                      } else if (res.cancel) {
                          // 用户点击了“取消”
                          console.log('用户取消注册');
                      }
                  }
              });
          } else {
              // shopId 存在，正常跳转到设置页面
              uni.navigateTo({
                  url: '/subpkg/shop_detail/shop_detail?shopId='+this.userInfo.shopId
              });
          }
      },

      gotoSetting() {
        uni.navigateTo({
          url: '/subpkg/setting/setting',
        });
      },
      gotoUserInfo(){
        uni.navigateTo({
          url:'/subpkg/user_detail/user_detail'
        });
      },
      setAvatarUrl(url){
        this.avatar=url
      }
    }
  }
</script>
<style lang="scss">
  .my {
    background-image: url(https://ynusc-proj.oss-cn-beijing.aliyuncs.com/back-img%20%282%29.jpg);
    background-size: 100% 1500rpx;

    padding-left: 2%;
    width:100%;
    height: 1500rpx;
    display: flex;
    flex-direction: column;

    .userinfo-container {
      opacity: 0.9;
      margin-top: 300rpx;
      display: flex;
      flex-direction: column;
      width: 96%;
      height: 250rpx;
      background-color: white;
      border-radius: 10px;

      .userinfo {
        display: flex;
        flex-direction: column;
        align-items: left;
        padding: 10px 10px;

        image {
          width: 170rpx;
          height: 170rpx;
          border-radius: 85rpx;
          position: absolute;
          transform: translate(10%, -60%);
        }

        text {
          padding-top: 90rpx;
          padding-left: 40rpx;
          font-size: 40rpx
        }
      }

      .dy {
        display: flex;
        justify-content: space-between;
        // margin-bottom: 10px;
        padding: 0% 30rpx;

        text {
          font-size: 25rpx;
          color: gray;
        }
      }
    }

    .recording-container {
      opacity: 0.9;
      display: flex;
      flex-direction: column;
      width: 96%;
      background-color: white;
      border-radius: 10px;
      margin-top: 15rpx;

      .title {
        display: flex;
        padding-top: 20rpx;
        margin-left: 10rpx;
        align-items: center;
        image {
          width: 50rpx;
          height: 50rpx;
          border-radius: 25rpx;
        }
        text {
          font-size: 37rpx;
          font-weight: 600;
        }
      }

      .nav {
        display: flex;
        justify-content: center;

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-items: center;
          margin: 40rpx 40rpx;

          text {
            font-size: 30rpx;
            color: gray;
          }
        }
      }
    }

    .func-container {
      opacity: 0.9;
      width: 96%;
      background-color: white;
      border-radius: 10px;
      margin-top: 15rpx;
      align-content: center;
      
      .setting-item {
        display: flex;
        margin: 13px 10px;

        align-content: center;
        justify-content: space-between;


        .item-name {
          display: flex;
          margin-left: 10rpx;
        }
      }
      .divider {
          width: 100%;
          height: 0.5px;
          background: gray;
          border: none;
          opacity: 0.5;
      }
      
      .shop-item {
        display: flex;
        margin: 13px 10px;
      
        align-content: center;
        justify-content: space-between;
      
      
        .item-name {
          display: flex;
          margin-left: 10rpx;
        }
      }
    }
  }
</style>