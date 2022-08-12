// 评论相关列表
import request from '@/utils/request'

// 获取文章评论列表
export const getCommentListAPI = data => {
  return request.get('/v1_0/comments', { params: data })
}

// 增加文章评论
export const addCommentAPI = data => {
  return request.post('/v1_0/comments', data)
}

// 点赞评论
export const commentLikeAPI = data => {
  return request.post('/v1_0/comment/likings', data)
}

// 取消点赞评论
export const unCommentLikeAPI = id => {
  return request.delete(`/v1_0/comment/likings/${id}`)
}
