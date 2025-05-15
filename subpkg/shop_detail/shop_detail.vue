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
    <view class="shangchuan" @click="openPopup">
      <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/c7e1bdff0cbcec071ae5d4ec241c40b.png" mode="widthFix"></image>
    </view>
    
    
    <view class="container">
        <!-- 弹框表单 -->
        <uni-popup ref="popupForm" type="center">
          <view class="popup-form">
            <text class="popup-title">🛒 上传商品</text>
    
            <!-- 上传类型选择 -->
            <view class="form-item">
              <text class="label">📦 上传类型</text>
              <picker mode="selector" :range="uploadTypes" @change="onTypeChange">
                <view class="picker">{{ selectedType || '请选择上传类型' }}</view>
              </picker>
            </view>
    
            <!-- 商品名称 -->
            <view class="form-item">
              <text class="label">🏷️ 商品名称</text>
              <input class="input-field" type="text" v-model="formData.productName" placeholder="请输入商品名称" />
            </view>
    
            <!-- 简介（含价格） -->
            <view class="form-item">
              <text class="label">💬 简介（含价格）</text>
              <textarea class="textarea-field" v-model="formData.description" placeholder="请输入商品简介和价格"></textarea>
            </view>
    
            <!-- 商品图片上传 -->
            <view class="form-item">
              <text class="label">🖼️ 商品图片</text>
              <button class="upload-btn" type="default" @click="chooseImage">选择图片</button>
              <view v-if="formData.image">
                <image :src="formData.image" class="uploaded-image"></image>
              </view>
            </view>
    
            <!-- 提交与取消按钮 -->
            <view class="button-group">
              <button class="submit-btn" type="primary" @click="submitForm">提交</button>
              <button class="cancel-btn" type="default" @click="closePopup">取消</button>
            </view>
          </view>
        </uni-popup>
      </view>
    
  </view>
</template>

<script>
  export default {

    data() {
      return {
        shopid: '',
        hanfuList: [],
        uploadTypes: ['服装', '饰品'],
              selectedType: '',
              formData: {
                productType: '',
                productName: '',
                description: '',
                image: ''
              }
      };
    },
    onLoad(options) {
      this.shopid = options.shopId || '',
        this.getShopHanFuList()
    },
    onShow() {
      console.log(this.shopid)
      this.getShopHanFuList();
    },
    methods: {
      async getShopHanFuList() {
        const {
          data: res
        } = await uni.$http.get('/home/shop/'+this.shopid)
        if (res.code !== 1) return uni.$showMsg()
        this.hanfuList = res.data
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
      },
      // 打开弹框
          openPopup() {
            this.$refs.popupForm.open();
          },
      
          // 关闭弹框
          closePopup() {
            this.$refs.popupForm.close();
          },
      
          // 上传类型选择
          onTypeChange(event) {
            this.selectedType = this.uploadTypes[event.detail.value];
            this.formData.productType = this.selectedType;
          },
      
          // 选择图片
          chooseImage() {
            uni.chooseImage({
              count: 1,
              sizeType: ['compressed'],
              sourceType: ['album', 'camera'],
              success: (res) => {
                this.formData.image = res.tempFilePaths[0];
              }
            });
          },
      
          // 提交表单
          submitForm() {
            if (!this.formData.productType || !this.formData.productName || !this.formData.description || !this.formData.image) {
              uni.showToast({
                title: '请填写完整信息',
                icon: 'none'
              });
              return;
            }
            console.log('表单数据:', this.formData);
            uni.showToast({
              title: '提交成功',
              icon: 'success'
            });
            this.closePopup();
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
    .shangchuan {
      image {
        position: fixed;
        /* 固定位置 */
        bottom: 500rpx;
        /* 距离屏幕底部 20px */
        right: 0rpx;
        /* 距离屏幕右侧 20px */
        z-index: 1000;
        /* 确保在其他内容之上 */
        width: 125rpx;
        /* 按需调整大小 */
        // height: 125rpx;
        /* 按需调整大小 */
      }
    }
  }
.container {
  padding: 40rpx;
  text-align: center;
}

/* 按钮样式 */
.open-popup-btn {
  width: 60%;
  font-size: 32rpx;
  border-radius: 12rpx;
  padding: 16rpx 0;
  margin-top: 20rpx;
}

/* 弹框表单样式 */
.popup-form {
  width: 90vw;
  max-width: 600rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
  text-align: left;
}

/* 表单标题 */
.popup-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
  color: #333;
}

/* 表单项 */
.form-item {
  margin-bottom: 25rpx;
}

.label {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
  color: #555;
}

.picker {
  background-color: #f8f8f8;
  padding: 14rpx;
  border-radius: 8rpx;
  border: 1rpx solid #ddd;
  margin-top: 6rpx;
}

/* 输入框 */
.input-field {
  width: 100%;
  padding: 12rpx;
  border: 1rpx solid #ddd;
  border-radius: 8rpx;
  margin-top: 6rpx;
  font-size: 28rpx;
}

.textarea-field {
  width: 100%;
  height: 120rpx;
  padding: 12rpx;
  border: 1rpx solid #ddd;
  border-radius: 8rpx;
  margin-top: 6rpx;
  font-size: 28rpx;
}

/* 图片上传按钮 */
.upload-btn {
  margin-top: 10rpx;
  background-color: #f0f0f0;
  color: #555;
  font-size: 28rpx;
  border-radius: 8rpx;
}

.uploaded-image {
  width: 200rpx;
  height: 200rpx;
  margin-top: 10rpx;
  border-radius: 12rpx;
  border: 1rpx solid #ddd;
}

/* 按钮组 */
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 30rpx;
}

.submit-btn {
  flex: 1;
  margin-right: 10rpx;
  background-color: #007aff;
  color: #fff;
  font-size: 28rpx;
  border-radius: 8rpx;
}

.cancel-btn {
  flex: 1;
  margin-left: 10rpx;
  background-color: #f5f5f5;
  color: #555;
  font-size: 28rpx;
  border-radius: 8rpx;
}

</style>