<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar fixed>
      <template #left>
        <img :src="imgUrl" alt="" class="logo" />
      </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 标签栏 -->
    <van-tabs v-model="active" color="#007bff" sticky offset-top="1.226667rem">
      <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index"> 内容 {{ index }} </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import img from '@/assets/logo.png'
export default {
  name: 'MyHomes',
  data() {
    return {
      imgUrl: img, // logo地址
      active: 0 // 导航栏索引
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}
::v-deep .van-nav-bar .van-icon {
  color: #fff;
}
/* tab内容距离tab导航的距离 */
::v-deep .van-tabs__content {
  padding-top: 44px;
}
</style>
