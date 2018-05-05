export function setUserId(uid){

    localStorage.setItem('authedUser',uid)
}
export function getUserId(){
    return localStorage.getItem('authedUser');
}

export function isAuthed(){
    return getUserId()!==null
}