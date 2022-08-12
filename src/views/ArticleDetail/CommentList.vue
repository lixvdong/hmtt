<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list" :class="show ? 'art-cmt-container-1' : 'art-cmt-container-2'">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="50"
        :immediate-check="false"
      >
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
      </van-list>
    </div>
    <!-- 底部添加评论区域 - 1 -->
    <div class="add-cmt-box van-hairline--top" v-if="show">
      <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
      <div class="ipt-cmt-div" @click="show = false">发表评论</div>
      <div class="icon-box">
        <van-badge :content="totalCount" :max="99">
          <van-icon name="comment-o" size="0.53333334rem" @click="moveFn" />
        </van-badge>
        <van-icon name="star-o" size="0.53333334rem" />
        <van-icon name="share-o" size="0.53333334rem" />
      </div>
    </div>

    <!-- 底部添加评论区域 - 2 -->
    <div class="cmt-box van-hairline--top" v-else>
      <textarea
        v-fofo
        v-model="content"
        placeholder="友善评论、理性发言、阳光心灵"
        @blur="blurFn"
      ></textarea>
      <van-button type="default" :disabled="content.length === 0" @click="publish">发布</van-button>
    </div>
  </div>
</template>

<script>
import { getCommentListAPI, commentLikeAPI, unCommentLikeAPI, addCommentAPI } from '@/api/comment'
import dateForm from '@/utils/dateFormat'
export default {
  data() {
    return {
      commentList: [], // 评论列表
      query: {
        type: 'a',
        source: this.$route.query.id,
        limit: 10
      },
      show: true, // 评论切换
      totalCount: '', // 总评论数
      content: '', // 评论内容
      loading: false,
      finished: false
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    // 获取评论列表
    async getCommentList() {
      const { data: res } = await getCommentListAPI(this.query)
      this.commentList = [...this.commentList, ...res.data.results]
      this.totalCount = res.data.total_count || ''
      this.query.offset = res.data.last_id
      this.loading = false
      if (res.data.results.length === 0) {
        this.finished = true
      }
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
    },
    // 评论滑动
    async moveFn() {
      // 真实DOM都在document(所以不再一个vue文件内), 也是可以获取的
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 失焦切换会发表评论
    blurFn() {
      setTimeout(() => {
        this.show = true
      })
    },
    // 发表评论
    async publish() {
      const { data: res } = await addCommentAPI({
        target: this.$route.query.id,
        content: this.content
      })
      this.commentList.unshift(res.data.new_obj)
      // 数量+1
      this.totalCount++
      // 成功后, 清除输入框内容
      this.content = ''
    },
    // 加载更多
    onLoad() {
      this.getCommentList()
    }
  }
}
</script>

<style scoped lang="less">
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  margin-bottom: 46px;
}
.art-cmt-container-2 {
  margin-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
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
