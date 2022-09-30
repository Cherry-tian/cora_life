<template>
  <view class="card-content">
    <view class="content-word">
      {{contentText}}
      <!-- ellipsis 文本省略组件，但是实现效果不好。 -->
      <!-- <nut-ellipsis 
      rows=3
      direction="end" 
      expandText="全文" 
      :content="contentText" >
      </nut-ellipsis> -->
    </view>
    <view class="content-img">
      <!-- 只取三张图片 -->
      <img class="img-item" v-for="url in (imgList.length > 3? imgList.slice(0,3): imgList)" :key="url" :src="url" />
    </view>
  </view>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
defineProps(['contentText', 'imgList'])
</script>
<style lang="scss">
.content-word {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #3d3d3d;
  // color: #454545;
  text-align: left
}

.content-img {
  margin-top: 10px;
  text-align: center;

  .img-item {
    width: 109px;
    height: 109px;
    border-radius: 4px 4px 4px 4px;
    margin-left: 2px;
  }

}
</style>
