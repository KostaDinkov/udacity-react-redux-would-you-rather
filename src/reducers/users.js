import {RECEIVE_USERS, USER_ADD_QUESTION} from '../actions/users';


export default function users(state = {}, action) {

    switch (action.type) {
        case RECEIVE_USERS:
            return {...state, ...action.users};

        case USER_ADD_QUESTION: {
            const user = state[action.uid];
            const updatedUser = {...user,questions:user.questions.concat(action.qid)};
            return {...state, [action.uid]:updatedUser};
        }

        default:
            return state;
    }
}