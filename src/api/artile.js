// 文章相关接口
import request from '@/utils/request'

// 获取文章列表
export const getArtileListAPI = data => {
  return request.get('/v1_0/articles', { params: data })
}

// 获取文章详情
export const getArtileAPI = id => {
  return request.get(`/v1_0/articles/${id}`)
}

// 关注文章作者
export const followingAPI = data => {
  return request.post('/v1_0/user/followings', data)
}

// 取关文章作者
export const unFollowingAPI = id => {
  return request.delete(`/v1_0/user/followings/${id}`)
}

// 点赞文章
export const artileLikeAPI = data => {
  return request.post('/v1_0/article/likings', data)
}

// 取消点赞文章
export const unArtileLikeAPI = id => {
  return request.delete(`/v1_0/article/likings/${id}`)
}

// 举报文章
export const artileReportAPI = data => {
  return request.post('/v1_0/article/reports', data)
}

// 对文章不感兴趣
export const artileDislikeAPI = data => {
  return request.post('/v1_0/article/dislikes', data)
}
