<template>
  <div>
    <!-- 文章列表 -->
    <article-item v-for="item in artileList" :key="item.art_id" :obj="item" />
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
      }
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
      this.artileList = res.data.results
      console.log(res)
    }
  }
}
</script>
