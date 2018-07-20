/*
用户头像选择的组件
 */
import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
  static propTypes = {
    setHeader : PropTypes.func.isRequired
  }
  
  state = {
    icon : null
  }
  
  constructor(props){
    super(props)
    this.headerList = [];
    for (var i = 0; i < 20; i ++){
      const text = '头像' + (i + 1)
      this.headerList.push({
        text,
        icon:require(`../../assets/imgs/${text}.png`)
      })
    }
  }
  
  selectHeader = ({icon,text}) =>{
    this.setState({icon});
    this.props.setHeader(text)
  }
  
  render () {
    const {icon} = this.state;
    const header = icon? <p>已选择头像：<img src={icon} alt=''/></p>:'请选择头像'
    return (
      <List renderHeader={() => header}>
        <Grid columnNum={5}
              onClick={this.selectHeader}
              data={this.headerList}/>
      </List>
    )
  }
}