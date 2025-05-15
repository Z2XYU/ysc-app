<template>
  <view class="container">
    <image mode="aspectFill" class="full-screen" :src="url"></image>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        url: '',
      };
    },
    onLoad(options) {
      this.url = options.url || '';
    },
    methods: {},
  };
</script>

<style>
  .container {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .full-screen {
    width: 100%;
    height: 100%;
  }
</style>
