<template>
  <view class="feed-car">
    <CardUser />
    <CardContent />
    <CardFooter />
  </view>
</template>

<script setup lang="ts">
import CardContent from "./cardContent.vue";
import CardUser from "./cardUser.vue";
import CardFooter from "./cardFooter.vue";

</script>
<style lang="scss">
.feed-car {
  max-height: 301px;
  border-bottom: 1px solid #ebebeb;
}
</style>
