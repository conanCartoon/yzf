import React from 'react';
import {BrowserRouter as Router ,Route,Switch,Redirect} from 'react-router-dom'

//导入一级路由页面
import Home from './pages/Home'
import CityList from './pages/CityList';
import Map from './pages/Map'
//导入404页面
import NotFound from './pages/NotFound'

/**
 * 1. 新建Home、CityList、Map组件
 * 2. 配置一级路由/home、/cityList、/map
 * 3. 配置404页面
 */



function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Redirect exact from="/" to="/home"/>
        <Route path='/home' component={Home}/>
        <Route path='/cityList' component={CityList}/>
        <Route path='/map' component={Map}/>
        <Route component={NotFound}/>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
