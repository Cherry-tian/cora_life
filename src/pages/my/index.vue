<template>
  <div class="demo">
    <h2>基础用法</h2>
    <nut-cell>
      <nut-list
        :container-height="300"
        :height="20"
        :listData="data.defultList"
        @scroll-bottom="handleScroll"
      >
        <template v-slot="{ item }">
          <li class="list-item">
            {{ item }}
          </li>
        </template>
        <!-- <li class="list-item" v-for="(item, index) in data.defultList" :key="index">{{`item:${item}, index: ${index}`}}</li> -->
        <!-- nut-list中自带v-for能力？取到的直接是item了 -->
      </nut-list>
    </nut-cell>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const data = reactive({
  defultList: [],
});

const handleScroll = () => {
  console.log('test')
  let arr = new Array(20).fill(0);
  const curLen = data.defultList.length;
  let nxtArr = arr.map((item: number, index: number) => curLen + index + 1)
  data.defultList = data.defultList.concat(nxtArr)

  console.log('data.defultList',data.defultList)
};

onMounted(() => {
  let arr = new Array(20).fill(0)
  data.defultList = arr.map((item: number, index: number) => index + 1);
  store.commit('changeHomePageLoading', false)

  // setInterval(() => {
  //   handleScroll()
  // }, 1000)
})
</script>
<style lang="scss">
.demo {
  height: 100%;
  .nut-cell {
    height: 100%;
  }
  .list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    background-color: #f4a8b6;
    border-radius: 10px;
  }
}
</style>
