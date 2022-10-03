<template>
  <view class="card-user">
    <view class="avatar-wrapper">
      <nut-avatar size="normal" 
      class="avatar" 
      :icon="authorInfo.avatar_url">
      </nut-avatar>
    </view>
    <view>
      <text class="user-name">{{authorInfo.name}}</text>
      <text class="publish-time"> {{timeStr}}</text>
    </view>
  </view>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
const props = defineProps(['authorInfo', 'createTime'])

const timeStr = ref('')
// 优化：对今天的数据显示「xx小时前或xx分钟前」；对昨天的数据显示「昨天12:32」;再往前只显示日期「08-19」
const publishTimeStr = (createTime) => {
  if (isToday(createTime)) {
    const createTimeHour = new Date(createTime).getHours()
    const currHour = new Date().getHours()
    if (createTimeHour !== currHour) {
      return `${currHour - createTimeHour} 小时前`
    } else {
      const createTimeMin = new Date(createTime).getMinutes()
      const currMin = new Date().getMinutes()
      return `${currMin - createTimeMin} 分钟前`
    }
  } else if (isYesterday(createTime)) {
    return `昨天${new Date(createTime).getHours()}:${new Date(createTime).getMinutes()}`
  } else {
    const createDate = new Date(createTime)
    return `${createDate.getMonth() + 1}-${createDate.getDate()}`
  }
}
// 前提：判断今天还是昨天的函数
const isToday = (createTime) => {
  if (new Date().toDateString() === new Date(createTime).toDateString()) return true
  return false
}
const isYesterday = (createTime) => {
  const yesterday = createTime - 24 * 60 * 60 * 1000
  if (new Date(yesterday).getFullYear() === new Date().getFullYear()
    && new Date(yesterday).getMonth() === new Date().getMonth()
    && new Date(yesterday).getDate() === new Date().getDate()) {
    return true
  }
  return false
}
timeStr.value = publishTimeStr(props.createTime)
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
    color: $noteFontColor;
  }


}
</style>
