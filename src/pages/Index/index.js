import React,{Component} from 'react'
import { Carousel,Flex,Grid,WingBlank,SearchBar} from 'antd-mobile';
//导入样式
import './index.scss'
//导入自己封装的axios
import {getSwiper,getGroups,getNews, getCityInfo} from '../../utils/api/home'
import {BASE_URL} from '../../utils/axios'
// 导入导航栏数据
import { Navs } from '../../utils/navConf';

class Index extends Component{
  state = {
    //从后台拿回来的图片数据放在这里
    swiper: [],
    //租房小组数据
    groups:[],
    //最新资讯数据
    news:[],
    //设置一个图片高度来占位
    imgHeight: 212,
    isPlay:false,
    keyword:'',
    currCity:{
      label:'',
      value:''
    }
  }
  componentDidMount() {
    // promise重构（优化）
  //  this.getSwiper();
  //  this.getGroups();
  //  this.getNews();
  this.loadAll();
  this.getCityList();
  }
  // promise重构（优化）使用promise.all
  loadAll=async()=>{
    //解构赋值，下面promise.all()中有一个方法出错，其它两个也不会显示，即使其它两个没有问题，是按照书写顺序来显示promise对象的
      const [swiper,groups,news]=await Promise.all([getSwiper(),getGroups(),getNews()])
      // console.log(swiper,groups,news);
      //批量做响应式,不要忘记轮播图
    if(swiper.status === 200){
      this.setState({
        swiper:swiper.data,
        groups:groups.data,
        news:news.data
      },()=>{
        this.setState({
          isPlay:true
        })
      })
    }
      
  }
  // 设置全局axio通过请求获得轮播图返回的值,封装api接口请求
  //  getSwiper=async()=>{
  //   const {status,data}=await getSwiper()
  //   // console.log(res);
  //   if(status===200){
  //     this.setState({
  //       swiper:data
  //     },()=>{
  //       this.setState({
  //         isPlay:true
  //       })
  //     })
  //   }
  // }
  //获取租房小组所返回的值
  // getGroups=async()=>{
  //   const {status,data} = await getGroups()
  //   // console.log(res);
  //  if(status === 200){
  //   this.setState({
  //     groups:data
  //   })
  //  }
    
  // }
  //获取最新资讯返回的数
  // getNews=async()=>{
  //   const {status,data}=await getNews()
  //   // console.log(res);
  //   if(status === 200){
  //     this.setState({
  //       news:data
  //     })
  //   }
    
  // }



  // 渲染轮播图
  renderCarousel=()=>{
    return(
      <Carousel
          autoplay={this.state.isPlay}
          infinite
        >
          {this.state.swiper.map(val => (
            <a
              key={val.id}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight ,backgroundColor:'gray'}}
            >
              <img
                src={`${BASE_URL}${val.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                // onload加载完毕触发
                onLoad={() => {
                  // 高度自适应屏幕
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
    )
  }
  //渲染栏目导航
  renderNavs=()=>{
    return(
      <Flex className="nav">
	        {Navs.map((item,index)=>{
            return (
              <Flex.Item onClick={() =>{
                this.props.history.push(item.path)
              }} key={index}>
                <img src={item.img} alt='' />
                 <p>{item.title}</p>
             </Flex.Item>
            )
          })
          }
           </Flex>
    )
  }
  //渲染租房小组
  renderGroups=()=>{
    return(
      <div className="group">
          {/* 题目  还可以使用<> <Flex></Flex> <Grid/> </>来包裹没有根标签的组件们,在浏览器渲染时不会产生新的标签*/}
        <Flex justify='between' className="group-title">
          <h3>租房小组</h3>
         <span>更多</span>
         </Flex>
         {/* 内容 */}
         <Grid data={this.state.groups}
           columnNum={2}
           hasLine={false}
           square={false}
          renderItem={item => (
            <Flex className="grid-item" justify="between">
            <div className="desc" >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
          </Flex>
      )}
    />
          </div>
    )
  }
  // 渲染新闻资讯
  renderNews=()=>{
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`${BASE_URL}${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
  getCityList=()=>{
    const {BMap}=window;
     // 使用百度地图LocalCity类获取当前城市名字
    var myCity = new BMap.LocalCity();
  //  console.log(myCity);  
  myCity.get(async(result)=>{
    // console.log(result); //得到当前城市的名字等信息
    // 通过请求获取城市的详细信息
    const  {status,data}=await getCityInfo(result.name);
    // console.log(res);
    if(status === 200){
      this.setState({
        currCity:data
      })
      
    }
    
  })
   
  }

  render() {
    const {push}=this.props.history
    return (
      <div className="indexBox">
        {/* 搜索框 */}
        <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city" onClick={()=>{
            push('/cityList')
          }}>
           {this.state.cityList.label}<i className="iconfont icon-arrow" />
          </div>
          <SearchBar
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div className="map" onClick={()=>{
          push('/map')
        }}>
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
        {/* 轮播图 */}
        {
          this.renderCarousel()
        }
        {/* 栏目导航 */}
        {
          this.renderNavs()
        }
        {/* 租房小组 */}
        {
          this.renderGroups()
        }
        {/* 最新资讯 */}
        <div className="news">
        <h3 className="group-title">最新资讯</h3>
        <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>

        </div>
    );
  }  
}
export default Index