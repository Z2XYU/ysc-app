<template>
  <view class="profile-container">
    <!-- 头像与个人信息 -->
    <view class="header">
      <image class="avatar" :src="profile.avatar" mode="aspectFill"></image>
      <view class="info">
        <text class="name">{{ profile.name }}</text>
        <text class="id">{{ profile.id }}</text>
      </view>
    </view>

    <!-- 统计数据 -->
    <view class="stats">
      <view class="stat-item">
        <text class="stat-number">{{ profile.likes }}</text>
        <text class="stat-label">获赞</text>
      </view>
      <view class="stat-item">
        <text class="stat-number">{{ profile.following }}</text>
        <text class="stat-label">关注</text>
      </view>
      <view class="stat-item">
        <text class="stat-number">{{ profile.followers }}</text>
        <text class="stat-label">粉丝</text>
      </view>
    </view>

    <!-- 个人简介 -->
    <view class="bio">
      <text>{{ profile.bio }}</text>
    </view>

    <!-- 作品展示 -->
    <view class="works">
      <view class="work-item" v-for="(work, index) in profile.works" :key="index">
        <image class="work-image" :src="work.image" mode="aspectFill"></image>
        <text class="work-likes">&#x2764; {{ work.likes }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        avatar: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/avatar/8238594731bef3564d09345fcd93143.jpg',
        name: '生活的垃圾桶',
        id: 'Douyin: 584574065',
        likes: 330,
        following: 280,
        followers: 87,
        bio: 'Ta是你的朋友\n喜欢拍拍有意思的女摄可约拍，谈\uD83D\uDCB0伤感情\nsony a77很专业的一个拍烂片的摄影\n可参考猪页有我拍的镁铝',
        works: [
          { image: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/203eee43f0a508f7559b7ee09460493.jpg', likes: 25 },
          { image: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/6914e1d03fceb0c8f8fad6a30590255.jpg', likes: 51 },
          { image: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/cbe3cfd61256774b868f7948f9ebbe2.jpg', likes: 17 },
          { image: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/5793ae205bf5e74733ddd43e3f8604c.jpg', likes: 42 },
          { image: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/581af0db50bc26a3c29ad004579e79b.jpg', likes: 19 },
          { image: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/ecb3386d54b6845f4eb0a86311b42e6.jpg', likes: 32 }
        ]
      }
    };
  }
};
</script>

<style>
.profile-container {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 20rpx;
}
.header {
  background-image: url("https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/artwork/a6c3efdc39ffebf43ae3d48d49c1a50.jpg");
  background-size: cover;
  background-position: center;
  //border-top-left-radius: 20rpx; /* 左上角 */
  //border-top-right-radius: 20rpx; /* 右上角 */
  //overflow: hidden; /* 隐藏超出圆角的内容 */
  padding-top: 100rpx;
  padding-bottom: 50rpx;
  
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}
.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}
.info {
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 40rpx;
  font-weight: bold;
  color: white;
}
.id {
  font-size: 28rpx;
  color: #cbcbcb;
}
.stats {
  display: flex;
  justify-content: space-around;
  margin: 20rpx 0;
  padding: 20rpx
  
  ;
/*  width: 96%;
  border-radius: 20rpx;
  background-color: aliceblue; */
  /* margin-top: 100rpx; */
}
.stat-item {
  text-align: center;
}
.stat-number {
  font-size: 36rpx;
  font-weight: bold;
}
.stat-label {
  font-size: 28rpx;
  color: #999;
}
.bio {
  font-size: 28rpx;
  line-height: 1.5;
  margin-bottom: 20rpx;
  color: #555;
}
.works {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}
.work-item {
  width: 48%;
  position: relative;
}
.work-image {
  width: 100%;
  height: 600rpx;
  border-radius: 10rpx;
}
.work-likes {
  position: absolute;
  bottom: 10rpx;
  left: 10rpx;
  color: #fff;
  font-size: 28rpx;
  text-shadow: 0 2rpx 5rpx rgba(0, 0, 0, 0.5);
}
</style>
