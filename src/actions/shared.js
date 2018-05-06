import {getInitialData} from '../data/api';
import {receiveUsers} from './users';
import { receiveQuestions} from './questions';
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import * as auth from '../util/auth'

export function handleInitialData(){
  return(dispatch)=>{
    dispatch(showLoading());
    return getInitialData()
      .then(({users,questions})=>{
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        //TODO remove this before going live
        auth.setUserId('tylermcginnis');


        dispatch(hideLoading());
      })
  }
}