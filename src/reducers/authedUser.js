import {SET_AUTHEDUSER} from '../actions/users';

export default function authedUser(state=null,action){
  switch (action.type){

    case SET_AUTHEDUSER:
      return action.user;

    default:
      return state;
  }
}