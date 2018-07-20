import React, {Component} from 'react';
import {
  NavBar,
  WingBlank,
  WhiteSpace,
  Button,
  List,
  InputItem,
  Radio}
  from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from "../../components/logo/logo";
import {register} from "../../redux/actions";

class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'dashen'
  }
  
  handleChange = (name,value) =>{
    this.setState (
      {
        [name] : value
      }
    )
  }
  toLogin = () => {
    this.props.history.replace('/login')
  }
  
  register = () => {
    console.log(this.state);
    this.props.register(this.state);
  }
  
  render () {
    const {type} = this.state;
    const {msg,redirectTo} = this.props.user;
    if (redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>用户注册</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <div className='error-msg'>{msg}</div>
            <InputItem
              placeholder='请输入用户名'
              onChange={val => this.handleChange('username', val)}
            >
              用户名：
            </InputItem>
            <WhiteSpace/>
            <InputItem
              type='password'
              placeholder='输入密码'
              onChange={val => this.handleChange('password', val)}
            >
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <WhiteSpace/>
            <InputItem
              type='password'
              placeholder='输入确认密码'
              onChange={val => this.handleChange('password2', val)}
            >
              确认密码:
            </InputItem>
            <WhiteSpace/>
            <List.Item>
              <span style={{marginRight: 30}}>用户类型:</span>
              <Radio checked={type==='dashen'}
                     onChange={() => {this.handleChange('type', 'dashen')}}>大神</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='laoban'}
                     onChange={() => {this.handleChange('type', 'laoban')}}>老板</Radio>
            </List.Item>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>已经有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
  {register}
)(Register);