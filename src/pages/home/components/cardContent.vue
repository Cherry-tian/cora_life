<template>
  <view class="card-content">
    <view class="content-word">
      近日，深圳市有核酸检测异常人员曾到访深圳市海吉星国际农产品物流园。为迅速控制疫情，阻断疫情传播扩散，尽可能减少对居民朋友健康和生活的影响。
    </view>
    <view class="content-img">
      <img class="img-item"
        src="https://img0.baidu.com/it/u=2723059466,3402721373&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=292" />
      <img class="img-item"
        src="https://img2.baidu.com/it/u=3209554708,2431171739&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=749" />
      <img class="img-item"
        src="https://img2.baidu.com/it/u=1473761528,3380340253&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=495" />
    </view>
  </view>
</template>
<script setup lang="ts">

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

  :first-child {
    border-radius: 4px 0 0 4px;
  }

  :last-child {
    border-radius: 0px 4px 4px 0px;
  }

  .img-item {
    width: 109px;
    height: 109px;
    border-left: 10px;
    margin-left: 2px;
  }

}
</style>
