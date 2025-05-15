<template>


  <view class="order-container">
    <!-- 用户基本信息 -->
    <view class="fullscreen-gradient-bg"></view>
    <view class="navbar-wrapper">
      <!-- 导航栏 -->
      <view class="navbar">
        <view class="nav-item">首页</view>
        <view class="nav-item">预约记录</view>
        <view class="nav-item">帮助/常见问题</view>
        <view class="nav-item ">个人中心</view>
        <view class="nav-item extra-nav-item">特惠大件</view>
        <view class="nav-item extra-nav-item">港澳台寄件</view>
        <!-- 订单按钮 -->
        <view class="order-icon" onclick="toggleOrder(this)">
          <view class="order-box">
            <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/booking.png" alt="订单" class="order-img" />
            <text class="order-text">订单</text>
          </view>
        </view>
      </view>
    </view>

    <view class="search-container">
      <!-- 搜索图标 -->
      <view class="search-icon">
        <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/search.png" class="icon-img" />
      </view>

      <!-- 搜索框 -->
      <input
          class="search-input"
          placeholder="请输入搜索内容"
      />

      <!-- 下拉菜单 -->
      <view
          v-if="showDropdown"
          class="dropdown-menu"
          @mousedown.stop.prevent="preventBlur"
      >
        <view
            class="dropdown-item"
            v-for="item in recentSearches"
            :key="item"
            @click="selectSearch(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>

    <view class="section">
      <!-- 图标和文字部分 -->
      <view class="icon-container">
        <!-- 第一个图标及文字 -->
        <view class="icon">
          <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/yuyue.png" class="icon-image" />
          <text class="icon-text">预约时间</text>
        </view>
        <!-- 分割线 -->
        <view class="divider"></view>

        <!-- 第二个图标及文字 -->
        <view class="icon">
          <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/weizhi.png" class="icon-image" />
          <text class="icon-text">衣柜位置</text>
        </view>

        <!-- 分割线 -->
        <view class="divider"></view>

        <!-- 第三个图标及文字 -->
        <view class="icon">
          <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/weizhi.png" class="icon-image" />
          <text class="icon-text">衣柜编号</text>
        </view>

        <!-- 分割线 -->
        <view class="divider"></view>

        <!-- 第四个图标及文字 -->
        <view class="icon">
          <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/queren.png" class="icon-image" />
          <text class="icon-text">确认预约</text>
        </view>
      </view>
    </view>


    <!-- 预约时间 -->
    <view class="section">
      <text class="section-title">预约时间</text>

      <!-- 选择取件日期 -->
      <view class="form-item">
        <text>取件日期：</text>
        <picker mode="date" @change="onPickUpDateChange">
          <view class="picker">{{ pickUpDate || '请选择日期' }}</view>
        </picker>
      </view>

      <!-- 选择取件时间 -->
      <view class="form-item" v-if="pickUpDate">
        <text>取件时间：</text>
        <picker mode="time" @change="onPickUpTimeChange">
          <view class="picker">{{ pickUpTime || '请选择时间' }}</view>
        </picker>
      </view>
    </view>

    <view class="section">
      <text class="section-title">选择衣柜位置</text>
      <view class="form-item">
        <text>衣柜位置：</text>

        <!-- Picker 组件用于选择衣柜位置 -->
        <picker mode="selector" :range="lockerOptions" @change="onLockerLocationChange">
          <view class="picker">
            <!-- 显示选择的衣柜位置 -->
            <input :value="formData.lockerLocation" placeholder="请选择衣柜位置" disabled />
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text>衣柜编号：</text>
        <input type="number" placeholder="请输入衣柜编号" v-model="formData.lockerNumber" />
      </view>
    </view>

    <view class="section">
      <text class="section-title">手机验证</text>

      <!-- 手机号输入框 -->
      <view class="form-item">
        <text>手机号：</text>
        <input
            type="number"
            maxlength="11"
            placeholder="请输入手机号"
            v-model="phoneNumber"
            class="input-field"
        />
      </view>

      <!-- 验证码输入和发送按钮 -->
      <view class="form-item">
        <text>验证码：</text>
        <input
            type="number"
            maxlength="6"
            placeholder="请输入验证码"
            v-model="verificationCode"
            class="input-field code-input"
        />
        <button
            class="send-code-btn-inline"
            :disabled="isButtonDisabled"
            @click="sendVerificationCode"
        >
          {{ isCounting ? countdown + 's后重发' : '发送' }}
        </button>
      </view>
      <button @click="submitOrder">提交订单</button>
    </view>

    <!-- 提交与确认 -->
  </view>

