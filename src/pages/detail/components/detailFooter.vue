<template>
  <view class="detail-footer-wrapper">
    <view class="detail-footer">
      <view class="detail-footer-comment" @tap="state.showCommentInput = true">
        <nut-icon name="edit" size="16" /> 写评论...
      </view>
      <view class="detail-footer-icon-wrapper">
        <view class="detail-footer-icon">
          <nut-icon name="share-n" size="18"></nut-icon>
        </view>
        <view class="detail-footer-icon">
          <nut-icon name="comment" size="18"></nut-icon>
        </view>
        <view class="detail-footer-icon">
          <nut-icon name="star-n" size="18"></nut-icon>
        </view>
        <view class="detail-footer-icon">
          <nut-icon name="fabulous" size="18"></nut-icon>
        </view>
      </view>
    </view>
  </view>
  <!-- 底部输入评论弹出层 -->
  <nut-popup pop-class="popclass" 
    :style="{ height: '30%' }" 
    position="bottom"
    v-model:visible="state.showCommentInput" 
    :z-index="100"
    >
      <nut-input
      v-model="state.textarea"
      label="评论:"
      type="textarea"
      show-word-limit
      rows="8"
      max-length="100"
      placeholder="请输入评论"
    />
    </nut-popup>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  showCommentInput: false,
  textarea: ''
})
</script>
<style lang="scss">
.detail-footer-wrapper{
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 40px;
  z-index: 9;
  border-top: 1px solid rgb(237, 237, 237);
  background-color: white;

  .detail-footer {
    display: flex;
    flex-direction: row;

    .detail-footer-comment {
      margin-left: 17px;
      padding: 0 16px;
      width: 140px;
      line-height: 32px;
      background-color: rgb(244, 244, 244);
      border-radius: 16px;
    }
    .detail-footer-icon-wrapper {
      display: flex;
      flex-direction: row;
      width: 180px;

      .detail-footer-icon {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
