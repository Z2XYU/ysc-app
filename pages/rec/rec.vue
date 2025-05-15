<template>
  <view class="content">
    <view class="top">
      <view class="top-left-box" @click="gotoForm">
        <view class="yp">我要约拍</view>
        <view class="fb">
          <text>游客点击发布</text>
          <uni-icons type="right" color="white" size="35rpx"></uni-icons>
        </view>
        <view class="image">
          <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/camera.png"></image>
        </view>
      </view>
      <view class="top-right-box" @click="GoToDelivery">
        <view class="rec">预约派送</view>
        <view class="submit">
          <text>定时定点配送服务</text>
          <uni-icons type="right" color="white" size="35rpx"></uni-icons>
        </view>
        <view class="image">
          <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/heart.png"></image>
        </view>
      </view>

    </view>

    <view class="central">推荐摄影师</view>

    <view class="bottom" >
      <view class="photographer-box" v-for="(item,i) in photographerList" :key='i' @click="gotoDetail"> 
        <view class="top">
          <view class="top-left">
            <image :src="item.avatarUrl" mode="widthFix"></image>
          </view>
          <view class="top-right">
            <view class="right-top">
              <view class="name">{{item.name}}</view>
              <view class="state">
                <text>{{item.state}}</text>
              </view>
            </view>
            <view class="right-bottom">
              <view class="gender">
                <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/man.png"
                  v-if="item.gender==='男'"></image>
                <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/women.png" v-else></image>
                <text>{{item.gender}}</text>
              </view>

              <view class="score">
                <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/star.png"></image>
                <text>{{item.score}}</text>
              </view>

              <view class="ordersNum">
                <text>总接单量：</text>
                <text>{{item.ordersNum}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="bottom">
          <image :src="item.artwork1Url" mode="widthFix"></image>
          <image :src="item.artwork2Url" mode="widthFix"></image>
          <image :src="item.artwork3Url" mode="widthFix"></image>
        </view>


      </view>
    </view>
  </view>

</template>

<script>
  export default {
    data() {
      return {
        authCamera: false, //用户是否运行授权拍照  
        hidden: true,
        Num: 1,

        photographerList: [{
            avatarUrl: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/avatar/8238594731bef3564d09345fcd93143.jpg',
            name: '生活的垃圾桶',
            gender: '女',
            state: '正常',
            score: '250分',
            ordersNum: 250,
            artwork1Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/203eee43f0a508f7559b7ee09460493.jpg',
            artwork2Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/6914e1d03fceb0c8f8fad6a30590255.jpg',
            artwork3Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/cbe3cfd61256774b868f7948f9ebbe2.jpg'
          },
          {
            avatarUrl: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/avatar/29a6288a279b85a7a9c020e2f6fc635.jpg',
            name: '钟栩',
            gender: '男',
            state: '正常',
            score: '5分',
            ordersNum: 255,
            artwork1Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/93f5296c1fadf3c6ba86abacc3a5a65.jpg',
            artwork2Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/b8776f2a75f4fa294c46b2ce4798273.jpg',
            artwork3Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/ce6aff08509609ea5e016437316d549.jpg'
          },
          {
            avatarUrl: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/avatar/92fb38b887a0046c4729abd1a7ecdf5.jpg',
            name: '拧巴富婆',
            gender: '女',
            state: '正常',
            score: '4.8分',
            ordersNum: 188,
            artwork1Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/839933f535b55c5bdb9bd26251aaf90.jpg',
            artwork2Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/c689f2b55979ed177eab12d424879f3.jpg',
            artwork3Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/daa0d0cca700169717c48df2c00674e.jpg'
          },
          {
            avatarUrl: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/avatar/be8981838a10220fb0084082dcfb91b.jpg',
            name: '别禁夜宵',
            gender: '女',
            state: '正常',
            score: '4.5分',
            ordersNum: 205,
            artwork1Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/485f1197505e31ff5500d3b57378281.jpg',
            artwork2Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/b2fef3ef5f77bac35b516b5e2f2a8d8.jpg',
            artwork3Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/b3235e3aa0e1cf0f094089945635491.jpg'
          },
          {
            avatarUrl: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/avatar/f95071be1d1314c8a54bd725061f1b5.jpg',
            name: '追浔',
            gender: '男',
            state: '暂停',
            score: '4.3分',
            ordersNum: 98,
            artwork1Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/4aeae304a76b2a6eb70f57fcc2dfa47.jpg',
            artwork2Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/5a2c395be3fbea45d05bd0b6ab2a560.jpg',
            artwork3Url: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/d2c6055b56d498d0e7003a2729dbbb0.jpg'
          },

        ],
        historyList: [],
        browseList: [],
        recContent: ''
      };
    },
    methods: {
      onLoad() {
        this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
        this.browseList = JSON.parse(uni.getStorageSync('browsingHistory') || '[]')
        // console.log(this.historyList)
      },
      handleCameraError() {
        uni.showToast({
          title: '用户拒绝使用摄像头',
          icon: 'none'
        })
      },
      gotoDetail(){
        uni.navigateTo({
          url:'/subpkg/photographer_detaill/photographer_detaill'
        })
      },
      gotoForm() {
        uni.navigateTo({
          url: '/subpkg/photograph/photograph'
        })
      },
      showLoading: function(event) {
        uni.showLoading({
          title: '匹配中...',
          mask: true
        });

        setTimeout(function() {
          uni.hideLoading();

          // 跳转到非Tabbar页面
          uni.navigateTo({
            url: '/pages/result/result'
          });
        }, 3000);
      },
      // showInputDialog() {
      //   uni.showModal({
      //     title: '智能推荐',
      //     content: '是否允许获取您的浏览和搜索记录',
      //     editable: false,
      //     placeholderText: '描述物品内容', //输入框提示内容
      //     confirmText: '确认',
      //     cancelText: '取消',
      //     success: (res) => {
      //       if (res.confirm) {
      //         console.log('输入的内容：', res.content);
      //         this.recContent = res.content
      //         this.gotoRecList()
      //       }
      //     }
      //   });
      // },
      GoToDelivery() {
        uni.navigateTo({
          url: '/subpkg/delivery/delivery'
        })
      },







    },




    onShow: function() {
      uni.getSetting({
        success: (res) => {
          console.log(res)
          if (res.authSetting["scope.camera"]) {

            this.authCamera = true

          } else {
            uni.authorize({
              scope: 'scope.camera',
              success(resSuccess) {
                // 同意授权

                this.authCamera = true

              },
              fail(resFail) {
                console.log("resFail: ", resFail);
                // 引导用户授权
                uni.showModal({
                  title: '授权',
                  content: '需要您授权获取摄像头权限',
                  success: function(res) {
                    if (res.confirm) {
                      uni.openSetting({
                        success(resOpenSetting) {
                          const authSetting = resOpenSetting.authSetting
                          if (authSetting && authSetting['scope.camera']) {

                            this.authCamera = true
                          } else {

                            this.authCamera = false

                            uni.showToast({
                              icon: 'none',
                              title: '您拒绝授权小程序获取摄像头权限',
                              duration: 1500
                            });
                          }
                        }
                      });
                    } else if (res.cancel) {
                      uni.showToast({
                        icon: 'none',
                        title: '您拒绝授权小程序获取摄像头权限',
                        duration: 1500
                      });
                    }
                  }
                });
              }
            });


          }
        }
      });

    },

  };
</script>


<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;

    .top {
      margin-left: 25rpx;
      margin-top: 20rpx;
      display: flex;
      width: 700rpx;
      background-color: #ffffff;
      border-radius: 10rpx;

      .top-left-box {
        display: flex;
        flex-direction: column;
        margin: 20rpx 10rpx;
        background-color: #ffd3d4;
        height: 340rpx;
        width: 340rpx;
        border-radius: 20rpx;
        text-align: center;

        .yp {
          margin-top: 30rpx;
          font-size: 40rpx;
          word-spacing: 20rpx;
          font-weight: bold;
        }

        .fb {
          display: flex;
          margin: 10rpx 0;
          height: 50rpx;
          width: 250rpx;
          border-radius: 20rpx;
          background-color: #ff9898;
          align-self: center;
          justify-content: center;

          text {
            margin-top: 5rpx;
            font-size: 25rpx;
            color: aliceblue;
          }
        }

        .image {
          width: 150rpx;
          height: 150rpx;
          margin: 20rpx 0;
          border-radius: 75rpx;
          background-color: #ffe1e3;
          align-self: center;
          display: flex;
          justify-content: center;
          align-items: center;

          image {
            height: 80rpx;
            width: 80rpx;
            border-radius: 40rpx;
            align-self: center;
          }
        }
      }

      .top-right-box {
        display: flex;
        flex-direction: column;
        margin: 20rpx 10rpx;
        background-color: #cfe9ff;
        height: 340rpx;
        width: 340rpx;
        border-radius: 20rpx;
        text-align: center;

        .rec {
          margin-top: 30rpx;
          font-size: 40rpx;
          word-spacing: 20rpx;
          font-weight: bold;
        }

        .submit {
          display: flex;
          margin: 10rpx 0;
          height: 50rpx;
          width: 250rpx;
          border-radius: 20rpx;
          background-color: #8dc7f6;
          align-self: center;
          justify-content: center;

          text {
            margin-top: 5rpx;
            font-size: 25rpx;
            color: aliceblue;
          }
        }

        .image {
          width: 150rpx;
          height: 150rpx;
          margin: 20rpx 0;
          border-radius: 75rpx;
          background-color: #dcf0ff;
          align-self: center;
          display: flex;
          justify-content: center;
          align-items: center;

          image {
            height: 80rpx;
            width: 80rpx;
            border-radius: 40rpx;
            align-self: center;
          }
        }
      }
    }

    .central {
      margin: 20rpx 0;
      align-self: center;
      font-weight: bold;

      text {
        font-size: 50rpx;
      }
    }

    .bottom {
      .photographer-box {
        display: flex;
        flex-direction: column;
        margin-bottom: 20rpx;

        .top {
          display: flex;

          .top-left {
            margin: 20rpx 20rpx;

            image {
              width: 100rpx;
              // height: 100rpx;
              border-radius: 50rpx;
            }
          }

          .top-right {
            display: flex;
            flex-direction: column;

            .right-top {
              display: flex;
              margin: 20rpx 20rpx;

              .state {
                width: 80rpx;
                height: 40rpx;
                border-radius: 10rpx;
                background-color: #ff9898;
                margin-left: 30rpx;
                font-size: 30rpx;
                text-align: center;

                text {
                  color: #ffffff;
                }
              }
            }

            .right-bottom {
              display: flex;

              .gender {
                margin: 0 20rpx;
                align-items: center;
                justify-items: center;

                image {
                  width: 25rpx;
                  height: 25rpx;
                }

                text {
                  font-size: 28rpx;
                }
              }

              .score {
                align-items: center;
                justify-items: center;
                margin: 0 20rpx;

                image {
                  width: 25rpx;
                  height: 25rpx;
                }

                text {
                  font-size: 28rpx;
                }
              }

              .ordersNum {
                margin: 0 20rpx;
                align-items: center;
                justify-items: center;
                font-size: 28rpx;
                color: #ffa494;
              }
            }
          }
        }

        .bottom {
          margin: 0 25rpx;
          background-color: #ffffff;

          image {
            width: 220rpx;
            margin: 0 7rpx;
            border-radius: 10rpx;
          }
        }
      }
    }

  }
</style>