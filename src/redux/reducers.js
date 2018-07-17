import {combineReducers} from 'redux'

function aaa(Prostate = 0 , action) {
  switch (action.type){
    default :
      return Prostate
  }
}

function bbb(Prostate = {} , action) {
  switch (action.type){
    default :
      return Prostate
  }
}

export default combineReducers({
  aaa,
  bbb
})