import request from '@/utils/request'

export function DaySeries() {
  return request({
    url: '/statistics/series/month',
    method: 'get'
  })
}
export function MonthSeries() {
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