</template>

<script>
export default {
  data() {
    return {
      // 存储表单数据
      phoneNumber: '', // 手机号
      isCounting: false, // 是否在倒计时
      countdown: 60, // 倒计时秒数
      timer: null, // 倒计时计时器
      pickUpDate: '', // 取件日期
      pickUpTime: '', // 取件时间
      formData: {
        // 衣柜选择相关
      },
      // 衣柜位置选项
      lockerOptions: ['河南省郑州市中原区长椿路141号', '河南省郑州市中原区长椿路辅路', '河南省郑州市中原区科学大道','河南省郑州市中原区翠竹街辅路', '河南省郑州市中原区须水河东路', '河南省郑州市中原区梧桐街','河南省郑州市中原区西四环', '河南省郑州市中原区白桦街', '河南省洛阳市老城区马市街121号'],
    };
  },
  computed: {
    // 按钮是否禁用
    isButtonDisabled() {
      return !this.phoneNumber || this.isCounting || this.phoneNumber.length !== 11;
    }
  },
  methods: {
    chooseLocation(field) {
      // 模拟定位功能
      this.formData[field] = "定位结果地址";
    },
    calculateFee() {
      // 示例计算费用逻辑
      return 20 + (this.formData.deliverySpeed === '加急' ? 10 : 0);
    },
    submitOrder() {
      console.log("订单详情：", this.formData);
      uni.showToast({
        title: "订单提交成功",
        icon: "success"
      });
    },
    // 衣柜位置选择后的事件处理
    onLockerLocationChange(e) {
      // e.detail.value 是用户选择的选项的索引值
      this.formData.lockerLocation = this.lockerOptions[e.detail.value];
    },
    onPickUpDateChange(event) {
      this.pickUpDate = event.detail.value;
      this.pickUpTime = ''; // 重置时间选择
    },

    // 选择取件时间
    onPickUpTimeChange(event) {
      this.pickUpTime = event.detail.value;
    },
    sendVerificationCode() {
      if (!this.validatePhoneNumber(this.phoneNumber)) {
        uni.showToast({
          title: '请输入有效的手机号',
          icon: 'none'
        });
        return;
      }

      // 假设发送成功后启动倒计时
      this.startCountdown();
    },

    // 验证手机号格式
    validatePhoneNumber(phone) {
      const phoneRegex = /^1[3-9]\d{9}$/;
      return phoneRegex.test(phone);
    },

    // 启动倒计时
    startCountdown() {
      this.isCounting = true;
      this.countdown = 60;
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.isCounting = false;
          clearInterval(this.timer);
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    // 页面销毁前清除计时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style>
/* 页面整体样式 */
.navbar-wrapper {
  width: 100%;
  overflow-x: auto; /* 支持横向滑动 */
  position: relative;
  color: #ffffff;
}

.navbar {
  display: flex;
  align-items: center;
  margin-top: 10rpx;
  height: 40px; /* 设置导航栏高度 */
  padding: 0 10px;
}

.nav-item {
  padding: 0 10px;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
}

.extra-nav-item {
  display: none; /* 默认隐藏额外的导航项 */
}

/* 订单图标容器样式 */
/* 订单图标容器 */
.order-icon {
  position: fixed; /* 固定定位 */
  top: 10px; /* 距离底部 20px */
  right: 20px; /* 距离右侧 20px */
  z-index: 9999; /* 优先层级最高 */
}

/* 订单按钮 */
.order-box {
  background-color: #ffffff; /* 背景颜色 */
  color: #a10f0f; /* 文本颜色 */
  border-radius: 5px; /* 圆角 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px; /* 调整内边距 */
  height: 26px; /* 与导航栏高度匹配 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  transition: height 0.5s ease, flex-direction 0.5s ease; /* 平滑过渡容器变化 */
  overflow: hidden; /* 防止内容溢出 */
}

/* 图标样式 */
.order-img {
  width: 20px; /* 图标大小 */
  height: 20px;
  margin-right: 5px; /* 图标与文字的间距 */
  position: relative; /* 相对定位，便于调整 */
  transition: all 0.5s ease; /* 平滑过渡 */
}

/* 文字样式 */
.order-text {
  font-size: 14px; /* 文本大小 */
  font-weight: bold; /* 文本加粗 */
  position: relative; /* 相对定位 */
  transition: all 0.5s ease; /* 平滑过渡 */
}

/* 点击后的样式 */
.order-box.active {
  height: 100px; /* 容器高度增加 */
  flex-direction: column; /* 改为纵向排列 */
  align-items: center;
  justify-content: center;
}

/* 点击后图标位置 */
.order-box.active .order-img {
  margin-bottom: 10px; /* 图标移动到顶部 */
}

/* 点击后文字位置 */
.order-box.active .order-text {
  margin-top: 10px; /* 文字移动到底部 */
}
/* 搜索框容器 */
.search-container {
  position: relative;
  width: 93%;
  max-width: 400px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  border-radius: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding-left: 10px;
}

/* 搜索图标 */
.search-icon {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
}

.icon-img {
  width: 20px;
  height: 20px;
}

/* 搜索输入框 */
.search-input {
  flex: 1;
  height: 40px;
  padding: 0 10px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  outline: none;
  background-color: transparent;
}

/* 下拉菜单 */
.dropdown-menu {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 10;
}

.dropdown-item {
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}


/* 模块分区样式 */
.section {
  margin-left: 9px;
  margin-bottom: 10px;
  width:340px;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.picker {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 24px;
  margin-top: 6px;
  background-color: #ffffff; /* 改为白色 */
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.picker:hover {
  background-color: #f8f9fa; /* 鼠标悬停时背景微调为浅灰色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.picker input {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: #495057;
  text-align: center;
  background: none;
  border: none;
  outline: none;
  pointer-events: none; /* 确保 input 不可点击 */
}

.picker input::placeholder {
  color: #adb5bd;
}

.picker input:disabled {
  color: #495057;
}

.picker:active {
  background-color: #e9ecef; /* 点击时稍深的灰色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  border-left: 4px solid #9d0f0f; /* 更新颜色 */
  padding-left: 8px;
}

/* 表单项样式 */
.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.form-item text {
  flex: 0 0 100px;
  font-size: 16px;
  color: #555;
}

.form-item input {
  flex: 1;
  height: 36px;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
}

.form-item input:focus {
  border-color: #9d0f0f; /* 更新颜色 */
  box-shadow: 0 0 4px rgba(157, 15, 15, 0.3); /* 更新颜色 */
}

/* 按钮样式 */
button {
  padding: 10px 16px;
  background-color: #9d0f0f; /* 更新颜色 */
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
}

button:active {
  background-color: #730a0a; /* 更新颜色，按下时稍深 */
}

button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}


.radio-group label {
  margin-right: 12px;
  font-size: 14px;
  color: #555;
}

.radio-group label radio {
  margin-right: 6px;
}

/* 下拉选择框 */
.picker {
  flex: 1;
  height: 36px;
  padding: 8px 10px;
  font-size: 14px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.fullscreen-gradient-bg {
  position: fixed; /* 背景固定 */
  top: 0;
  left: 0;
  width: 100vw; /* 占满屏幕宽度 */
  height: 80vh; /* 占满屏幕高度 */
  z-index: -1; /* 优先级最低 */
  background: linear-gradient(to bottom, #a10f0f, #ffffff); /* 渐变背景 */
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

/* 图标样式 */
.icon {
  flex: 0 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 图标图片样式 */
.icon-image {
  width: 20px;
  height: 20px;
  margin-bottom: 5px; /* 图标和文字之间的间距 */
}

/* 图标文字样式 */
.icon-text {
  font-size: 14px;
  color: #555;
}

/* 分割线样式 */
.divider {
  flex: 1;
  height: 2px;
  background-color: #9d0f0f;
  margin: 0 5px;
}
.input-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f3f3f3;
  color: #333;
}

/* 验证码输入框调整 */
.code-input {
  flex: 0.6;
  margin-right: 10px;
}

/* 发送验证码按钮样式（行内显示） */
.send-code-btn-inline {
  flex: 0.4;
  padding: 8px; /* 调整 padding 使按钮大小一致 */
  border-radius: 5px;
  background-color: #9d0f0f;
  color: #ffffff;
  font-size: 14px; /* 调整字体大小 */
  text-align: center;
  border: none;
  white-space: nowrap; /* 禁止按钮文字换行 */
  overflow: hidden;
  text-overflow: ellipsis; /* 如果文字超出则显示省略号 */
}

/* 禁用按钮样式 */
.send-code-btn-inline:disabled {
  background-color: #ccc;
}
</style>