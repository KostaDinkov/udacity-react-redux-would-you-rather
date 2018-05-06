import {SET_AUTHEDUSER} from '../actions/users';
import {setUserId} from '../util/auth';

export default function authedUser(state = null, action) {
    switch (action.type) {

        case SET_AUTHEDUSER: {
            setUserId(action.user.id);
            return action.user;

        }

        default:
            return state;
    }
}