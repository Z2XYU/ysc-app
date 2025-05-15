<template>
  <view>
    <!-- 搜索组件 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>

    <view class="nav">
      <view class="nav-item" v-for="(item,i) in navList" :key="i">
        <view :class="['act-title',i===active? 'active':'']" @click="getNavHanFuList(i,item)">{{item.title}}</view>
      </view>
      <uni-icons type="down" size="30rpx" @click="popupList"></uni-icons>
    </view>

    <view class="cate-box">
      <uni-popup animation="true" ref="popupList" type="top" border-radius="10px 10px 0 0">

        <view class="cate-text">全部频道</view>
        <view class="cate-list">

          <view class="cate-item" v-for="(item,i) in popupCateList" :key="i">
            <text>{{item.title}}</text>
          </view>
        </view>
      </uni-popup>
    </view>
    
    <view class="science-list" v-for="(item,i) in navScienceList" :key="i">
      <view class="science" v-if="active===item.id">
        <text class="science-title">✨ {{item.title}}</text>
        <text class="science-content">
          {{item.content}}
        </text>
      </view>
    </view>
    


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


</template>

<script>
  export default {
    data() {
      return {
        active: 0,
        navList: [{
            title: '推荐'
          },
          {
            title: '秦汉制'
          },
          {
            title: '魏晋制'
          },
          {
            title: '唐制'
          },
          {
            title: '宋制'
          },
          {
            title: '明制'
          }
        ],
        hanfuList: [],
        shopList: [],
        nav: '',
        navScienceList:[
          {
            id:3,
            title:'唐制服饰',
            content:'唐装，分古代唐装和现代唐装，代表有齐胸衫裙、唐圆领袍、交领襦裙等，唐装应该区别于近现代服饰所谓的“唐装”。唐装中的妇女上衣种类一般分为襦，袄，衫三种。襦是一种衣身狭窄短小的夹衣或棉衣。袄长于襦而短于袍，衣身较宽松，也有夹衣或棉衣。襦、袄有窄袖与长袖两类。装是中国“衣冠上国”、“礼仪之邦”、“锦绣中华”、赛里斯国的体现，承载了中华民族的染织绣等杰出工艺和美学，传承了30多项中国非物质文化遗产以及受保护的中国工艺美术。'
          },
          {
            id:4,
            title:'宋制服饰',
            content:'宋朝服饰一般指宋朝流行的服饰 ，包括北宋南宋流行的服饰，是服饰史发展的一颗明珠，其特点是修身适体。宋时不论权贵的皇亲国戚，还是一般的百姓，都流行着直领， 对襟的一种服饰，出土实物有福州南宋黄升墓 、湖南衡阳何家皂北宋墓、江苏金坛茅麓南宋周瑀墓。浙江黄岩赵伯澐墓等。'
          },
          {
            id:1,
            title:'秦汉服饰',
            content:'秦汉时期的汉服以宽松、简洁为主，主要由上衣和下裳组成，强调舒适性与功能性。衣服采用束带设计，色彩雅致，常见的纹样有龙、凤等象征意义图案。服饰不仅是日常穿着，还承载着礼仪与社会地位，特别是在正式场合中，体现了文化与道德规范。随着汉朝的建立，汉服逐渐成为汉族文化的象征，对后世服饰文化产生了深远影响。'
          },
          {
            id:5,
            title:'明制服饰',
            content:'明制汉服继承了唐宋风格，并在此基础上发展，注重礼仪与层次感，具有立领、对襟和直立衣襟的特点。服饰层次丰富，常包括内衣、外衣和披风，腰带和佩饰展示身份和审美。颜色和纹样上也有明显区分，如官员服饰常见黄色和龙袍图案。明制汉服不仅体现了严格的社会等级制度，也是当时礼仪文化的象征，对后代服饰产生了深远影响，至今在汉服复兴中仍占重要地位。'
          },
          {
            id:2,
            title:'魏晋制服饰',
            content:'魏晋制汉服在魏晋时期的风格中体现出较强的个性化与自由化，服饰设计较为宽松，摒弃了传统的束缚感，追求简约与舒适。其特点包括衣襟松散、领口开阔，外形简洁而富有流动感。男子通常穿着宽大的袍服，女性则常见轻盈的长裙或袍子，强调自然的线条和流畅感。此外，魏晋时期的服饰还注重细节与配饰，如佩带玉佩、冠帽等，突出身份和品味。这一时期的汉服风格在道家思想的影响下，更加重视内敛、自然和个体表达。'
          },
        ]
      }
    },

    onLoad() {
      this.getHanFuList();
    },
    onShow() {
      // this.getHanFuList();
      this.getNavHanFuList(this.active, this.nav)
    },
    methods: {
      async getHanFuList() {
        let authToken = uni.getStorageSync('token');
        console.log(authToken)
        const {
          data: res
        } = await uni.$http.get('/home')
        if (res.code !== 1) return uni.$showMsg()
        this.hanfuList = res.data
        // console.log(this.hanfuList)
      },
      async getNavHanFuList(i, item) {
        this.active = i
        // console.log(this.active);
        this.nav = item
        if (i === 0) {
          const {
            data: res
          } = await uni.$http.get('/home')
          if (res.code !== 1) return uni.$showMsg()
          this.hanfuList = res.data
        } else {
          const {
            data: res
          } = await uni.$http.get('/home/nav/hanfu_list', {
            label: item.title
          })
          if (res.code !== 1)
            return uni.$showMsg()
          // console.log(res)
          this.hanfuList = res.data
        }


      },
      popupList() {
        this.$refs.popupList.open()
      },
      saveBrowseInfo(hanFuId) {
        // this.historyList.push(this.kw)
        const set = new Set(this.browseList)
        set.delete(hanFuId)
        set.add(hanFuId)
        this.browseList = Array.from(set)
        // 进行持久化存储
        uni.setStorageSync('browsingHistory', JSON.stringify(this.browseList))
      },

      gotoHanFuDetail(hanFu) {
        // console.log(hanFu.hanFuId)
        this.saveBrowseInfo(hanFu.hanFuId)
        uni.navigateTo({
          url: '/subpkg/hanfu_detail/hanfu_detail?hanfu_id=' + hanFu.hanFuId
        })
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },

    }
  }
