<template>
  <view class="box">
    <view v-if="hanfuList.length!==0" class="findSuccess">
      <div class="content">
        <div class="content-left">
          <view v-for="(item,i) in hanfuList" :key="i" v-if="i % 2 === 0" @click="gotoHanFuDetail(item)">
            <view class="content-item">
              <image class="content-item-img" :src="item.image" mode="widthFix"></image>
              <view class="content-item-box">
                <text class="content-item-title">{{item.shopName}}</text>
                <text class="content-item-name">{{item.name}}</text>
              </view>
              <view class="content-item-bottom">
                <view class="time">
                  <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/time4.png"></image>
                  <text>{{item.uploadTime}}</text>
                </view>

                <view class="nums">
                  <view class="likes">
                    <uni-icons type="heart" size="20rpx"></uni-icons>
                    <text>{{item.likes}}</text>
                  </view>

                  <view class="views">
                    <uni-icons type="eye" size="20rpx"></uni-icons>
                    <text>{{item.views}}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </div>
        <div class="content-right">
          <view v-for="(item,i) in hanfuList" :key="i" v-if="i % 2 === 1" @click="gotoHanFuDetail(item)">
            <view class="content-item">
              <image class="content-item-img" :src="item.image" mode="widthFix"></image>
              <view class="content-item-box">
                <view class="content-item-title">{{item.shopName}}</view>
                <view class="content-item-name">{{item.name}}</view>
              </view>

              <view class="content-item-bottom">
                <view class="time">
                  <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/time4.png"></image>
                  <text>{{item.uploadTime}}</text>
                </view>

                <view class="nums">
                  <view class="likes">
                    <uni-icons type="heart" size="20rpx"></uni-icons>
                    <text>{{item.likes}}</text>
                  </view>

                  <view class="views">
                    <uni-icons type="eye" size="20rpx"></uni-icons>
                    <text>{{item.views}}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </div>
      </div>
    </view>
    <view class="lookupFailed" v-else>
      <view class="box">
        <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/not_found.png" mode="widthFix"></image>
        
        <view class="title-box">
          <veiw class="title1">没有搜索结果</veiw>
          <view class="title2">没有找到相关的宝贝</view>
        </view>
      </view>
      
      
    </view>
  </view>
</template>

<script>
  export default {

    data() {
      return {
        siteID: '',
        hanfuList: []
      };
    },
    onLoad(options) {
      this.siteID = options.siteID ?? ''; // 现代写法
      this.siteType=options.siteType
        this.getHanFuList()
    },
    onShow() {
      this.getHanFuList();
    },
    methods: {
      async getHanFuList() {
        if(this.siteType==='cloudCabinet'){
          const {
            data: res
          } = await uni.$http.get('/site/terminal/hanfu/'+this.siteID)
          if (res.code !== 1) return uni.$showMsg()
          this.hanfuList = res.data
          
        }else{
          const {
            data: res
          } = await uni.$http.get('/site/shop/hanfu/'+this.siteID)
          if (res.code !== 1) return uni.$showMsg()
          this.hanfuList = res.data
        }
        
        
        // console.log(this.hanfuList)
      },
      getActGoodsList(i) {
        this.active = i
      },
      popupList() {
        this.$refs.popupList.open()
      },
      gotoHanFuDetail(hanFu) {
        uni.navigateTo({
          url: '/subpkg/hanfu_detail/hanfu_detail?hanfu_id=' + hanFu.hanFuId
        })
      }
    }

  }
</script>

<style lang="scss">
  .box {

    .findSuccess {
      .content {
        display: flex;
        justify-content: space-between;

        .content-left {
          width: 49%;
        }

        .content-right {
          width: 49%;
        }
      }

      .content-item {
        margin: 10rpx auto 20rpx;
        background: #fff;
        width: 98%;
        border-radius: 20rpx;
        overflow: hidden;

        .content-item-img {
          width: 100%;
        }

        .content-item-box {
          font-size: 24rpx;
          color: #333;
          // padding-top: 20rpx;
          // padding-left: 20rpx;

          padding: 10rpx 20rpx;
          // box-sizing: border-box;
          display: flex;

          .content-item-title {
            font-size: 27rpx;
            /* 一行省略 */
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-box-orient: vertical;
            // -webkit-line-clamp: 1;
            // overflow: hidden;
          }

          .content-item-name {
            // display: flex;
            // align-items: center;
            // justify-content: space-between;
            // margin-top: 20rpx;
            font-size: 27rpx;
            margin-left: 10rpx;
          }
        }

        .content-item-bottom {
          align-items: center;
          display: flex;
          color: gray;
          padding: 0rpx 20rpx;
          justify-content: space-between;

          .time {
            image {
              width: 18rpx;
              height: 18rpx;
            }

            text {
              margin-left: 5rpx;
              font-size: 20rpx;
            }
          }

          .nums {
            display: flex;

            .likes {
              text {
                margin-left: 5rpx;
                font-size: 20rpx;
              }
            }

            .views {
              margin-left: 10rpx;

              text {
                margin-left: 5rpx;
                font-size: 20rpx;
              }
            }
          }
        }
      }
    }


    .lookupFailed {
      .box{
        margin-top: 400rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        image{
          width: 100rpx;
        }
        .title-box{
          text-align: center;
          .title2{
            color: darkgray;
          }
        }
      }
    }
  }
</style>