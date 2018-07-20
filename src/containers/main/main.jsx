import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from '../laoban-info/laoban-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NavFooter from '../../components/nav-footer/nav-footer'
import {getUser} from "../../redux/actions";
import {getRedirectTo} from '../../utils'


class Main extends Component {
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]
  componentDidMount () {
    // 当前还没有登陆, 但前面登陆过-->发异步ajax请求, 获取当前用户信息
    const id = this.props.user._id
    const userid = Cookies.get('userid')
    if(!id && userid) {
      this.props.getUser()
    }
    
  }
  
  render () {
    const userid = Cookies.get('userid');
    if(!userid){
      return <Redirect to={'/login'}/>
    }
    const {user} = this.props;
    if(!user._id){
      return null
    }
    const path = this.props.location.pathname
    if(path ==='/'){
      return <Redirect to={getRedirectTo(user.type, user.header)}/>
    }
    
    // 从navList中找出对应的nav    find(): 返回一个回调函数返回true的元素
    const currentNav = this.navList.find(function (nav, index) {// 回调函数
      return path===nav.path
    })
    
    const {navList} = this
    if(user.type === 'dashen'){
      navList[0].hide = true
    }else{
      navList[1].hide = true
    }
    
    return (
      <div>
        {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>
          <Route path='/laoban' component={Laoban}/>
          <Route path='/dashen' component={Dashen}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>
        </Switch>
        {currentNav ? <NavFooter navList={navList}/> : null}
      </div>
    )
  }
}

export default connect(
  state =>({user:state.user}),
  {getUser}
)(Main);