<template>
  <view class="interaction-wrapper">
    <nut-tabs 
      v-model="state.tabIndex"  
      :background = styleConfig.backgroundColor 
      :color = styleConfig.themeColor>
        <nut-tabpane title="转发 23" >
          <view class="interaction-tabpane">
            <InterationForward />
          </view>
        </nut-tabpane>
        <nut-tabpane title="评论 18" >
          <view class="interaction-tabpane">
            <InteractionComment />
          </view>
        </nut-tabpane>
        <nut-tabpane title="赞 200" >
          <view class="interaction-tabpane">
            <InteractionLike />
          </view>
        </nut-tabpane>
    </nut-tabs>
  </view>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { styleConfig } from '@/const'
import InterationForward from './interationForward.vue';
import InteractionComment from './interactionComment.vue';
import InteractionLike from './interactionLike.vue';

const state = reactive({
  // 默认出现 评论区 tab栏内容，索引为 1
  tabIndex: '1'
})
</script>
<style lang="scss">
.interaction-wrapper {
  margin-top: 10px;
  border-top: solid 6px rgb(237, 237, 237);
  font-family: 'PingFang SC';
  .interaction-tabpane {
    margin-top: -25px;
  }
}
</style>
