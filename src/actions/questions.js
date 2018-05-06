import { userAddQuestion} from './users';
import {saveQuestion} from '../data/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const CREATE_QUESTION = 'CREATE_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export function receiveQuestions(questions) {
    return {type: RECEIVE_QUESTIONS, questions};
}

function createQuestion(question){
    return {type: CREATE_QUESTION, question};
}

export function handleCreateQuestion(question, uid){
    return (dispatch) => {
        dispatch(showLoading());
        return saveQuestion(question)
            .then((question) => {
                dispatch(createQuestion(question));
                dispatch(userAddQuestion(uid,question.id))
            })
            .catch(() => {
                console.log('An error occurred, please try again');
            })
            .finally(() => {
                dispatch(hideLoading());
            });
    };
}


