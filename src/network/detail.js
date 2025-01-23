import {request} from './request'

export function getDetail(id){
  return request({
    url: 'http://39.105.195.164/admin/report/load_vuedetail',
    params:{
      id
    }
  })
}

//明细页面的推荐图片
export function getDtailRecommend() {
  return request({
    url: 'http://39.105.195.164/admin/report/load_vuehomedata'
  })
}


export class Goods{
  constructor(baseinfo){
    this.title = baseinfo.title
    this.newprice = '¥' + baseinfo.newprice
    this.oldprice = '¥' + baseinfo.oldprice
    this.discount =  baseinfo.discount
  }
}