</script>

<style lang="scss">
  .search-box {
    margin-top: 10rpx;
    // position: absolute;
  }

  .nav {

    display: flex;
    margin-top: 10rpx;
    justify-content: space-between;
    padding: 10rpx 30rpx;

    .nav-item {
      align-items: center;
      justify-items: center;

      .act-title {
        color: gray;

        font-size: 28rpx;

        &.active {
          font-size: 30rpx;
          font-weight: bold;
          color: black;
        }
      }

    }
  }

  .cate-box {


    .cate-text {
      padding-top: 20rpx;
      padding-left: 20rpx;
      font-size: 30rpx;
      background-color: #f1f1f1;
      width: 750rpx;
    }

    .cate-list {

      background-color: #f1f1f1;


      display: flex;
      flex-wrap: wrap;
      padding: 20rpx 20rpx;


      border-radius: 0 0 10rpx 10rpx;

      .cate-item {
        background-color: #e8e8e8;
        border-radius: 5rpx;
        height: 50rpx;
        // width: 150rpx;
        margin: 10rpx 15rpx;

        // text-align: center;
        text {
          letter-spacing: 0.3rpx;
          padding: 10rpx 10rpx;
          font-size: 25rpx;
          color: black;
        }
      }
    }
  }


  .science {
    background: linear-gradient(to bottom, #fdfcfb, #e2d1c3);
    /* 渐变背景 */
    padding: 24rpx;
    border-radius: 16rpx;
    margin: 20rpx;
    box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
  }

  .science-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #8b4513;
    /* 棕色调 */
    text-align: center;
    margin-bottom: 20rpx;
    text-shadow: 1rpx 1rpx 4rpx rgba(0, 0, 0, 0.2);
    /* 文字阴影 */
  }

  .science-content {
    font-size: 28rpx;
    line-height: 1.8;
    color: #5a4d41;
    /* 深棕色 */
    text-indent: 2em;
    /* 首行缩进 */
    margin-bottom: 16rpx;
  }

  .science-content:last-child {
    margin-bottom: 0;
  }



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

  // .content-item-avatar {
  //   width: 40rpx;
  //   height: 40rpx;
  //   border-radius: 50%;
  //   margin-right: 15rpx;
  // }

  .content-item-heart {
    color: #c4c4c4;
    text-decoration: underline;
    font-size: 26rpx;
  }
</style>