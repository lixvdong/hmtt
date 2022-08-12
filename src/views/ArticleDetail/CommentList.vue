<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list">
      <!-- 评论的 Item 项 -->
      <div class="cmt-item" v-for="item in commentList" :key="item.com_id">
        <!-- 头部区域 -->
        <div class="cmt-header">
          <!-- 头部左侧 -->
          <div class="cmt-header-left">
            <img :src="item.aut_photo" alt="" class="avatar" />
            <span class="uname">{{ item.aut_name }}</span>
          </div>
          <!-- 头部右侧 -->
          <div class="cmt-header-right">
            <van-icon
              name="like"
              size="16"
              color="red"
              v-if="item.is_liking"
              @click="isLiking(false, item)"
            />
            <van-icon name="like-o" size="16" color="gray" v-else @click="isLiking(true, item)" />
          </div>
        </div>
        <!-- 主体区域 -->
        <div class="cmt-body">
          {{ item.content }}
        </div>
        <!-- 尾部区域 -->
        <div class="cmt-footer">{{ dateForm(item.pubdate) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCommentListAPI, commentLikeAPI, unCommentLikeAPI } from '@/api/comment'
import dateForm from '@/utils/dateFormat'
export default {
  data() {
    return {
      commentList: [],
      query: {
        type: 'a',
        source: this.$route.query.id,
        limit: 10
      }
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    // 获取评论列表
    async getCommentList() {
      const { data: res } = await getCommentListAPI(this.query)
      this.commentList = res.data.results
      console.log(res)
    },
    // 多久之前
    dateForm,
    // 评论点赞
    async isLiking(bool, item) {
      if (bool) {
        // 点亮
        item.is_liking = true
        await commentLikeAPI({ target: item.com_id })
      } else {
        // 取消点亮
        item.is_liking = false
        await unCommentLikeAPI(item.com_id)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
</style>
