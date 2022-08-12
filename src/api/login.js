// 登陆接口
import request from '@/utils/request'

// 登陆
export const loginAPI = data => {
  return request.post('/v1_0/authorizations', data)
}
