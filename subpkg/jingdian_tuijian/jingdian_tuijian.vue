<template>
  <view class="container">
    <view class="header">
      <text class="title">景点推荐</text>
    </view>

    <view class="content">
      <view class="scenic-spot" v-for="(spot, index) in spots" :key="index">
        <image :src="spot.image" class="spot-image" />
        <view class="spot-info">
          <text class="spot-name">{{ spot.name }}</text>
          <text class="spot-description">{{ spot.description }}</text>
          <view class="spot-details">
            <view class="spot-rating">
              <text class="rating-title">评分:</text>
              <text class="rating-value">{{ spot.rating }}</text>
            </view>
            <view class="spot-hours">
              <text class="hours-title">开放时间:</text>
              <text class="hours-value">{{ spot.openingHours }}</text>
            </view>
            <view class="spot-reason">
              <text class="reason-title">推荐理由:</text>
              <text class="reason-value">{{ spot.recommendation }}</text>
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
      spots: [
        {
          name: '龙门石窟',
          description: '世界文化遗产，历史悠久的石雕艺术。',
          image: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/%E9%BE%99%E9%97%A8%E7%9F%B3%E7%AA%9F.jpg',
          rating: '4.8/5',
          openingHours: '8:00 AM - 5:30 PM',
          recommendation: '这里是中国古代石刻艺术的代表之一，值得一游。'
        },
        {
          name: '白马寺',
          description: '中国最古老的佛教寺庙之一，具有深厚的文化底蕴。',
          image: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/%E6%B4%9B%E9%98%B3%E5%8D%9A%E7%89%A9%E9%A6%86.jpg',
          rating: '4.7/5',
          openingHours: '6:30 AM - 6:00 PM',
          recommendation: '可以感受佛教文化的深邃，安静且庄严。'
        },
        {
          name: '洛阳博物馆',
          description: '展示丰富的历史文化遗产，藏品众多。',
          image: 'https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/%E6%B4%9B%E9%98%B3%E5%8D%9A%E7%89%A9%E9%A6%86.jpg',
          rating: '4.6/5',
          openingHours: '9:00 AM - 5:00 PM',
          recommendation: '收藏了大量洛阳及中原地区的文物，历史爱好者不可错过。'
        }
      ]
    };
  }
}
</script>

<style scoped>
.container {
  background-color: #f0f0f0;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  color: #333;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.scenic-spot {
  width: 280px;
  margin: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.scenic-spot:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.spot-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
}

.spot-info {
  padding: 15px;
}

.spot-name {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.spot-description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
}

.spot-details {
  font-size: 14px;
  color: #333;
}

.spot-rating,
.spot-hours,
.spot-reason {
  margin-bottom: 12px;
}

.rating-title,
.hours-title,
.reason-title {
  font-weight: bold;
  color: #007bff;
}

.rating-value,
.hours-value,
.reason-value {
  color: #555;
}

.spot-rating text,
.spot-hours text,
.spot-reason text {
  display: block;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: center;
  }

  .scenic-spot {
    width: 90%;
  }
}
</style>
