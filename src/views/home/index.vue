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
      <van-tab v-for="item in channList" :title="item.name" :key="item.id">
        <article-list :active="item.id" />
      </van-tab>
    </van-tabs>
    <!-- 编辑频道图标 -->
    <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="show = true" />
    <!-- 弹出层组件 -->
    <van-popup v-model="show" class="edit_wrap">
      <!-- 弹出层的主体区域 -->
      <channel-edit
        v-model="show"
        :userChannList.sync="channList"
        @reset="getChannList()"
        @goChann="goChann"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannListAPI } from '@/api/channels'
import img from '@/assets/logo.png'
import ArticleList from './components/ArtileList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
export default {
  name: 'MyHomes',
  data() {
    return {
      imgUrl: img, // logo地址
      active: 0, // 导航栏索引
      channList: [], // 频道列表
      show: false // 编辑频道弹出层显示
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created() {
    this.getChannList()
  },
  methods: {
    // 获取频道列表
    async getChannList() {
      const { data: res } = await getUserChannListAPI()
      this.channList = res.data.channels
    },
    // 跳转频道
    goChann(id) {
      this.active = id
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
// 设置 tabs 容器的样式
::v-deep .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
/* 频道编辑弹出层铺满屏幕 */
.edit_wrap {
  width: 100%;
  height: 100%;
}
</style>
