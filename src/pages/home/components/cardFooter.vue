<template>
  <view class="card-footer">
    <view class="footer-icon">
      <nut-icon name="share" size="12"></nut-icon>
      <text>分享</text>
    </view>
    <view class="footer-icon">
      <nut-icon name="comment" size="12"></nut-icon>
      <text>24</text>
    </view>
    <view class="footer-icon">
      <nut-icon name="star" size="12"></nut-icon>
      <text>30</text>
    </view>
    <view class="footer-icon">
      <nut-icon name="fabulous" size="12"></nut-icon>
      <text>120</text>
    </view>
  </view>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
.card-footer {
  display: flex;
  text-align: center;
  font-weight: 500;
  height: 30px;
  font-size: 13px;
  // color: #222222;
  color: #616161;

  .footer-icon {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 18px;
    height: 18;
  }

  text {
    margin-left: 5px;
  }
}
</style>
