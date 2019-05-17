import request from '@/utils/request'

// 测一测
export function exam() {
  return request({
    url: '/exam/start',
    method: 'get'
  })
}
export function endExam(examId, answers) {
  return request({
    url: '/exam/end',
    method: 'post',
    data: {
      examId: examId,
      answers: answers
    }
  })
}
// 练一练
export function exercise() {
  return request({
    url: '/exercise/start',
    method: 'get'
  })
}

// 获取错题
export function getWrongQus() {
  return request({
    url: '/wrongQuestion/list',
    method: 'get'
  })
}
// 加入错题
export function addWrongQue(id) {
  return request({
    url: '/wrongQuestion/add',
    method: 'post',
    data: {
      questionId: id
    }
  })
}
// 删除错题
export function delWrongQue(id){
  return request({
    url: '/wrongQuestion/delete',
    method: 'post',
    data: {
      questionId: id
    }
  })
}
