<template>
  <!--1. 短评论 -->
  <view class="comment-detail-wrapper">
    <!-- 评论头部信息 -->
    <view class="comment-detail">
      <view class="comment-avatar-wrapper">
        <nut-avatar size="normal" 
        class="avatar" 
        icon="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F23%2F20210723125859_f6b2f.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667533928&t=af6ec21843f4c1971e7039c445927e92">
        </nut-avatar>
      </view>
      <view>
        <text class="comment-user-name">耶耶</text>
        <text class="comment-author">作者</text>
        <text class="comment-publish-time"> {{timeStr}}</text>
      </view>
    </view>
    <!-- 评论内容 -->
    <view class="comment-content">
      <view class="comment-word">
        在这里评论大胖崽 @Tina
      </view>
      <view class="comment-like">
        <nut-icon name="fabulous" size="12px" /> 3
      </view>
    </view>
  </view>
  <!--2. 长评论 -->
  <view class="comment-detail-wrapper">
    <!-- 评论头部信息 -->
    <view class="comment-detail">
      <view class="comment-avatar-wrapper">
        <nut-avatar size="normal" 
        class="avatar" 
        icon="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F23%2F20210723125859_f6b2f.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667533928&t=af6ec21843f4c1971e7039c445927e92">
        </nut-avatar>
      </view>
      <view>
        <text class="comment-user-name">耶耶</text>
        <text class="comment-author">作者</text>
        <text class="comment-publish-time"> {{timeStr}}</text>
      </view>
    </view>
    <!-- 评论内容 -->
    <view class="comment-content">
      <view class="comment-word">
        我的理解是，耶耶作为雪橇犬，不能天天卖萌，应该发挥应有的家庭作用：比如，在拆家时给它惩罚，自己学会洗澡和捡屎，不能抗拒狗粮只吃肉肉等等。
      </view>
      <view class="comment-like">
        <nut-icon name="fabulous" size="12px" /> 300
      </view>
    </view>
  </view>
  <!-- 3. 回复评论 -->
  <view class="comment-detail-wrapper">
    <!-- 评论头部信息 -->
    <view class="comment-detail">
      <view class="comment-avatar-wrapper">
        <nut-avatar size="normal" 
        class="avatar" 
        icon="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F23%2F20210723125859_f6b2f.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667533928&t=af6ec21843f4c1971e7039c445927e92">
        </nut-avatar>
      </view>
      <view>
        <text class="comment-user-name">耶耶</text>
        <text class="comment-author">作者</text>
        <text class="comment-publish-time"> {{timeStr}}</text>
      </view>
    </view>
    <!-- 评论内容 -->
    <view class="comment-content">
      <view class="comment-word">
        大家来评评理
      </view>
      <view class="comment-like">
        <nut-icon name="fabulous" size="12px" /> 3
      </view>
    </view>
    <!--3.1 一级回复评论部分 -->
    <view class="comment-reply-wrapper">
    <!-- 回复评论头部信息 -->
      <view class="comment-detail">
        <view class="comment-avatar-wrapper">
          <nut-avatar size="normal" 
          class="avatar" 
          icon="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F23%2F20210723125859_f6b2f.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667533928&t=af6ec21843f4c1971e7039c445927e92">
          </nut-avatar>
        </view>
        <view>
          <text class="comment-user-name">Tina</text>
          <!-- <text class="comment-author">作者</text> -->
          <text class="comment-publish-time"> {{timeStr}}</text>
        </view>
      </view>
      <!-- 评论内容 -->
      <view class="comment-content">
        <view class="comment-word">
          十分同意！！
        </view>
        <view class="comment-like">
          <nut-icon name="fabulous" size="12px" /> 3
        </view>
      </view>
    </view>
    <!--3.2 二级回复评论部分 -->
    <view class="comment-reply-wrapper">
    <!-- 回复评论头部信息 -->
      <view class="comment-detail">
        <view class="comment-avatar-wrapper">
          <nut-avatar size="normal" 
          class="avatar" 
          icon="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F23%2F20210723125859_f6b2f.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667533928&t=af6ec21843f4c1971e7039c445927e92">
          </nut-avatar>
        </view>
        <view>
          <text class="comment-user-name">耶耶</text>
          <text class="comment-author">作者</text>
          <text class="comment-publish-time"> {{timeStr}}</text>
        </view>
      </view>
      <!-- 评论内容 -->
      <view class="comment-content">
        <view class="comment-word">
          回复Tina: 但是耶耶真的好可爱，真滴忍心让崽宝儿干这么多活儿吗，小朋友还是要劳逸结合呜呜呜。
        </view>
        <view class="comment-like">
          <nut-icon name="fabulous" size="12px" /> 3
        </view>
      </view>
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
.comment-detail-wrapper {
  padding: 5px 0;
  border-bottom: 1px solid rgb(237, 237, 237);
  .comment-detail {
    height: 45px;
    display: flex;
    align-items: center;

    .comment-avatar-wrapper {
      width: 35px;
      display: flex;
      justify-content: center;
      margin-right: 5px;

      .avatar {
        width: 30px;
        height: 30px;
      }

    }

    .comment-user-name {
      margin-right: 5px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
    }

    .comment-author {
      margin-right: 5px;
      padding: 0 2px;
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      color: white;
      background-color: rgb(225, 72, 72);
      border-radius: 2px;
    }
    .comment-publish-time {
      font-weight: 400;
      font-size: 11px;
      line-height: 12px;
      /* 灰阶/Color_grey_4 */
      color: $noteFontColor;
    }

  }

  .comment-content {
    padding-left: 35px;
    position: relative;
    
    .comment-word {  
      margin-right: 35px;
      font-family: $fontFamilyText;
      font-size: 15px;
      font-weight: 400;
      line-height: 24px;
      color: #3d3d3d;
      // color: #454545;
      text-align: left
    } 

    .comment-like {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 12px;
    }
  }
  .comment-reply-wrapper {
    padding-left: 35px;
  }
}
</style>
