<template>
  <view class="index">
    <text>{{ name}}</text>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.scss'

export default {
  setup () {
    const msg = ref('Hello world')
    const name = ref('大胖砸')
    return {
      msg,
      name
    }
  }
}
</script>
