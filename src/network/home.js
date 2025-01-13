import {request} from './request'

export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
    // url: '/admin/report/load_banner'
  })
}
