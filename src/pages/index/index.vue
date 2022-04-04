<template>
  <view class="content">
    111
    <image class="logo" src="/static/logo.png" />
    <uni-badge text="1" />
    <button type="primary" @click="onClick">
      页面主操作 Loading
    </button>
    <view class="text-area">
      <text class="title mt-4">
        {{ title }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
const title = ref('Hello')

function onClick() {
  title.value = 'kkk'
}
</script>

<style lang="scss">
.content {
  color: $uni-color-primary;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
