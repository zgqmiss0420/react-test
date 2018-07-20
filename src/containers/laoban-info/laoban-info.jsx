/*
老板的信息完善路由组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, WingBlank, InputItem, List, Button, TextareaItem} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from "../../redux/actions";

class LaobanInfo extends Component {
    state = {
      header: '', // 头像名称
      info: '', // 职位简介
      post: '', // 职位名称
      company: '', // 公司名称
      salary: '' // 工资
    }
    handleChange = (name, val) =>{
      this.setState({
        [name] : val
      })
    }
  
  
  setHeader = (header) => {
    this.setState({
      header
    })
  }
  
  save = () => {
    this.props.updateUser(this.state)
  }
  render () {
    const {header} = this.props.user;
    if(header){
      return <Redirect to='/laoban'/>
    }
    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <WingBlank>
          <List>
            <InputItem onChange={val =>this.handleChange('post',val)} placeholder="请输入招聘职位">招聘职位: </InputItem>
            <InputItem onChange={val =>this.handleChange('company',val)} placeholder="请输入公司名称">公司名称: </InputItem>
            <InputItem onChange={val =>this.handleChange('salary',val)} placeholder="请输入职位薪资">职位薪资: </InputItem>
            <TextareaItem onChange={val =>this.handleChange('info',val)} title="职位要求:" rows={3}/>
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
)(LaobanInfo)