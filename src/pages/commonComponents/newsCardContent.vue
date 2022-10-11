<template>
  <view class="news-card-content">
    <view class="news-content-title">
      {{ contentTitle }}
    </view>
    <view class="news-content-text">
      {{ contentText.length > 46 ? `${contentText.substring(0, 46)}...` : contentText }}
    </view>
  </view>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
defineProps(['contentText', 'contentTitle'])
</script>
<style lang="scss">
.news-content-title {
  font-family: $fontFamilyText;
  line-height: 30px;
  text-align:left;
  font-size: 18px;
}
.news-content-text {
  font-family: $fontFamilyText;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #868585;
  text-align:left
}
</style>
