/**
 * 城市列表
 */
import http from '../axios'
 export function getCityList(){
   return http.get('/area/city',{
     params:{
       level:1
    }
   })
 }
