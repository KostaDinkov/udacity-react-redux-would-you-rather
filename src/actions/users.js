//export const CREATE_USER = 'CREATE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SET_AUTHEDUSER = 'SET_AUTHEDUSER';
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION';

export function receiveUsers(users){
  return {type: RECEIVE_USERS,users}
}

export function userAddQuestion(uid,qid){
  return {type:USER_ADD_QUESTION, uid,qid}
}

export function setAuthedUser(user){
  return {
    type:SET_AUTHEDUSER,
    user
  }
}
