import React,{Component} from 'react'
import {getCityList} from '../../utils/api/citylist'


class CityList extends Component{
  componentDidMount(){
    this.getCities()
  }
  getCities=async()=>{
    const {status,data}=await getCityList()
    // console.log(res);//获得城市列表，但是需要对城市列表数据进行处理
   if(status === 200 ){
     const {cityList,cityIndex}=this.formatCity(data)
     console.log(cityList,cityIndex);
     
   }
    
  }

  formatCity=(data)=>{
    let cityList = {},cityIndex=[];
    data.forEach(item=> {
      // 归类
      // 获取当前遍历城市的拼音首字母
      let firstLetter=item.short.slice(0,1);
      //判断cityList中是否有首字母的属性
      // if(!(firstLetter in cityList))两种判断方式
      if(!cityList[firstLetter]){
        cityList[firstLetter]=[item]
      }else{
        cityList[firstLetter].push(item)
      }
    });
     // 这个类别数组（所有城市的拼音首字母）
     cityIndex=Object.keys(cityList).sort()
     
    return {
      cityList,cityIndex
    }
  }
  render(){
    return(
      <div>
        <h1>CityList</h1>
      </div>
    )
  }
}
export default CityList