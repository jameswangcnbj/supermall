import axios from 'axios'

export function request(config) {
  //1.创建axios实例
      const instance = axios.create({
        // baseURL: 'http://123.207.32.32:8000',
        // baseURL: 'http://39.105.195.164/',
        timeout: 10000
      })
      //2.拦截器
      instance.interceptors.request.use(config =>{
        // console.log(config)
        return config
      },err =>{
        // console.log(err)
      })

     instance.interceptors.response.use(res =>{
       // console.log(res)
       return res.data
     },err =>{
       // console.log(err)
     })
      //3.发送真正的网络请求
     return instance(config)
}
