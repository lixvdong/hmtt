// 用户相关接口
import request from '@/utils/request'

// 获取用户基本资料（包含粉丝数量）
export const getUserInfoAPI = () => {
  return request.get('/v1_0/user')
}

// 获取用户个人简介（包含生日）
export const getUserAPI = () => {
  return request.get('/v1_0/user/profile')
}

// 跟新用户头像
export const changePhoto = data => {
  return request.patch('/v1_0/user/photo', data)
}

// 跟新用户信息
export const changeUser = data => {
  return request.patch('/v1_0/user/profile', data)
}
