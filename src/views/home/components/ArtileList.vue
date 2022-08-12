<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 加载更多 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="50"
        :immediate-check="false"
      >
        <!-- 文章列表 -->
        <article-item
          v-for="item in artileList"
          :key="item.art_id"
          :obj="item"
          @click.native="$router.push(`/articledetail?id=${item.art_id}`)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArtileItem.vue'
import { getArtileListAPI } from '@/api/artile'
export default {
  props: {
    active: Number // 频道id
  },
  data() {
    return {
      artileList: [], // 文章列表
      query: {
        channel_id: '',
        timestamp: new Date().getTime()
      },
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  components: {
    ArticleItem
  },
  created() {
    this.getArtileList()
  },
  methods: {
    // 获取文章列表
    async getArtileList() {
      this.query.channel_id = this.active
      const { data: res } = await getArtileListAPI(this.query)
      this.artileList = [...this.artileList, ...res.data.results]
      this.query.timestamp = res.data.pre_timestamp
      this.loading = false
      if (res.data.pre_timestamp === null) {
        this.finished = true
      }
    },
    // 加载更多
    onLoad() {
      if (this.artileList.length > 0) {
        this.getArtileList()
      }
    },
    // 下拉刷新
    onRefresh() {
      this.query.timestamp = new Date().getTime()
      this.artileList = []
      this.getArtileList()
    }
  }
}
</script>
