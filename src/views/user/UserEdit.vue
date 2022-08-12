<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center @click="$refs.iptFile.click()">
        <template #default>
          <van-image round class="avatar" :src="user.photo" />
          <!-- file 选择框 -->
          <input type="file" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="user.name" @click="show = true" />
      <van-cell title="生日" is-link :value="user.birthday" @click="isShow = true" />
    </van-cell-group>
    <!-- 修改名称弹窗 -->
    <van-dialog v-model="show" title="请输入要修改的名称" show-cancel-button @confirm="changeName">
      <van-field v-fofo v-model="user.name" maxlength="7" input-align="center" />
    </van-dialog>
    <!-- 修改出生日期 -->
    <van-popup v-model="isShow" position="bottom" :style="{ height: '40%' }" @close="closePopup">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择出生年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="isShow = false"
        @confirm="changeBirday"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserAPI, changePhotoAPI, changeUserAPI } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UserEdit',
  data() {
    return {
      user: {},
      show: false, // 控制修改名称
      isShow: false, // 控制修改生日
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(2021, 0, 17)
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
    },
    // 更换头像
    async onFileChange(e) {
      if (e.target.files.length === 0) return
      const img = e.target.files[0]
      const fd = new FormData()
      fd.append('photo', img)
      try {
        const { data: res } = await changePhotoAPI(fd)
        this.user.photo = res.data.photo
        this.$notify({ type: 'success', message: '修改成功' })
      } catch (err) {
        console.log(err)
        this.$notify({ type: 'warning', message: '修改失败，请联系程序员～～～' })
      }
    },
    // 修改名称
    async changeName() {
      try {
        await changeUserAPI({ name: this.user.name })
        this.$notify({ type: 'success', message: '修改成功' })
      } catch (err) {
        console.log(err)
        this.$notify({ type: 'warning', message: '修改失败，请联系程序员～～～' })
      }
    },
    // 修改生日
    async changeBirday(value) {
      try {
        const str = dayjs(value).format('YYYY-MM-DD')
        await changeUserAPI({ birthday: str })
        this.user.birthday = str
        this.isShow = false
        this.$notify({ type: 'success', message: '修改成功' })
      } catch (err) {
        console.log(err)
        this.$notify({ type: 'warning', message: '修改失败，请联系程序员～～～' })
      }
    },
    // 关闭日期弹窗
    closePopup() {
      this.currentDate = new Date(this.user.birthday)
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
