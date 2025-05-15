<template>
  <view class="content">
    <view class="content-item-box">
      <view class="item-box-top">
        <view class="title">
          <text class="shop-name">{{hanFuInfo.shopName}}</text>
          <text class="hanfu-name">{{hanFuInfo.name}}</text>
        </view>
        <view class="recording">
          <view class="time">
            <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/time4.png"></image>
            <text>{{hanFuInfo.uploadTime}}</text>
          </view>
          <view class="nums">
            <view class="likes">
              <uni-icons type="heart" size="20rpx"></uni-icons>
              <text>{{hanFuInfo.likes}}</text>
            </view>
            <view class="views">
              <uni-icons type="eye" size="20rpx"></uni-icons>
              <text>{{hanFuInfo.views}}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="item-box-middle">
        <view class="item-iamge" v-for="(item,i) in hanFuImageList" :key="i">
          <view class="image-box">
            <image :src="item.image" mode="widthFix"></image>
          </view>
        </view>
      </view>

      <view class="item-box-bottom">
        <view class="shop">
          <text>店铺： {{hanFuInfo.shopName}} | 原创设计</text>
        </view>
        <view class="name">
          <text>款名： {{hanFuInfo.name}}</text>
        </view>
        <view class="price">价格： {{hanFuInfo.price}}</view>
        <view class="address" @click="GoToDestination">
          <view class="left">
            位置：{{hanFuAddress}}
          </view>
          <view class="right">
            <uni-icons type="location"></uni-icons>
          </view>
        </view>
      </view>

    </view>

    <view>
      <uni-popup ref="popupNav" type="dialog">
        <uni-popup-dialog content="是否前往" message="成功消息" :duration="2000" :before-close="true" @close="navClose"
          @confirm="navConfirm"></uni-popup-dialog>
      </uni-popup>
    </view>

    <view class="try-button" @tap="ChooseImage">
      <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/try1.png"></image>
    </view>

    <view class="content-bottom">
      <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/miniprograms.png" mode="widthFix"></image>
      <text>小程序：云裳城</text>
    </view>
  </view>
</template>

