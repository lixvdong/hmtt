<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="user.photo" alt="" class="avatar" />
        </template>
        <template #title>
          <span class="username">{{ user.name }}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{ user.art_count }}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{ user.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{ user.fans_count }}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link to="/useredit" />
      <van-cell icon="chat-o" title="小思同学" is-link />
      <van-cell icon="warning-o" title="退出登录" is-link @click="goBack" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api/user'
export default {
  name: 'UserInfo',
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取用户基本信息
    async getUserInfo() {
      const { data: res } = await getUserInfoAPI()
      this.user = res.data
    },
    // 退出
    goBack() {
      this.$dialog
        .confirm({
          message: '确定要退出吗？？？这就不爱了吗？？？'
        })
        .then(() => {
          // on confirm
          this.$router.push('/')
          this.$store.commit('getToken', '')
          this.$store.commit('getRefresh_token', '')
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>
