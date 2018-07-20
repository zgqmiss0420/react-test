import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from './action-types'

import {
  reqLogin,
  reqRegister,
  reqUpdateUser,
  reqUser
} from '../api/index';


const authSuccess = (user) => ({type:AUTH_SUCCESS, data:user})
const errorMsg = (msg) => ({type:ERROR_MSG , data: msg})
const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
export const resetUser = (msg) => ({type:RESET_USER,data:msg})


export function register(user) {
  const {username,password,password2,type} = user;
  if(!username) {
    return errorMsg('必须指定用户名')
  } else if (!password) {
    return errorMsg('必须指定密码')
  } else if (password!==password2) {
    return errorMsg('两次密码必须一致!')
  } else if (!type) {
    return errorMsg('必须指定用用户类型')
  }
  
  return async dispatch => {
    const response = await reqRegister({username,password,type})
    const result = response.data;
    if (result.code === 0){
      dispatch(authSuccess(result.data))
    }else {
      dispatch(errorMsg(result.msg))
    }
  }
}


export function login(user) {
  const {username,password} = user;
  if(!username) {
    return errorMsg('必须指定用户名')
  } else if (!password) {
    return errorMsg('必须指定密码')
  }
  
  return async dispatch => {
    const response = await reqLogin(username,password)
    const result = response.data;
    if (result.code === 0){
      dispatch(authSuccess(result.data))
    }else {
      dispatch(errorMsg(result.msg))
    }
  }
}

export function updateUser(user) {
  return async dispatch =>{
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 0 ){
      dispatch(receiveUser(result.data))
    }else{
      dispatch(resetUser(result.msg))
    }
    
  }
  
}

export function getUser() {
  return async dispatch =>{
    const response = await reqUser();
    const result = response.data;
    if (result.code === 0 ){
      dispatch(receiveUser(result.data))
    }else{
      dispatch(resetUser(result.msg))
    }
    
  }
}