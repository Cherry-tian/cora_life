<template>
  <view class="card-user">
    <view class="avatar-wrapper">
      <nut-avatar size="normal" class="avatar"
        icon="https://imgs.qunarzz.com/sight/p0/201308/08/41150dacc0e3a0c8c8d65eac.jpg_710x360_e2fb0065.jpg">
      </nut-avatar>
    </view>
    <view>
      <text class="user-name">卡卡叔 Jacle</text>
      <text class="publish-time"> 1天前</text>
    </view>
  </view>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
.card-user {
  height: 45px;
  display: flex;
  align-items: center;

  .avatar-wrapper {
    width: 35px;
    display: flex;
    justify-content: center;
    margin-right: 5px;

    .avatar {
      width: 30px;
      height: 30px;
    }

  }

  .user-name {
    margin-right: 5px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
  }

  .publish-time {
    font-weight: 400;
    font-size: 11px;
    line-height: 12px;
    /* 灰阶/Color_grey_4 */
    color: #999999;
  }


}
</style>
