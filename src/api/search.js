// 搜索相关接口
import request from '@/utils/request'

// 搜索联想建议
export const suggertionAPI = data => {
  return request.get('/v1_0/suggestion', { params: data })
}

// 搜索结果
export const getSearchAPI = data => {
  return request.get('/v1_0/search', { params: data })
}
