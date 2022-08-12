<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
    </div>
    <!-- 搜索列表 -->
    <div>
      <!-- 加载更多 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <artile-item
          v-for="item in searchList"
          :key="item.art_id"
          :obj="item"
          :isShow="false"
          @click.native="$router.push(`/articledetail?id=${item.art_id}`)"
        />
      </van-list>
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
      },
      loading: false,
      finished: false
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
      this.searchList = [...this.searchList, ...res.data.results]
      this.query.page++
      this.loading = false
      if (res.data.results.length === 0) {
        this.finished = true
      }
    },
    // 加载更多
    onLoad() {
      if (this.searchList.length > 0) {
        this.getSearchList()
      }
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
