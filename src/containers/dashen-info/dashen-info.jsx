/*
大神的信息完善路由组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, WingBlank, InputItem, List, Button, TextareaItem} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from "../../redux/actions";

class DashenInfo extends Component {
  state = {
    header: '', // 头像名称
    info: '', // 个人简介
    post: '', // 求职岗位
  }
  handleChange = (name, val) =>{
    this.setState({
      [name] : val
    })
  }
  setHeader = (header) => {
    this.setState({header})
  }
  save = () => {
    this.props.updateUser(this.state)
  }
  render () {
    const {header} = this.props.user;
    if(header){
      return <Redirect to='/dashen'/>
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <WingBlank>
          <List>
            <InputItem onChange={val =>this.handleChange('post',val)} placeholder="请输入求职岗位:">求职岗位: </InputItem>
            <TextareaItem onChange={val =>this.handleChange('info',val)} title='个人介绍:' rows={3}/>
            <Button onClick={this.save} type='primary'>保存</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user : state.user}),
  {updateUser}
)(DashenInfo)