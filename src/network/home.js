import {request} from './request'

export function getHomeMultiData() {
  return request({
    url: 'http://123.207.32.32:8000/home/multidata'
    // url: '/admin/report/load_banner'
  })
}


export function getHomeGoods(type,page) {
  return request({
    url: 'http://39.105.195.164/admin/report/load_vuehomedata',
    params:{
      type,
      page
    }
  })
}
