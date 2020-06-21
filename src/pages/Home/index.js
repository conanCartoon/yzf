import React,{Component} from 'react'
import {Route} from 'react-router-dom'

//导入标签栏
import { TabBar } from 'antd-mobile';
/**
 * 
 * 在Home组件中配置=》默认首页、找房、我的=〉3个二级路由
 */
//二级路由导入
import House from '../House'
import Index from '../Index/index'
import Profile from '../Profile'

//导入样式
import './index.css'
//优化标签栏中的配置数据,因为为固定数据不会修改，故放入utils下的文件内便于编辑

import tabBarItem from '../../utils/tabBarItem'



//只渲染首页的导航，以达到组件复用
class Home extends Component{
  
  state = {
    selectedTab: this.props.history.location.pathname
  }; 
  //把结构中的标签栏提取出来让结构更加简单
  renderTabBarItems=()=>{
    return(
      tabBarItem.map((item)=>{
        return(
    <TabBar.Item
      title={item.title}
      key={item.path}
      icon={
        <i className={`iconfont ${item.icon}`}/>
      }
      selectedIcon={ <i className={`iconfont ${item.icon}`}/>
      }
      selected={this.state.selectedTab ===item.path}
      onPress={() => {
        this.setState({
          selectedTab: item.path,
        });
        this.props.history.push(item.path)
      }}
    />
        )
      })
    )
  } 
  render(){
    // console.log(this.props.history);
    return(
      <div className="home">
        {/* 默认首页 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House}/>
        <Route path="/home/profile" component={Profile}/>
        <div className="btnBox">
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          {
            this.renderTabBarItems()
          }
        </TabBar>
      </div>

      </div>
    )
  }
}
export default Home