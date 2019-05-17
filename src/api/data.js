import request from '@/utils/request'

export function series() {
  return request({
    url: '/statistics/series',
    method: 'get'
  })
}
export function rank() {
  return request({
    url: '/statistics/rankData',
    method: 'get'
  })
}
