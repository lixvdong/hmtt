<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="user.photo" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="user.name" />
      <van-cell title="生日" is-link :value="user.birthday" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserAPI } from '@/api/user'
export default {
  name: 'UserEdit',
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    // 获取用户基本信息
    async getUser() {
      const { data: res } = await getUserAPI()
      this.user = res.data
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
::v-deep .van-nav-bar .van-icon {
  color: #fff;
}
</style>
