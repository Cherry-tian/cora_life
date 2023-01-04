<template>
  <ul class="infiniteUl" id="scroll" style="height: 500px;">
    <nut-infiniteloading
      containerId = 'scroll'
      :use-window='false'
      :has-more="hasMore"
      @load-more="loadMore"
    >
      <!-- <li class="infiniteLi" v-for="(item, index) in data.defultList" :key="index">{{item}}</li> -->
      <nut-list
        :container-height="500"
        :height="50"
        :listData="data.defultList"
      >
        <template v-slot="{ item }">
          <li class="infiniteLi">
            {{ item }}
          </li>
        </template>
        <!-- <li class="list-item" v-for="(item, index) in data.defultList" :key="index">{{`item:${item}, index: ${index}`}}</li> -->
        <!-- nut-list中自带v-for能力？取到的直接是item了 -->
      </nut-list>

    </nut-infiniteloading>
  </ul>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const hasMore = ref(true);
const data = reactive({
  defultList: []
});
const loadMore = done => {  
  setTimeout(() => {
    let arr = new Array(20).fill(0);
    const curLen = data.defultList.length;
    let nxtArr = arr.map((item: number, index: number) => curLen + index + 1)
    data.defultList = data.defultList.concat(nxtArr)

    // 终点判断
    if (data.defultList.length > 200) hasMore.value = false;
    done()
  }, 500);
};

onMounted(() => {
  let arr = new Array(20).fill(0)
  data.defultList = arr.map((item: number, index: number) => index + 1);

  store.commit('changeHomePageLoading', false)
});
</script>
<style lang="scss">
.publish-wrapper {
  padding-top: 10px;
  .publish-title {
    font-weight: 500;
  }
  .publish-content {
    display: flex;
    justify-content: center;
    .content-button {
      width: 50px;
      margin: 5px 15px 0 0;
    }
  }
  .img-uploader {
    padding-left: 25px;
  }
  .publish-list {
    
    margin-top: 20px;
    padding: 20px 25px;
  }
}
.compile-helper {
  height: 0px;
}

.infiniteUl {
  height: 500px;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background:#eee
}
.infiniteLi {
  // margin-top: 10px;
  height: 50px;
  font-size: 14px;
  background-color: #f4a8b6;
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
