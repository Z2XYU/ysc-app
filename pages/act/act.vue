<template>
  <view class="j">
    <!-- 轮播图 -->
    <swiper autoplay circular indicator-dots interval="2500" style="border-radius: inherit">
      <swiper-item>

        <image mode="widthFix" src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/act/act1.jpg" />
      </swiper-item>
      <swiper-item>

        <image mode="widthFix" src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/act/act2.jpg" />
      </swiper-item>
      <swiper-item>

        <image mode="widthFix" src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/act/act3.jpg" />
      </swiper-item>

    </swiper>


    <!-- 导航栏 -->
    <view class="nav-container">
      <view class="nav-items">
        <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="handleClick(item)">
          <image mode="widthFix" :src="item.iconUrl"></image>
          <text>{{item.title}}</text>
        </view>
      </view>
    </view>


    <view class="act-container">
      <view class="act-header">
        <text>精选活动</text>
        <view class="total">
          <text>全部</text>
          <uni-icons type="right" size="25rpx"></uni-icons>
        </view>
      </view>

      <view class="act-items">
        <view class="act-item" v-for="(item,i) in actList" :key="i" @click="gotoActDetail(item.actId)">
          <view class="item-left">
            <image :src="item.actImage" mode="widthFix"></image>
          </view>

          <view class="act-right">
            <text class="title">{{item.actName}}</text>

            <view class="address">
              <uni-icons type="location" size="25rpx"></uni-icons>
              <text>{{item.actAddress}}</text>
            </view>

            <view class="date">
              <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/time4.png" mode="widthFix">
              </image>
              <text>{{item.actTime}}</text>
            </view>
          </view>
        </view>
      </view>

    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        currentNavIndex: 0,
        navList: [{
            iconUrl: 'https://ynusc-proj.oss-cn-beijing.aliyuncs.com/act/nav/nav1.png',
            title: '服饰推荐'
          },
          {
            iconUrl: 'https://ynusc-proj.oss-cn-beijing.aliyuncs.com/act/nav/nav2.png',
            title: '景点推荐'
          },
          {
            iconUrl: 'https://ynusc-proj.oss-cn-beijing.aliyuncs.com/act/nav/nav3.png',
            title: '投票活动'
          },
          {
            iconUrl: 'https://ynusc-proj.oss-cn-beijing.aliyuncs.com/act/nav/nav4.png',
            title: '在线客服'
          }
        ],
        actList: [],
        browseList: [],
        historyList: [],
        recContent: ''
      };
    },
    onLoad() {
      this.showAllActList()
      this.browseList = JSON.parse(uni.getStorageSync('browsingHistory') || '[]')
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      async showAllActList() {
        const {
          data: res
        } = await uni.$http.get('/act')
        console.log(res)
        this.actList = res.data;
      },
      gotoActDetail(actId) {
        console.log("nb")
        uni.navigateTo({
          url: '/subpkg/act_detail/act_detail?actId=' + actId
        })
      },
      showInputDialog() {
        uni.showModal({
          title: '智能推荐',
          content: '是否允许获取您的浏览和搜索记录',
          editable: false,
          placeholderText: '描述物品内容', //输入框提示内容
          confirmText: '确认',
          cancelText: '取消',
          success: (res) => {
            if (res.confirm) {
              console.log('输入的内容：', res.content);
              this.recContent = res.content
              this.gotoRecList()
            }
          }
        });
      },
      handleClick(item) {
        if (item.title === "服饰推荐") {
          this.showInputDialog();
        }
        else if(item.title === "景点推荐"){
          uni.navigateTo({
            url:'/subpkg/jingdian_tuijian/jingdian_tuijian'
          })
        }
        else if(item.title === "在线客服"){
          uni.navigateTo({
            url:'/subpkg/kefu/kefu'
          })
        }
        else if(item.title === "投票活动"){
          uni.navigateTo({
            url:'/subpkg/toupiao_huodong/toupiao_huodong'
          })
        }
        else {
          console.log(`${item.title} 按钮被点击`);
        }
      },
      async gotoRecList() {
        uni.showLoading({
          title: '正在推荐中...'
        })
        const info = this.recContent;
        console.log(this.browseList)
        const response = await uni.request({
          url: "http://yunsc.asia:18080/api/recom_multi/",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            titles: this.historyList || [],
            ids: this.browseList || [],
            n: 10
          })
        });


        // console.log(response)
        // // 延时3秒后跳转
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        // uni.navigateTo({
        //   url: '/subpkg/hanfu_detail/hanfu_detail?hanfu_id='+14
        // })
        if (response[1].statusCode === 200) {
          uni.hideLoading()
          const result = await response[1].data;
          console.log(result);
          uni.navigateTo({
            url: '/subpkg/hanfu_detail/hanfu_detail?hanfu_id=' + result[0]
          })
        }

        // uni.hideLoading();
      }

    }
  }
</script>

<style lang="scss">
  swiper {
    width: 100%;
    // 套用计算swiper高度的公式
    height: calc(100vw * 442 / 840);

    image {
      // 图片自适应屏幕大小
      width: 100%;
    }

    swiper-item {
      border-radius: 5rpx;
    }
  }

  .nav-container {
    .nav-items {
      display: flex;
      justify-content: center;
      padding: 10rpx 30rpx;

      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10rpx 15rpx;

        image {
          width: 150rpx;
        }

        text {
          margin-top: 15rpx;
          font-size: 30rpx;
          color: gray;
        }
      }
    }
  }

  .act-container {
    width: 750rpx;
    display: flex;
    flex-direction: column;

    // margin-top: 20rpx;
    .act-header {
      display: flex;
      justify-content: space-between;
      padding: 30rpx 30rpx;
    }

    .act-items {
      display: flex;
      flex-direction: column;

      .act-item {
        display: flex;
        padding: 15rpx 30rpx;

        .item-left {
          image {
            width: 300rpx
          }
        }

        .act-right {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-content: center;
          margin-left: 20rpx;

          .title {
            font-size: 27rpx;
          }

          .address {
            margin-top: 15rpx;

            text {
              color: gray;
              font-size: 25rpx;
            }
          }

          .date {
            margin-top: 5rpx;
            justify-items: center;
            align-items: center;

            image {
              width: 20rpx;
            }

            text {
              margin-left: 10rpx;
              font-size: 25rpx;
              color: gray;
            }
          }
        }
      }
    }
  }
</style>