import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// 引入字体样式
import './assets/fonts/iconfont.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
// 严格模式，由于组件内还有很多地方比较低版本所以暂不使用严格模式
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
