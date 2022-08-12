<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-fofo
        v-model="kw"
        @input="inputFn"
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        @search="goSearchResult(kw)"
      />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="suggerList.length !== 0">
      <div
        class="sugg-item"
        v-for="(item, index) in suggerList"
        :key="index"
        v-html="lightFn(item, kw)"
        @click="goSearchResult(item)"
      ></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="history = []" />
        </template>
      </van-cell>
      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(item, index) in history"
          :key="index"
          @click="goSearchResult(item)"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { suggertionAPI } from '@/api/search'
import { lightFn } from '@/utils/str'
export default {
  name: 'MySearch',
  data() {
    return {
      kw: '', // 搜索关键字
      timer: null, // 定时器
      suggerList: [], // 搜索建议列表
      history: JSON.parse(localStorage.getItem('his')) || [] // 搜索历史
    }
  },
  watch: {
    kw(val) {
      if (val === '') {
        this.suggerList = []
      }
    },
    history() {
      localStorage.setItem('his', JSON.stringify(this.history))
    }
  },
  methods: {
    // 搜索建议联想
    inputFn() {
      if (this.kw.trim().length === 0) return
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const { data: res } = await suggertionAPI({ q: this.kw })
        this.suggerList = res.data.options
      }, 500)
    },
    // 关键词高亮
    lightFn: lightFn,
    // 跳转搜索结果页面
    goSearchResult(item) {
      this.$router.push(`/searchresult/${item}`)
      this.history.push(item)
      this.history = [...new Set(this.history)]
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}

/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
