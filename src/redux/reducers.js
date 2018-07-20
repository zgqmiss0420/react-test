import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG,RESET_USER,RECEIVE_USER} from './action-types';
import {getRedirectTo} from "../utils";

const initUser = {
  username : '',
  type : '',
  msg : '',
  redirectTo: ''
}
function user(state=initUser ,action) {
  switch (action.type){
    case AUTH_SUCCESS :
      const user = action.data;
      return {...user,redirectTo:getRedirectTo(user.type,user.header)}
    case ERROR_MSG :
      const msg = action.data;
      return {...state,msg}
    case RECEIVE_USER :
      return action.data
    case RESET_USER :
      return {...initUser,msg}
    default :
      return state;
  }
}

export default combineReducers({
  user
})


