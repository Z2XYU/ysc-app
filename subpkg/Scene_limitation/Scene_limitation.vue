<template>
  <view class="container">
    <!-- 标题 -->
    <view class="page-title">场景限定 · 汉服风采</view>

    <!-- 图片展示区 -->
   <view class="photo-section">
      <!-- 冬季灯笼场景 -->
      <view class="photo-card">
        <view class="photo-title">冬季灯笼 · 夜景汉服</view>
        <image
          class="photo"
          src="/static/my-icons/dl.jpg"
          mode="aspectFill"
          alt="冬季灯笼场景"
        ></image>
      </view>

      <!-- 秋日庭院场景 -->
      <view class="photo-card">
        <view class="photo-title">秋日庭院 · 温婉汉服</view>
        <image
          class="photo"
          src="/static/my-icons/qty.jpg"
          mode="aspectFill"
          alt="秋日庭院场景"
        ></image>
      </view>

      <!-- 冬季老君山雪景 -->
      <view class="photo-card">
        <view class="photo-title">冬季老君山 · 白雪红裳</view>
        <image
          class="photo"
          src="/static/my-icons/ljs.jpg"
          mode="aspectFill"
          alt="冬季老君山雪景"
        ></image>
      </view>
    </view>
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
/* 页面整体样式 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  background-color: #f9f9f9;
}

/* 页面标题样式 */
.page-title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #222;
  text-align: center;
  letter-spacing: 3rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

/* 图片展示区 */
.photo-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30rpx;
  width: 100%;
  max-width: 600rpx;
}

/* 单张图片卡片 */
.photo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 10rpx;
  overflow: hidden;
}

/* 图片标题样式 */
.photo-title {
  font-size: 28rpx;
  margin: 15rpx 0;
  color: #555;
  text-align: center;
}

/* 图片样式 */

</style>
