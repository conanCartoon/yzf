import React,{Component} from 'react'
import {NavBar,Icon} from 'antd-mobile'
//引入样式
import './index.scss'
/**
 * 初始化地图
 * 1.创建地图实例
 * 2.设置地图的中心点
 * 3.地图初始化，同时设置地图展示级别
 */
class Map extends Component{
  componentDidMount(){
    this.renderMap();
  }
  renderMap=()=>{
    // console.log(window.BMap);
    //从window中解构出BMap地图方法对象
    const {BMap} =window
    //初始化地图实例
    let map = new BMap.Map("container"); 
    //创建中心点=》天安门
    let point = new BMap.Point(116.404, 39.915); 
    //地图初始化，同时设置地图展示级别
    map.centerAndZoom(point, 15);  
  }
  render(){
    return(
     <div className="mapBox">
       {/* 顶部导航 */}
      <NavBar
      mode="dark"
      icon={<Icon type="left" />}
      onLeftClick={() => this.props.history.goBack()}
    >地图找房</NavBar>
    {/* 地图容器 */}
      <div id="container"></div>
     </div>
        
    )
  }
}
export default Map