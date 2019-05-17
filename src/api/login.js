import request from '@/utils/request'

export function login(name, studentNumber) {
  return request({
    url: '/student/login',
    method: 'post',
    data: {
      name: name,
      studentNumber: studentNumber
    }
  })
}

export function getInfo() {
  return request({
    url: '/student/information',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/student/logout',
    method: 'post'
  })
}
