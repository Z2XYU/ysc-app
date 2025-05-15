<template>
  <view id="form-container">
    <!-- 图片轮播 -->
    <swiper class="banner-swiper" autoplay="true" interval="3000" indicator-dots="true">
      <swiper-item>
        <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/yuepai1.png" class="banner-image" />
      </swiper-item>
      <swiper-item>
        <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/yuepai2.png" class="banner-image" />
      </swiper-item>
      <swiper-item>
        <image src="https://ysc-1328676482.cos.ap-nanjing.myqcloud.com/my-icons/yuepai3.png" class="banner-image" />
      </swiper-item>
    </swiper>
    <text class="form-description">填写以下信息，让我们为您安排一次专业的摄影体验！</text>

    <!-- 第一部分 -->
    <view class="form-section">
      <!-- 拍摄时间 -->
      <view class="form-row">
        <text class="form-label">拍摄时间：</text>
        <input type="date" v-model="shootingDate" class="form-input" />
      </view>

      <!-- 集合地点 -->
      <view class="form-row" @click="toggleDropdown('location')" ref="dropdownContainer">
        <text class="form-label">集合地点：</text>
        <view class="select-container">
          <text class="location-text">{{ selectedLocation || '请选择地点' }}</text>
          <view v-if="dropdownVisible" class="dropdown-menu">
            <view @click="selectLocation('地点A')" class="dropdown-item">地点A</view>
            <view @click="selectLocation('地点B')" class="dropdown-item">地点B</view>
            <view @click="selectLocation('地点C')" class="dropdown-item">地点C</view>
          </view>
        </view>
      </view>

      <!-- 套餐 -->
      <view class="form-row">
        <text class="form-label">套餐：</text>
        <input type="text" v-model="package" placeholder="输入套餐内容" class="form-input" />
      </view>
    </view>

    <!-- 第二部分 -->
    <view class="form-section">
      <!-- 服务标准 -->
      <view class="form-row">
        <text class="form-label">服务标准：</text>
        <input type="text" v-model="serviceStandard" placeholder="输入服务标准" class="form-input" />
      </view>

      <!-- 服务时长 -->
      <view class="form-row">
        <text class="form-label">服务时长（分钟）：</text>
        <input type="number" v-model="serviceDuration" placeholder="输入时长" class="form-input" />
      </view>

      <!-- 拍摄点位 -->
      <view class="form-row">
        <text class="form-label">拍摄点位（个数）：</text>
        <view class="counter-container">
          <button @click="decrement('shootingPoints')" class="counter-btn" :disabled="shootingPoints <= 0">-</button>
          <text class="counter-value">{{ shootingPoints }}</text>
          <button @click="increment('shootingPoints')" class="counter-btn">+</button>
        </view>
      </view>

      <!-- 底片保底数量 -->
      <view class="form-row">
        <text class="form-label">底片保底数量：</text>
        <input type="number" v-model="baseFilmCount" placeholder="输入底片数量" class="form-input" />
      </view>

      <!-- 精修总数量 -->
      <view class="form-row">
        <text class="form-label">精修总数量：</text>
        <input type="number" v-model="retouchedTotal" placeholder="输入精修数量" class="form-input" />
      </view>
    </view>

    <!-- 照片发送方式 -->
    <view class="form-section">
      <view class="form-row">
        <text class="form-label">照片发送方式：</text>
        <input type="text" v-model="photoDeliveryMethod" placeholder="输入照片发送方式" class="form-input" />
      </view>

      <!-- 摄影师选择 -->
      <view class="form-row" @click="toggleDropdown('photographer')" ref="photographerDropdownContainer">
        <text class="form-label">选择摄影师：</text>
        <view class="select-container">
          <text class="photographer-text">{{ selectedPhotographerName || '请选择摄影师' }}</text>
          <view v-if="photographerDropdownVisible" class="dropdown-menu">
            <view v-for="photographer in photographers" :key="photographer.id" @click="selectPhotographer(photographer.id)" class="dropdown-item">
              {{ photographer.name }}
            </view>
          </view>
        </view>
      </view>
      <text class="note-text">若无指定摄影师，则平台会为您自动匹配摄影师</text>

      <!-- 分隔线 -->
      <view class="divider"></view>

      <!-- 最终价格 -->
      <view class="form-row">
        <text class="form-label">最终价格(元)：</text>
        <input type="number" v-model="finalPrice" placeholder="输入最终价格" class="form-input" />
      </view>
    </view>

    <!-- 提交和重置按钮 -->
    <view class="button-container">
      <button @click="submitForm" class="submit-btn">提交</button>
      <button @click="resetForm" class="reset-btn">重置</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      shootingDate: '',
      selectedLocation: '',
      dropdownVisible: false,
      package: '',
      serviceStandard: '',
      serviceDuration: 0,
      shootingPoints: 0,
      baseFilmCount: 0,
      retouchedTotal: 0,
      photoDeliveryMethod: '',
      selectedPhotographer: '',
      selectedPhotographerName: '',
      photographerDropdownVisible: false,
      photographers: [
        { id: 1, name: '摄影师一号' },
        { id: 2, name: '摄影师二号' },
        { id: 3, name: '摄影师三号' }
      ],
      finalPrice: 0,
    };
  },
  methods: {
    increment(field) {
      if (field === 'shootingPoints') {
        this.shootingPoints++;
      }
    },
    decrement(field) {
      if (field === 'shootingPoints' && this.shootingPoints > 0) {
        this.shootingPoints--;
      }
    },
    toggleDropdown(type) {
      if (type === 'location') {
        this.dropdownVisible = !this.dropdownVisible;
      } else if (type === 'photographer') {
        this.photographerDropdownVisible = !this.photographerDropdownVisible;
      }
    },
    selectLocation(location) {
      this.selectedLocation = location;
      this.dropdownVisible = false;
    },
    selectPhotographer(id) {
      const selected = this.photographers.find(p => p.id === id);
      if (selected) {
        this.selectedPhotographer = id;
        this.selectedPhotographerName = selected.name;
        this.photographerDropdownVisible = false;
      }
    },
    submitForm() {
      console.log({
        shootingDate: this.shootingDate,
        selectedLocation: this.selectedLocation,
        package: this.package,
        serviceStandard: this.serviceStandard,
        serviceDuration: this.serviceDuration,
        shootingPoints: this.shootingPoints,
        baseFilmCount: this.baseFilmCount,
        retouchedTotal: this.retouchedTotal,
        photoDeliveryMethod: this.photoDeliveryMethod,
        selectedPhotographer: this.selectedPhotographer,
        finalPrice: this.finalPrice,
      });
    },
    resetForm() {
      this.shootingDate = '';
      this.selectedLocation = '';
      this.package = '';
      this.serviceStandard = '';
      this.serviceDuration = 0;
      this.shootingPoints = 0;
      this.baseFilmCount = 0;
      this.retouchedTotal = 0;
      this.photoDeliveryMethod = '';
      this.selectedPhotographer = '';
      this.selectedPhotographerName = '';
      this.finalPrice = 0;
    }
  }
};

