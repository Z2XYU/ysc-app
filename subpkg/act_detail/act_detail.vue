<template>
  <view class="container">
    <view>
      <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/background.jpg" class="background">
      </image>
    </view>
    <view class="container-top">
      <view class="top-left">
        <image :src="actInfo.actImage" mode="widthFix"></image>
      </view>
      <view class="top-right">
        <view class="title">
          <text>{{actInfo.actName}}</text>
        </view>
        
        <view class="address">
          <uni-icons type="location" size="25rpx"></uni-icons>
          <text>{{actInfo.actAddress}}</text>
        </view>
        
        <view class="date">
          <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/time4.png" mode="widthFix"></image>
          <text>{{actInfo.actTime}}</text>
        </view>
      </view>
    </view>
    
    <view class="container-middle">
      <view class="top">
        <view class="participation">
          <view class="l1">
            <view class="num">200</view>
            <view class="title">可参与人数</view>
          </view>
          <view class="l2">
            <view class="num">101</view>
            <view class="title">已报名</view>
          </view>
        </view>
      </view>
      <view class="middle">
        <view class="description">
          <view class="registration_date">
            <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/concentric_circles.png" mode="widthFix"></image>
            <text>报名时间</text>
          </view>
          <view class="activity_date">
            <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/concentric_circles.png" mode="widthFix"></image>
            <text>活动时间</text>
          </view>
        </view>
        <view class="dates">
          <view class="time">
            <text class="time1">2024.09.18--2024.09.20</text>
            <text class="time2">2024.09.21--2024.9.23</text>
          </view>
        </view>
      </view>
      <view class="act_location">
        <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/concentric_circles.png" mode="widthFix"></image>
        <text>活动地址：洛邑古城</text>
      </view>
    </view>
    <view class="container-middle">
      <view class="section">
        <!-- 图标和文字部分 -->
        <view class="icon-container">
          <!-- 第一个图标及文字 -->
          <view class="icon">
            <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/act1.png" class="icon-image" />
            <text class="icon-text">签到簿</text>
          </view>
          <!-- 分割线 -->
          <view class="divider"></view>

          <!-- 第二个图标及文字 -->
          <view class="icon">
            <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/act2.png" class="icon-image" />
            <text class="icon-text">汉服服饰</text>
          </view>

          <!-- 分割线 -->
          <view class="divider"></view>

          <!-- 第三个图标及文字 -->
          <view class="icon">
            <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/act3.png" class="icon-image" />
            <text class="icon-text">合影自拍</text>
          </view>

          <!-- 分割线 -->
          <view class="divider"></view>

          <!-- 第四个图标及文字 -->
          <view class="icon">
            <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/act4.png" class="icon-image" />
            <text class="icon-text">互动点赞</text>
          </view>
        </view>
      </view>
      <view class="bottom">
        <view class="introduce">
          <view class="title">
            <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/concentric_circles.png" mode="widthFix"></image>
            <text>活动介绍</text>
          </view>
          <view class="body">
            <text>{{actInfo.actIntroduce}}</text>
          </view>
        </view>
      </view>

      <view class="contact">
        <view class="title">
          <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/concentric_circles.png" mode="widthFix"></image>
          <text>联系方式</text>
        </view>
        <view class="body">
          18765845856
        </view>
      </view>
    </view>
    
    <view class="container-bottom" >
      <view class="collection">
        <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/collection.png" mode="widthFix"></image>
        <view class="text">收藏</view>
      </view>
      <view class="application">
        <view class="text">报名</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        actInfo:''
      };
    },
    onLoad(options) {
      const actId=options.actId
      console.log(actId)
      this.getActDetail(actId)
    },
    methods:{
      async getActDetail(actId){
        const {data:res} = await uni.$http.get('/act/'+actId)
        console.log(res)
        
        this.actInfo=res.data;
      }
    }
  }
</script>

<style lang="scss">
  .container{
    .container-top{
      display: flex;
      
      margin: 20rpx 20rpx;
      .top-left{
        image{
          width: 250rpx;
        }
      }
      .top-right{
        display: flex;
        flex-direction: column;
        .title{
          font-size: 25rpx;
        }
        .address{
          margin-top: 15rpx;
          text{
            color: black;
            font-size: 25rpx;
          }
        }
        .date{
          margin-top: 5rpx;
          justify-items: center;
          align-items: center;
          margin-left: 5rpx;
          image{
            width: 20rpx;
          }
          text{
            margin-left: 10rpx;
            font-size: 25rpx;
            color: #000000;
          }
        }
        
      }
    }
    .container-middle{
      width: 90%;
      margin: 20rpx 5%;
      background-color: #ffe5e5;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      .top{
        border-bottom: 1px solid #c5c5c5;
        margin-top: 10rpx;
        display: flex;
        .participation{
          display: flex;
          margin-bottom: 2px;
          text-align: center;
          margin-left: 100rpx;
          .num{
            font-size: 25rpx;
          }
          .title{
            font-size: 25rpx;
            color: gray;
          }
          .l1{
            margin-left: 70rpx;
          }
          .l2{
            margin-left: 100rpx;
          }
        }
      }
      .middle{
        border-bottom: 1px solid #c5c5c5;
        .description{
          margin-top: 2px;
          display: flex;
          .registration_date{
            margin-right: 50rpx;
            image{
              margin-left: 20rpx;
              width: 30rpx;
            }
            text{ font-size: 30rpx;}
          }
          .activity_date{
            margin-left: 100rpx;
            image{
              width: 30rpx;
            }
            text{ font-size: 30rpx;}
          }
        }
        .dates{
          margin-bottom: 5rpx;
          .time{
            .time1{
              font-size: 20rpx;
              margin-left: 25rpx;
            }
            .time2{
              font-size: 20rpx;
              margin-left: 80rpx;
            }
          }
        }
      }
      .act_location{
        margin-bottom: 20rpx;
        image{
          margin-left: 20rpx;
          width: 30rpx;
        }
        text{
          margin: 10rpx 0 ;
          font-size: 30rpx;
        }
      }
      .bottom{
        margin:30rpx 20rpx 30rpx 20rpx;
        .introduce{
          .title{
            image{
              width: 30rpx;
            }
            text{
              font-size: 30rpx;
              line-height: 10rpx;
            }
          }
          .body{
            font-size: 30rpx;
          }
        }
      }
      .contact{
        .title{
          image{
            width: 30rpx;
          }
          text{
            font-size: 30rpx;
          }
        }
        .body{
          margin: 20rpx 20rpx;
        }
      }
    }
    .container-bottom{

      transform: translate(0,80rpx);
      display: flex;
      // position: absolute;
      .collection{
        margin-left: 40rpx;
        align-items: center;
        justify-content: center;
        width: 10%;
        image{
          margin-left: 20rpx;
          align-items: center;
          width: 30rpx;
        }
        text{
          font-size: 20rpx;
        }
      }
      .application{
        border-radius: 20rpx;
        background-color: #9d0f0f;
        width: 70%;
        text-align: center;
        margin-left: 50rpx;
        justify-content: center;
        .text{
          margin-top: 20rpx;
          text-align: center;
          font-size: 30rpx;
          color: #ffffff;
          font-weight: bold;
        }
      }
    }
  }
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
  }

  /* 图标样式 */
  .icon {
    flex: 0 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* 图标图片样式 */
  .icon-image {
    width: 20px;
    height: 20px;
    margin-bottom: 5px; /* 图标和文字之间的间距 */
  }

  /* 图标文字样式 */
  .icon-text {
    font-size: 14px;
    color: #555;
  }
  .background{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -2;
    opacity: 50%;
  }
</style>
