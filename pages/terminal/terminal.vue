<template>
  <page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
  <view class="container">
    <view class="map-container">
      <map id="mapId" :longitude="longitude" :latitude="latitude" :markers="markers" show-location="true" show-compass
        enable-zoom enable-scroll enable-rotate @markertap="handleMapMarker">
      </map>

      <view class="button">
        <image @click="moveTolocation" src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/location.png"
          class="location-img"></image>
        <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/search_terminal2.png" class="search-img"
          mode="widthFix" @click="getTerminalList"></image>
        <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/search_shop2.png" class="search_shop-img"
          mode="widthFix" @click="getShopList">
      </view>
    </view>




    <view>
      <uni-popup ref="popupNav" type="dialog">
        <uni-popup-dialog content="是否启用外部导航" message="成功消息" :duration="2000" :before-close="true" @close="navClose"
          @confirm="navConfirm"></uni-popup-dialog>
      </uni-popup>
    </view>


    <view class="list-box">
      <uni-popup ref="popupList" type="bottom" border-radius="10px 10px 0 0" @change="change">
        <view class="machine-list">
          <view class="machine-item"  v-for="(item,i) in sortedQueryList" :key="i">
            <view class="item-top">
              <view class="top-left" @click="gotoHanFuList(item)">
                <text>{{item.title}}</text>
              </view>
              <view class="top-right" @click="gotoExNav(item)">
                <image mode="widthFix" src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/nav.png">
                </image>
                <text>{{(item.distance/1000).toFixed(1)}}km</text>
              </view>
            </view>
            <view class="item-bottom">
              <text></text>
            </view>
          </view>
        </view>
      </uni-popup>
    </view>

  </view>
</template>

<script>
  var that
  export default {
    created() {
      that = this
    },
    computed: {
      sortedQueryList() {
        // 按 distance 从小到大排序
        return [...this.queryList].sort((a, b) => a.distance - b.distance);
      },
    },
    data() {
      return {
        show: false,
        isShowFloat: false, // 控制浮窗显示隐藏的变量
        subKey: 'SSGBZ-N5CWQ-POT5L-BZV6T-JT6YT-FNFAK',
        markers: [],
        circles: [],
        polylines: [],
        polygons: [],
        currentMarker: null,

        latitude: '34.626485',
        longitude: '112.460229',

        cloudCabinetList: [],
        shopList: [],

        queryList: []
      }
    },
    onLoad() {
      this.init()
    },
    onHide: function() {
      // console.log('App Hide')
      uni.stopLocationUpdate();
    },

    methods: {
      async init() {
        try {
          const {
            data: res1
          } = await uni.$http.get('/site/terminal');
          if (res1.code !== 1) return uni.$showMsg();

          const {
            data: res2
          } = await uni.$http.get('/site/shop');
          if (res2.code !== 1) return uni.$showMsg();

          // 将数据分别保存
          this.cloudCabinetList = res1.data;
          this.shopList = res2.data;

          // 合并 cloudCabinetList 和 shopList
          const combinedList = [
            ...this.cloudCabinetList.map(item => ({
              ...item,
              type: 'cloudCabinet' // 添加类型标识
            })),
            ...this.shopList.map(item => ({
              ...item,
              type: 'shop' // 添加类型标识
            }))
          ];

          // // 获取当前位置
          // const that = this; // 绑定 this
          // uni.getLocation({
          //   type: 'wgs84',
          //   success: function(res) {
          //     that.getDistanceMeter(res.longitude, res.latitude);
          //   },
          //   fail() {
          //     console.log('调用失败');
          //   }
          // });


          // 创建 markers
          this.markers = combinedList.map((item, index) => {
            if (!item.longitude || !item.latitude) return null; // 跳过无效数据
            return {
              id: index,
              longitude: item.longitude,
              latitude: item.latitude,
              title: item.name || item.title || '', // 优先使用合适的标题字段
              width: 25,
              height: 40,
              iconPath: item.type === 'cloudCabinet' ?
                'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/terminal.png' :
                'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/shop1.png', // 根据类型选择图标
              distance: '',
              type: item.type,
            };
          }).filter(marker => marker !== null); // 去掉无效数据

        } catch (error) {
          console.error('初始化失败', error);
          uni.$showMsg();
        }
        // console.log(this.markers)
      },


      async getDistanceMeter(lon, lat, type) {
        // console.log(that.currentLongitude)
        // console.log(that.currentLatitude)    
        const queryParams = {
          longitude: lon,
          latitude: lat
        };
        const {
          data: res
        } = await uni.$http.get('/site/' + type + '/distance', queryParams)
        if (res.code !== 1) return uni.$showMsg()
        // console.log(res.data)

        this.queryList.forEach((item, i) => {
          item.distance = res.data[i];
        });

        // console.log(this.markers)

      },



      change(e) {
        this.show = e.show
      },
      moveTolocation() {
        let mapObjs = uni.createMapContext('mapId', this)
        mapObjs.moveToLocation({
          complete: res => {
            console.log('移动完成:', res)
          }
        })
      },
      handleMapMarker(e) {
        // console.log(e)
        // console.log(this.markers)
        const marker = this.markers.find(item => item.id == e.markerId)
        this.currentMarker = marker
        // this.showDialog = true
        this.$refs.popupNav.open()
      },
      gotoExNav(e) {
        console.log(e)
        const marker = this.markers.find(item => item.id == e.id)
        this.currentMarker = marker
        this.$refs.popupNav.open()
        this.$refs.popupList.close()
      },

      navClose() {
        this.$refs.popupNav.close()
      },
      navConfirm() {
        const latitude = this.currentMarker.latitude;
        const longitude = this.currentMarker.longitude;
        uni.openLocation({
          type: "gcj02",
          latitude: Number(latitude),
          longitude: Number(longitude),
          name: this.currentMarker.name,
          scale: 18
        });

        this.navClose()
      },
      getFilteredMarkers(type) {
        return this.markers.filter(item => item.type === type);
      },


      getTerminalList() {
        uni.getLocation({
          type: 'wgs84',
          success: function(res) {
            that.getDistanceMeter(res.longitude, res.latitude, 'terminal')
          },
          fail() {
            console.log('调用失败')
          }
        });
        this.queryList = this.getFilteredMarkers('cloudCabinet')
        // console.log(this.queryList)
        this.$refs.popupList.open()

        // uni.stopLocationUpdate();
      },

      getShopList() {
        uni.getLocation({
          type: 'wgs84',
          success: function(res) {
            that.getDistanceMeter(res.longitude, res.latitude, 'shop')
          },
          fail() {
            console.log('调用失败')
          }
        });
        this.queryList = this.getFilteredMarkers('shop')
        // console.log(this.queryList)
        this.$refs.popupList.open()

        // uni.stopLocationUpdate();
      },
      gotoHanFuList(e){
        // console.log(e.id)
        uni.navigateTo({
          url:'/subpkg/site_hanfu_list/site_hanfu_list?siteID='+e.id+'?siteType='+e.type
        })
      },

      // 设置浮窗
      showFloat() {
        this.isShowFloat = true
      },
      hideFloat() {
        this.isShowFloat = false
      }
    }
  }
