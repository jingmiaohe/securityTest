import request from '@/utils/request'
export function tLogin(name, pwd) {
  console.log(name, pwd)
  return request({
    url: '/teacher/login',
    method: 'post',
    data: {
      userName: name,
      password: pwd
    }
  })
}

export function getTInfo() {
  return request({
    url: '/teacher/information',
    method: 'get'
  })
}

export function tLogout() {
  return request({
    url: '/teacher/logout',
    method: 'post'
  })
}