</script>

<style scoped>
/* 容器样式 */
.banner-swiper {
  margin-left: -20px;
  margin-top: -20px;
  height: 230px;
  width: 110%;
  margin-bottom: 15px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-header {
  text-align: center;
  margin-bottom: 20px;
}

.form-title {
  font-size: 24px;
  color: #333;
  font-weight: bold;
}

.form-description {
  font-size: 14px;
  color: #aeaeae;
}

.reset-btn {
  width: 100%;
  padding: 12px;
  background-color: #9d0f0f;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
}

.reset-btn:hover {
  background-color: #c82333;
}

#form-container {
  max-width: 650px;
  margin: 0 auto;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin: 15px 0;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-label {
  flex: 0 0 130px;
  font-size: 15px;
  color: #333;
}

.form-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f4f4f4;
  color: #555;
}

.select-container {
  flex: 1;
  position: relative;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f4f4f4;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-top: 5px;
  padding: 0;
  list-style: none;
  max-height: 150px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 10px 15px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.counter-container {
  display: flex;
  align-items: center;
}

.counter-btn {
  background-color: #9d0f0f;
  border: none;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 10px;
}

.counter-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.counter-value {
  font-size: 16px;
  color: #333;
}

.note-text {
  font-size: 12px;
  color: #888;
  margin-top: -10px;
  margin-bottom: 15px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #9d0f0f;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #9d0f0f;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 15px 0;
}
</style>