</script>

<style lang="scss">
  .container {
    .map-container {
      position: absolute;
      height: 100vh;

      map {
        width: 750rpx;
        height: 100vh;
      }

      .button {
        .location-img {
          position: absolute;
          width: 50rpx;
          height: 50rpx;
          transform: translate(700rpx, -200rpx);
        }

        .search-img {
          position: absolute;
          width: 300rpx;
          transform: translate(400rpx, -175rpx);
        }

        .search_shop-img {
          position: absolute;
          width: 310rpx;
          
          transform: translate(45rpx, -150rpx);
        }
      }
    }

    .list-box {
      background-color: f5f5f5;

      .machine-list {
        background-image: url(https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/126db07596fab1c985c37a81c695ee1.jpg);
        // background-size:90% auto;            //默认值，不改变图片的高度和宽度
        // opacity: 0.9;
        display: flex;
        flex-direction: column;
        // background-color: #dddddd;
        border-radius: 20rpx 20rpx 0 0;
        height: 900rpx;
        overflow: scroll;
        padding-top: 20rpx;

        // margin-left: 25rpx;
        .machine-item {
          display: flex;
          flex-direction: column;
          margin: 15rpx 20rpx;
          height: 150rpx;
          // background-color: #ffffff;
          // background-color: #ffffff;
          border-radius: 15rpx;
          padding: 10rpx 10rpx;

          .item-top {
            display: flex;
            justify-content: space-between;
            padding-bottom: 10rpx;
            border-bottom: 1rpx solid #dddddd;

            .top-right {
              display: flex;
              flex-direction: column;
              justify-items: center;
              align-items: center;

              image {
                width: 30rpx;
              }

              text {
                font-size: 20rpx;
              }
            }
          }

          .item-bottom {
            text {
              font-size: 20rpx;
            }
          }
        }
      }
    }
  }
</style>