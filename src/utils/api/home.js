import http from '../../utils/axios';
//两种书写方式
// export const getSwiper=()=>{
//   return  http.get('/home/swiper')
// }
export function getSwiper(){
  //返回的是promise对象
  return  http.get('/home/swiper')
}

export function getGroups(area='AREA|88cff55c-aaa4-e2e0'){
  return http.get('/home/groups',{
    params:area
  })
}
export function getNews(area='AREA|88cff55c-aaa4-e2e0'){
  return http.get('/home/news',{
    params:area
  })
}
export function getCityInfo(name){
  return http.get('/area/info',{
    params:name
  })
}

