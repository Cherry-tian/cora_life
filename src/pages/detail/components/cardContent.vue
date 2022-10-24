<template>
  <view class="card-content">
    <view class="content-title" v-if="isOfficial">
      {{contentTitle}}
    </view>
    <view class="content-word">
      {{contentText}}
    </view>
    <view class="content-img">
      <!-- 只取三张图片 -->
      <img 
        class="img-item" 
        v-for="(url, index) in (imgList.length > 9? 
        imgList.slice(0,9): imgList)" 
        :key="url"
        :src="url" 
        @tap="showFn(index)"
      />
      <nut-imagepreview :show="showPreview" :images=imgData @close=hideFn :init-no=initNo />
    </view>
  </view>
</template>
<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
const props = defineProps(['contentText', 'imgList', 'isOfficial', 'contentTitle'])
const showPreview = ref(false)
const initNo = ref(1)
// 计算属性直接获取响应式数据
const imgData = computed(() => {
  return props.imgList.map((url: string) => {
    return {
      src: url
    }
  })
})
const showFn = (index) => {
  initNo.value = index + 1
  showPreview.value = true;
}
const hideFn = () => {
  showPreview.value = false;
}
</script>
<style lang="scss">
.content-title {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  text-align: left
}
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
  text-align: left;

  .img-item {
    width: 108px;
    height: 108px;
    margin-top: -3px;
    border-radius: 4px 4px 4px 4px;
    margin-left: 2px;
  }

}
</style>
