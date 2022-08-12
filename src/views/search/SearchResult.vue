<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
    </div>
    <!-- 搜索列表 -->
    <div>
      <artile-item v-for="item in searchList" :key="item.art_id" :obj="item" />
    </div>
  </div>
</template>

<script>
import { getSearchAPI } from '@/api/search'
import ArtileItem from '@/components/ArtileItem.vue'
export default {
  name: 'SearchResult',
  data() {
    return {
      searchList: [], // 搜索结果列表
      query: {
        page: 1,
        per_page: 10,
        q: this.$route.params.kw
      }
    }
  },
  components: {
    ArtileItem
  },
  created() {
    this.getSearchList()
  },
  methods: {
    // 获取搜索结果
    async getSearchList() {
      const { data: res } = await getSearchAPI(this.query)
      this.searchList = res.data.results
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
::v-deep .van-nav-bar .van-icon {
  color: #fff;
}
</style>
