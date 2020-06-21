/**
 * 封装自己的axios
 */
import axios from 'axios'
import {Toast} from 'antd-mobile'
//创建axios实例 BASE_URL后面会用所以要设置一个常量并且导出
const BASE_URL='https://api-haoke-web.itheima.net'
const myAxios = axios.create({
  baseURL: BASE_URL
});
//给实例添加拦截器
//请求之前触发
myAxios.interceptors.request.use(function (config) {
  // console.log('请求之前触发',config);
  Toast.loading('Loading...', 0)
  return config;
}, function (error) {
  return Promise.reject(error);
});

//请求之后触发
myAxios.interceptors.response.use(function (response) {
  // console.log('请求之后触发',response);
  Toast.hide();
  // 简化数据,只返回需要用到的数据
  const data=response.data
  const _res={
    description:data.description,
    status:data.status,
    data:data.body
  }
  return _res;
}, function (error) {
  return Promise.reject(error);
});
export {BASE_URL}
export default myAxios
