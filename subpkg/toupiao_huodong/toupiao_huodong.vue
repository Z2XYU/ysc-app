<template>
  <view class="container">
    <view class="activity-box">
      <view class="activity-header">
        <text class="title">汉服文化投票活动</text>
        <text class="subtitle">选择你心中的汉服之美</text>
      </view>

      <!-- 活动描述 -->
      <view class="activity-description">
        <text class="description-text">
          参与汉服投票，选择您喜爱的汉服风格。汉服作为中华文化的瑰宝，承载着千年的历史与文明。通过投票活动，您可以了解不同朝代汉服的独特魅力，快来投出您心中的汉服之美吧！
        </text>
      </view>

      <!-- 投票选项 -->
      <view class="vote-options">
        <view class="vote-option" v-for="(option, index) in options" :key="index">
          <radio-group>
            <radio :value="option.value" :name="option.name" v-model="selectedOption"></radio>
            <image :src="option.image" class="option-image" mode="widthFix"/>
            <text>{{ option.label }}</text>
            <text class="option-description">{{ option.description }}</text>
          </radio-group>
        </view>
      </view>

      <!-- 投票按钮 -->
      <view class="vote-footer">
        <button @click="submitVote" class="submit-button">投票</button>
      </view>

      <!-- 投票结果 -->
      <view v-if="isVoteSubmitted" class="result-box">
        <text class="result-title">感谢您的参与！</text>
        <text class="result-text">您选择的汉服是：{{ selectedOptionLabel }}</text>
      </view>

      <!-- 投票倒计时 -->
<!--      <view v-if="!isVoteSubmitted" class="countdown-box">
        <text class="countdown-text">投票倒计时：{{ countdown }}秒</text>
      </view> -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: "",
      options: [
        { name: "option1", label: "汉朝汉服", value: "1", image: "https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/Hanfu/%E7%A7%A6%E6%B1%89%E5%88%B6/%E6%9E%97%E6%B6%A7/1.jpg", description: "汉朝汉服，典雅大方，简单素净，散发出优雅的文化气息。" },
        { name: "option2", label: "唐朝汉服", value: "2", image: "https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/Hanfu/%E5%AE%8B%E5%88%B6/%E7%B0%AA%E8%8A%B1%E4%BB%95%E5%A5%B3/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241013160737.jpg", description: "唐朝汉服，宽大飘逸，色彩绚丽，融入了多元文化的影响。" },
        { name: "option3", label: "宋朝汉服", value: "3", image: "https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/Hanfu/%E5%94%90%E5%88%B6/%E6%B7%98%E9%87%8C%E6%B7%98%E6%B0%94/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241013164941.jpg", description: "宋朝汉服简洁雅致，体现了文人气息，低调内敛。" },
        { name: "option4", label: "明朝汉服", value: "4", image: "https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/Hanfu/%E6%98%8E%E5%88%B6/%E7%A2%A7%E7%91%B6/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241013172158.jpg", description: "明朝汉服传统典雅，服饰华丽精致，色彩搭配优雅。" }
      ],
      isVoteSubmitted: false,
      selectedOptionLabel: "",
      countdown: 30, // 初始倒计时30秒
      timer: null
    };
  },
  methods: {
    submitVote() {
      if (this.selectedOption) {
        this.selectedOptionLabel = this.options.find(option => option.value === this.selectedOption).label;
        this.isVoteSubmitted = true;
        this.clearTimer();
      } else {
        alert("请选择一个选项！");
      }
    },
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  },
  mounted() {
    this.startCountdown();
  }
}
</script>

<style scoped>
/* 页面背景和整体布局 */
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 使内容顶部对齐 */
  height: 100vh;
  margin: 0;
  background: linear-gradient(to right, #e3d6b9, #d6c0a3); /* 温柔的古风渐变背景 */
  overflow: auto; /* 允许内容滚动 */
}

/* 投票活动框的设计 */
.activity-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 活动标题 */
.activity-header {
  text-align: center;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #5d4b3b; /* 深棕色，古风字体颜色 */
  margin-bottom: 10px;
}

.subtitle {
  font-size: 18px;
  color: #7a6e59;
}

/* 活动描述 */
.activity-description {
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f8f1e4;
  border-radius: 10px;
  font-size: 14px;
  color: #6d5c4e;
  text-align: left;
  line-height: 1.6;
}

/* 投票选项 */
.vote-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.vote-option {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 18px;
  color: #5d4b3b;
}

.option-image {
  width: 100rpx;
  /* height: 200px; */
  margin-right: 15px;
  border-radius: 8px;
}

.option-description {
  font-size: 14px;
  color: #7a6e59;
  margin-top: 5px;
  text-align: left;
}

/* 投票按钮 */
.vote-footer {
  display: flex;
  justify-content: center;
}

.submit-button {
  padding: 12px 30px;
  background-color: #7a6e59; /* 古风绿色 */
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #5c4b3a; /* 深绿色 */
}

/* 结果展示 */
.result-box {
  text-align: center;
  background-color: #f8f1e4;
  padding: 20px;
  border-radius: 10px;
}

.result-title {
  font-size: 22px;
  font-weight: bold;
  color: #5d4b3b;
}

.result-text {
  font-size: 16px;
  color: #7a6e59;
}

/* 投票倒计时 */
.countdown-box {
  text-align: center;
  padding: 15px;
  background-color: #e0d5b9;
  border-radius: 10px;
}

.countdown-text {
  font-size: 16px;
  font-weight: bold;
  color: #5d4b3b;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .activity-box {
    height: auto; /* 使内容不被限制 */
    max-width: 100%;
  }

  .activity-header {
    margin-bottom: 15px;
  }
}
</style>