<script>
  import 'whatwg-fetch';
  export default {
    data() {
      return {
        hanFuInfo: '',
        hanFuImageList: [],
        hanFuAddress: '',
        cabinetInfo: ',',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUxODAwOTksInByb2R1Y3RfY29kZSI6IjA2NzAwMyIsInRpbWUiOjE3MzMyMjk0OTZ9.w136gI2NVQ95juW2KZnUw6KsZ-Te-YfD3d3WPZs6s58',
      };
    },
    onLoad(options) {
      const hanfu_id = options.hanfu_id

      console.log(hanfu_id)
      this.getHanFuInfo(hanfu_id)
      // this.getHanFuAddress(hanfu_id)
    },
    methods: {
      async getHanFuInfo(hanfu_id) {
        const {
          data: res
        } = await uni.$http.get('/home/hanfu_detail/' + hanfu_id)
        if (res.code !== 1) return uni.$showMsg()
        this.hanFuInfo = res.data;
        const hanFuId = res.data.hanFuId;
        this.hanFuImageList = res.data.imageList;
        console.log(this.hanFuImageList)

        const id = res.data.cabinetId;
        const {
          data: res2
        } = await uni.$http.get('/site/terminal/' + id)
        if (res.code !== 1) return uni.$showMsg()
        this.cabinetInfo = res2.data;
        this.hanFuAddress = res2.data.address;

        // console.log(this.hanFuAddress)
        // console.log(this.hanFuImageList)
        // console.log(this.hanFuInfo)
      },
      GoToDestination() {
        this.$refs.popupNav.open()

        // this.$refs.popupNav.close()
      },
      navClose() {
        this.$refs.popupNav.close()
      },
      navConfirm() {
        this.$refs.popupNav.close()
        const latitude = this.cabinetInfo.latitude;
        const longitude = this.cabinetInfo.longitude;
        uni.openLocation({
          type: "gcj02",
          latitude: Number(latitude),
          longitude: Number(longitude),
          name: this.cabinetInfo.name,
          scale: 18
        });
      },
      async ChooseImage() {
        uni.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: async (res) => {
            // 检查文件大小
            if (res.tempFiles[0].size > 10 * 1024 * 1000) {
              uni.showToast({
                title: "照片大小不能超过10MB",
                icon: "none",
              });
              return;
            }

            try {
              // 显示上传中提示
              uni.showLoading({
                title: "正在合成中...",
                mask: true,
              });

              // 上传目标图片
              const uploadRes = await uni.uploadFile({
                url: 'http://129.211.26.112:8889/upload', 
                filePath: res.tempFilePaths[0],
                name: 'file',
              });

              // 检查上传结果
              if (uploadRes[1].statusCode !== 200) {
                throw new Error("图片上传失败");
              }
              // 获取返回的图片路径
              // const targetImagePath = this.hanFuInfo.image;
              
              // console.log(targetImagePath)
              // console.log(swapImagePath)
              
              const top_garment= this.hanFuImageList[0].image;
              const bottom_garment=this.hanFuImageList[1].image;
              
              const swapImagePath = uploadRes[1].data;

              //ai换脸代码
              //const {data :res3} =await uni.$http.post('/face-swap?targetImageUrl='+targetImagePath+'&swapImageUrl='+swapImagePath)
              //const outPutUrl=res3.result.output_image_url;

              //阿里云虚拟试衣
              const url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/image2image/image-synthesis/';
              const apiKey = 'sk-ecffba6855f64bb29b403e90358d1831'; // 替换为你的API密钥
              // 定义请求体
              const body = {
                model: 'aitryon', // 使用的模型
                input: {
                  top_garment_url: top_garment, // 上衣图像的URL
                  // top_garment_url: targetImagePath, // 上衣图像的URL

                  bottom_garment_url: bottom_garment, // 下装图像的URL
                  person_image_url: swapImagePath // 人物图像的URL
                },
                parameters: {
                  resolution: -1, // 不修改分辨率
                  restore_face: true // 恢复面部
                }
              };

              let taskId, outPutUrl;

              // 发送 POST 请求
              uni.request({
                url: url, // 请求的URL
                method: 'POST',
                header: {
                  'X-DashScope-Async': 'enable',
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': 'application/json'
                },
                data: body, // 请求体
                success(res) {
                  console.log('响应数据:', res.data); // 打印响应数据
                  taskId = res.data.output.task_id; // 获取 task_id
                  // 调用轮询函数来检查结果
                  checkTaskStatus(taskId);
                },
                fail(err) {
                  console.error('发生错误:', err); // 处理错误
                }
              });

              // // 显示“正在合成中，请稍后”的提示
              // uni.showLoading({
              //   title: "正在合成中...",
              //   mask: true,
              // });

              // 轮询检查任务状态
              function checkTaskStatus(taskId) {
                console.log(taskId);
                const get_url = `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`; 
                // 显示加载提示
                uni.showLoading({
                  title: "正在处理中...",
                  mask: true
                });
                // 定时请求，轮询检查任务状态
                const interval = setInterval(() => {
                  uni.request({
                    url: get_url, // 请求的URL
                    method: 'GET',
                    header: {
                      'Authorization': `Bearer ${apiKey}` // 添加API密钥
                    },
                    success(res) {
                      console.log('响应数据:', res); // 打印响应数据
                      if (res.data.output.task_status === "SUCCEEDED") {
                        // 如果任务完成，获取生成的图片URL
                        outPutUrl = res.data.output.image_url; // 获取 image_url
                        console.log('图片URL:', outPutUrl);
                        // 关闭loading提示
                        uni.hideLoading();
                        // 清除轮询
                        clearInterval(interval);
                        console.log(outPutUrl);
                        // 下载图片
                        uni.downloadFile({
                          url: outPutUrl, // 图片 URL
                          success: function(downloadRes) {
                            if (downloadRes.statusCode === 200) {
                              // 下载成功，获取本地文件路径
                              const filePath = downloadRes.tempFilePath;
                              console.log('图片下载成功，文件路径:', filePath);
                              // 关闭loading提示
                              uni.hideLoading();
                              // 清除轮询
                              clearInterval(interval);
                              // 在跳转时传递本地图片路径
                              uni.navigateTo({
                                url: `/subpkg/online_fitting/online_fitting?url=${filePath}`, // 使用本地路径
                              });
                            } else {
                              console.error('图片下载失败');
                            }
                          },
                          fail: function(err) {
                            console.error('下载图片时发生错误:', err);
                          }
                        });
                      }
                    },
                    fail(err) {
                      console.error('发生错误:', err); // 处理错误
                    }
                  });
                }, 3000); // 每3秒发送一次请求检查任务状态
              }


              //console.log(res3.result.output_image_url) ;

              // // 显示“正在合成中，请稍后”的提示
              // uni.showLoading({
              //   title: "正在合成中...",
              //   mask: true,
              // });

              // // 延时3秒后跳转
              // await new Promise((resolve) => setTimeout(resolve, 3000));
            } catch (error) {
              console.error(error);
              uni.showToast({
                title: error.message || "操作失败，请稍后重试",
                icon: "none",
              });
            } finally {
              uni.hideLoading();
            }
          },
        });
      },









    }
  }
