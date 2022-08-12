<template>
  <div>
    <van-nav-bar title="黑马头条 - 登陆" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        type="tel"
        name="mobile"
        label="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="code"
        type="password"
        name="code"
        label="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      />
      <div style="margin: 16px">
        <van-button :loading="show" :disabled="show" round block type="info" native-type="submit"
          >登陆</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/login'
export default {
  name: 'MyLogin',
  data() {
    return {
      mobile: '18847943688',
      code: '246810',
      show: false
    }
  },
  methods: {
    async onSubmit(value) {
      this.show = true
      try {
        const { data: res } = await loginAPI(value)
        this.$store.commit('getToken', res.data.token)
        this.$store.commit('getRefresh_token', res.data.refresh_token)
        this.$notify({ type: 'success', message: '登陆成功' })
        this.$router.push('/home')
      } catch (err) {
        console.log(err)
        this.$notify({ type: 'warning', message: '登陆失败，请联系程序员～～～' })
      }
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped></style>
