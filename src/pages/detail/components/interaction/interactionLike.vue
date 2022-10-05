<template>
   <view class="like-detail-wrapper">
    <!-- 点赞头部信息 -->
    <view class="like-detail">
      <view class="like-avatar-wrapper">
        <nut-avatar size="normal" 
        class="avatar" 
        icon="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F23%2F20210723125859_f6b2f.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667533928&t=af6ec21843f4c1971e7039c445927e92">
        </nut-avatar>
      </view>
      <view>
        <text class="like-user-name">耶耶</text>
        <text class="like-author">作者</text>
        <text class="like-publish-time"> {{timeStr}}</text>
      </view>  
    </view>
    <!-- 点赞图标 -->
    <view class="like-icon">
      <nut-icon name="fabulous" size="12px" color="#fa2c19" /> 赞
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import utils from '@/utils/utils';


const timeStr = ref('')
// 调用特定形式显示时间的公共方法
timeStr.value = utils.publishTimeStr(1664941092067)
</script>
<style lang="scss">
.like-detail-wrapper {
  padding: 5px 0;
  border-bottom: 1px solid rgb(237, 237, 237);
  display: flex;
  justify-items: flex-start;
  align-items: center;
  .like-detail {
    height: 45px;
    margin-right: 35px;
    display: flex;
    align-items: center;

    .like-avatar-wrapper {
      width: 35px;
      display: flex;
      justify-content: center;
      margin-right: 5px;

      .avatar {
        width: 30px;
        height: 30px;
      }

    }

    .like-user-name {
      margin-right: 5px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
    }

    .like-author {
      margin-right: 5px;
      padding: 0 2px;
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      color: white;
      background-color: rgb(225, 72, 72);
      border-radius: 2px;
    }
    .like-publish-time {
      font-weight: 400;
      font-size: 11px;
      line-height: 12px;
      /* 灰阶/Color_grey_4 */
      color: $noteFontColor;
    }

  }
  .like-icon {
    // position: absolute;
    // right: 4px;
    // top: 20px;

    justify-items: flex-end;
    margin-left: auto;
    padding-top: 4px;
    font-size: 12px;
  } 
}
</style>
