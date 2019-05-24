import request from '@/utils/request'

export function checkStudents(num, size) {
  return request({
    url: ' /student/list',
    method: 'post',
    data: {
      pageNum: num,
      pageSize: size
    }
  })
}

export function addStudent(obj) {
  return request({
    url: '/student/add',
    method: 'post',
    data: obj
  })
}

export function editStudent(id, key, val) {
  var dataObj = {studentId: id};
  dataObj[key] = val;
  return request({
    url: '/student/edit',
    method: 'post',
    data: dataObj
  })
}

export function delStudent(id) {
  return request({
    url: '/student/delete',
    method: 'post',
    data: {
      studentId: id
    }
  })
}

export function checkNotice() {
  return request({
    url: ' /notice/list',
    method: 'get'
  })
}
export function addNotice(content) {
  return request({
    url: '/notice/add',
    method: 'post',
    data: {
      content: content
    }
  })
}

export function editNotice(id, content) {
  return request({
    url: '/notice/edit',
    method: 'post',
    data: {
      noticeId: id,
      content: content
    }
  })
}

export function delNotice(id) {
  return request({
    url: '/notice/delete',
    method: 'post',
    data: {
      noticeId: id
    }
  })
}

export function checkQuestions(num, size) {
  return request({
      url: ' /question/list',
    method: 'post',
    data: {
      pageNum: num,
      pageSize: size
    }
  })
}

export function delQuestion(id) {
  return request({
    url: '/question/delete',
    method: 'post',
    data: {
      questionId: id
    }
  })
}

