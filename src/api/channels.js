// 频道相关接口
import request from '@/utils/request'

// 获取所有频道列表
export const getAllChannListAPI = () => {
  return request.get('/v1_0/channels')
}

// 修改频道列表
export const changeChannAPI = data => {
  return request.put('/v1_0/user/channels', data)
}

// 获取用户选择的频道
export const getUserChannListAPI = () => {
  return request.get('/v1_0/user/channels')
}