</script>

<style lang="scss">
  .content {

    // background-color: gainsboro;
    .content-item-box {
      background-color: white;
      width: 94%;
      margin-left: 3%;
      margin-top: 20rpx;
      border-radius: 10rpx;

      .item-box-top {
        .title {
          display: flex;
          padding: 20rpx 20rpx;
          margin: 10rpx 10rpx;

          .shop-name {
            font-size: 40rpx;
          }

          .hanfu-name {
            font-size: 40rpx;
            margin-left: 20rpx;
          }
        }

        .recording {
          align-items: center;
          display: flex;
          color: gray;
          padding: 0rpx 20rpx;
          padding-bottom: 20rpx;

          // justify-content: space-between;
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
            margin-left: 60rpx;

            .likes {
              text {
                margin-left: 5rpx;
                font-size: 20rpx;
              }
            }

            .views {
              margin-left: 20rpx;

              text {
                margin-left: 5rpx;
                font-size: 20rpx;
              }
            }
          }

        }
      }

      .item-box-middle {
        background-color: white;
        width: 94%;
        margin-left: 3%;
        margin-top: 20rpx;


        .item-iamge {
          margin-top: 20rpx;

          .image-box {
            image {
              width: 98%;
              padding-left: 1%;
              border-radius: 10rpx;
            }
          }
        }
      }
    }

    .item-box-bottom {
      margin-top: 20rpx;
      padding: 10rpx 20rpx;
      color: #6a737d;
      font-size: 30rpx;
      border-left-style: solid;
      border-left-color: #dfe2e5;
      border-left-width: 10rpx;
      border-left-radius: 2rpx;

      .shop {
        // margin-top: 20rpx;
      }

      .name {
        margin-top: 20rpx;
      }

      .price {
        margin-top: 20rpx;
        // padding-bottom: 10rpx;
      }

      .address {
        margin-top: 20rpx;
        padding-bottom: 20rpx;
        display: flex;
        justify-content: space-between;
      }
    }

    .try-button {
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
        height: 125rpx;
        /* 按需调整大小 */
      }
    }

    .content-bottom {
      padding: 30rpx 0rpx;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;

      image {
        width: 20rpx;
      }

      text {
        font-size: 20rpx;
        color: gray;
      }
    }
  }
</style>