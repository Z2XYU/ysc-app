<template>
  <view>
    <view class="content">
      <view class="avatar-box">
        <view class="box-left">
          <text>头像</text>
        </view>
        <view class="box-right" @tap="ChooseImage">
          <view class="avatar">
            <image :src="userInfo.avatar"></image>
          </view>
          <uni-icons type="right" size="50rpx"></uni-icons>
        </view>
      </view>

      <view class="name-box">
        <view class="box-left">
          <text>名字</text>
        </view>
        <view class="box-right" @click="modifyName">
          <view class="name">
            <text>{{userInfo.name}}</text>
          </view>
          <uni-icons type="right" size="40rpx"></uni-icons>
        </view>
      </view>

      <view class="gender-box">
        <view class="box-left">
          <text>性别</text>
        </view>
        <view class="box-right" @click="chooseSex">
          <view class="gender">
            <text>{{userInfo.gender}}</text>
          </view>
          <uni-icons type="right" size="40rpx"></uni-icons>
        </view>
      </view>

      <view class="telephone-box">
        <view class="box-left">
          <text>电话</text>
        </view>
        <view class="box-right">
          <view class="telephone">
            <text>{{userInfo.telephone}}</text>
          </view>
          <!-- <uni-icons type="right" size="40rpx"></uni-icons> -->
        </view>
      </view>
    </view>

    <view class="popu">
      <modal v-if="areaShow" title="更改名字" confirm-text="保存" cancel-text="取消" @cancel="cancelAdd" @confirm="confirmAdd">
        <input type="text" @input="inputNewName" v-model="newName" placeholder="限填10个字" class="intxt" maxlength="10" />
      </modal>
    </view>

    <uni-popup ref="pickerView" type="bottom" style="z-index: 9999999;">
      <div class="popup-view">
        <div class="popup-view-header">
          <div class="popup-view-cancel" @click="pickerCancel"> 取消 </div>
          <div class="popup-view-confirm" @click="pickerConfirm"> 完成 </div>
        </div>
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item,index) in sexList" :key="index">{{item}}</view>
          </picker-view-column>
        </picker-view>
      </div>
    </uni-popup>

  </view>

</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import user from '../../store/user';
  export default {
    data() {
      return {
        indicatorStyle: `height: 68rpx;`,
        userInfo: '',
        areaShow: false,
        newName: '',
        sexList: ['男', '女'],
        sex: ''
      };
    },
    onLoad() {
      this.userInfo = uni.getStorageSync('userInfo')
      this.newName = this.userInfo.name
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo']),
      chooseSex() {
        // console.log(this.sex)
        this.$refs.pickerView.open();
      },
      pickerCancel() {
        this.$refs.pickerView.close();
      },
      pickerConfirm() {
        uni.$http.post('/user/gender/' + this.userInfo.userId + '?gender=' + this.sex).then(response => {
            uni.$showMsg('修改成功')
            console.log('修改成功', response);
          })
          .catch(error => {
            console.error('修改失败', error);
            uni.$showMsg('修改失败')
          });
        this.userInfo.gender = this.sex
        this.updateUserInfo(this.userInfo)
        this.$refs.pickerView.close();

      },
      bindChange(e) {
        this.sex = this.sexList[e.target.value];
      },



      bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.index = e.detail.value
      },
      inputNewName(e) {
        this.newName = e.detail.value
        // console.log(this.newName)
      },
      modifyName() {
        this.areaShow = true
      },
      cancelAdd() {
        this.areaShow = false
      },
      confirmAdd() {
        uni.$http.post('/user/nickname/' + this.userInfo.userId + '?newNickname=' + this.newName).then(response => {
            uni.$showMsg('保存成功')
            console.log('保存成功', response);
            this.userInfo.name = this.newName
            this.updateUserInfo(this.userInfo)
          })
          .catch(error => {
            console.error('保存失败', error);
            uni.$showMsg('保存失败')
          });
        this.areaShow = false
      },
      async ChooseImage() {
        uni.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: async (res) => {
            if (res.tempFiles[0].size > 10 * 1024 * 1000) {
              uni.showToast({
                title: "照片大小不能10MB",
                icon: "none"
              })
              return
            }
            let url = res.tempFilePaths[0];
            // console.log(url)
            try {
              uni.showLoading({
                title: "上传中...",
                mask: true
              })
              const uploadRes = await uni.uploadFile({
                url: 'http://129.211.26.112:8889/upload',
                filePath: res.tempFilePaths[0],
                name: 'file'
              });
              console.log(uploadRes)
              // 使用uni.$http.post发送请求
              uni.$http.post('/user/avatar/' + this.userInfo.userId + '?newAvatarUrl=' + uploadRes[1].data)
                .then(response => {
                  console.log('成功上传头像', response);
                })
                .catch(error => {
                  console.error('上传头像失败', error);
                });

              this.userInfo.avatar = uploadRes[1].data
              this.updateUserInfo(this.userInfo)
            } catch (e) {
              console.log(e);
            } finally {
              uni.hideLoading();
            }
          }
        });
      },



    }

  }
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    border-bottom: 1rpx solid #dddddd;

    .avatar-box {
      display: flex;
      justify-content: space-between;
      height: 150rpx;
      align-items: center;
      border-bottom: 1rpx solid #dddddd;
    }

    .name-box,
    .gender-box,
    .telephone-box {
      display: flex;
      justify-content: space-between;
      height: 100rpx;
      align-items: center;
      border-bottom: 1rpx solid #dddddd;
    }

    .box-left {
      padding-left: 30rpx;
      font-size: 30rpx;
    }

    .box-right {
      display: flex;
      align-items: center;
    }

    .avatar,
    .name,
    .gender,
    .telephone {
      font-size: 30rpx;
      color: gray;
      margin-right: 10rpx;
    }

    .avatar image {
      object-fit: cover;
      width: 120rpx;
      height: 120rpx;
      border-radius: 10rpx;
    }

    .uni-icons {
      font-size: 40rpx;
    }
  }

  .popup-view {
    background-color: #FFFFFF;

    .popup-view-header {
      text-align: center;
      width: 100%;
      height: 90rpx;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #F5F5F5;

      div {
        max-width: 50%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 28rpx;
        font-size: 34rpx;
        line-height: 90rpx;

        &:first-child {
          color: #888888;
        }

        &:last-child {
          color: #007aff;
        }
      }
    }

    .picker-view {
      width: 100%;
      height: 476rpx;
      margin-top: 20rpx;

      .item {
        height: 68rpx !important;
        line-height: 68rpx;
        text-align: center;
        color: #000;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;
      }
    }
  }
</style>