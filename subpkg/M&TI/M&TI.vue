<template>
  <view class="container">
    <view class="main-title">影视同款</view>
    
    <view class="photo-gallery">
      <!-- 蒋依依同款 -->
      <view class="photo-card">
        <view class="photo-title">蒋依依同款</view>
        <image
          class="photo"
          src="/static/my-icons/j.jpg"
          mode="aspectFill"
          alt="蒋依依同款汉服"
        ></image>
      </view>

      <!-- 彭小冉同款 -->
      <view class="photo-card">
        <view class="photo-title">彭小冉同款</view>
        <image
          class="photo"
          src="/static/my-icons/p.jpg"
          mode="aspectFill"
          alt="彭小冉同款汉服"
        ></image>
      </view>
      <view class="photo-card">
        <view class="photo-title">永夜星河凌妙妙</view>
        <image
          class="photo"
          src="/static/my-icons/l.jpg"
          mode="aspectFill"
          alt="永夜星河凌妙妙同款"
        ></image>
      </view>
      <view class="photo-card">
        <view class="photo-title">紫萱同款</view>
        <image
          class="photo"
          src="/static/my-icons/z.jpg"
          mode="aspectFill"
          alt="紫萱同款汉服"
        ></image>
      </view>

      <!-- 备用图片 -->
      <view class="photo-card">
        <view class="photo-title">更多风采</view>
        <image
          class="photo"
          src="/static/my-icons/g.jpg"
          mode="aspectFill"
          alt="汉服图片"
        ></image>
      </view>
    </view>

    <view class="footer">© 2024 汉服文化推广</view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
}
.main-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #222;
  margin-bottom: 20rpx;
  text-align: center;
  letter-spacing: 2rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  color: transparent;
}

.header {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #333;
}

.photo-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
}

.photo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-title {
  font-size: 26rpx;
  margin-bottom: 10rpx;
  color: #555;
  text-align: center;
}

.photo {
  width: 300rpx;
  height: 400rpx;
  border-radius: 10rpx;
  border: 1px solid #ddd;
}

.footer {
  margin-top: 40rpx;
  font-size: 24rpx;
  color: #888;
}
</style>
