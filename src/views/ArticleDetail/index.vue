<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">小程序</h1>

      <!-- 用户信息 -->
      <van-cell center :title="artileObj.title" :label="artileObj.pubdate">
        <template #icon>
          <img :src="artileObj.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button type="info" size="mini" v-if="artileObj.is_followed" @click="follow(false)"
              >已关注</van-button
            >
            <van-button icon="plus" type="info" size="mini" plain v-else @click="follow(true)"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="artileObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="artileObj.attitude === 1"
          @click="liking(false)"
          >已点赞</van-button
        >
        <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="liking(true)"
          >点赞</van-button
        >
      </div>
    </div>

    <!-- 评论列表 -->
    <comment-list />
  </div>
</template>

<script>
import {
  getArtileAPI,
  followingAPI,
  unFollowingAPI,
  unArtileLikeAPI,
  artileLikeAPI
} from '@/api/artile'
import CommentList from './CommentList.vue'
export default {
  name: 'ArticleDetail',
  data() {
    return {
      artileObj: {} // 文章对象
    }
  },
  components: {
    CommentList
  },
  created() {
    this.getArtile()
  },
  methods: {
    // 获取文章详情
    async getArtile() {
      const { data: res } = await getArtileAPI(this.$route.query.id)
      this.artileObj = res.data
    },
    // 关注/取消关注作者
    async follow(bool) {
      if (bool) {
        // 关注
        this.artileObj.is_followed = true
        await followingAPI({ target: this.artileObj.aut_id })
      } else {
        // 取消关注
        this.artileObj.is_followed = false
        await unFollowingAPI(this.artileObj.aut_id)
      }
    },
    // 点赞文章/取消点赞文章
    async liking(bool) {
      if (bool) {
        // 点赞
        this.artileObj.attitude = 1
        await artileLikeAPI({ target: this.artileObj.art_id })
      } else {
        // 取消点赞
        this.artileObj.attitude = 0
        await unArtileLikeAPI(this.artileObj.art_id)
      }
    }
  }
}
</script>

<style scoped lang="less">
::v-deep .van-nav-bar .van-icon {
  color: #fff;
}
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
