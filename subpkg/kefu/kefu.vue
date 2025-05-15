<template>
  <view class="container">
    <view class="chat-box">
      <view class="chat-header">
        <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/c64e7376d5fed77339532c3ec359b54.jpg" class="avatar" />
        <view class="service-name">客服</view>
        <view class="status">在线</view>
      </view>

      <view class="chat-history" ref="chatHistory">
        <view class="chat-message" v-for="(message, index) in messages" :key="index" :class="{'message-from-user': message.from === 'user', 'message-from-service': message.from === 'service'}">
          <text>{{ message.text }}</text>
        </view>
      </view>

      <view class="chat-input-area">
        <input v-model="userMessage" class="chat-input" placeholder="请输入您的问题..." />
        <button @click="sendMessage" class="send-button">发送</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userMessage: "",
      messages: [
        { from: "service", text: "您好！欢迎咨询，您有什么问题吗？" }
      ]
    };
  },
  methods: {
    sendMessage() {
      if (this.userMessage.trim()) {
        this.messages.push({ from: "user", text: this.userMessage });
        this.userMessage = "";
        this.scrollToBottom();

        // 模拟客服回复
        setTimeout(() => {
          this.messages.push({ from: "service", text: "感谢您的留言，我们会尽快回复您！" });
          this.scrollToBottom();
        }, 1000);
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatHistory = this.$refs.chatHistory;
        chatHistory.scrollTop = chatHistory.scrollHeight;
      });
    }
  }
}
</script>

<style scoped>
/* 页面背景和整体布局 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: linear-gradient(to top, #f2e1d6, #f5e2d4); /* 古风的米色渐变 */
}

/* 聊天框的设计 */
.chat-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  height: 90vh; /* 高度占满90%屏幕 */
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* 头部 */
.chat-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #cdb79e; /* 淡金色，符合古风的温暖色调 */
  color: white;
  border-radius: 15px 15px 0 0;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #fff;
}

.service-name {
  font-size: 18px;
  font-weight: bold;
  flex: 1;
}

.status {
  background-color: #d4b9a3; /* 朱砂红偏色 */
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
}

/* 聊天记录 */
.chat-history {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f7f2e7; /* 古风的米色背景 */
  border-bottom: 1px solid #e0e0e0;
}

.chat-message {
  max-width: 85%;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 15px;
  background-color: #f0e5e1; /* 古风淡粉色 */
  transition: background-color 0.3s ease;
}

.message-from-user {
  align-self: flex-end;
  background-color: #c2d2d1; /* 浅绿色，符合古风的雅致色调 */
  color: white;
}

.message-from-service {
  background-color: #f9f3e2; /* 柔和米色 */
}

/* 输入框区域 */
.chat-input-area {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.05);
}

.chat-input {
  flex: 1;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #d1c1a0; /* 适中的米色 */
  border-radius: 25px;
  outline: none;
  transition: border-color 0.3s ease;
}

.chat-input:focus {
  border-color: #c2b49b; /* 浅金色 */
}

.send-button {
  padding: 12px 24px;
  background-color: #9f9a7a; /* 古风灰绿色 */
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 12px;
  transition: background-color 0.3s ease;
}

.send-button:hover {
  background-color: #8e8a71; /* 更深的灰绿色 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .chat-box {
    height: 100%;
    max-width: 100%;
  }

  .chat-header {
    padding: 10px;
  }
}
</style>
