import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer} from './_DATA';

export function getInitialData() {

    return Promise.all([_getUsers(), _getQuestions()])
        .then(([users, questions]) => ({users, questions}));
}

export function saveQuestion(question) {
    return _saveQuestion(question);
}

export function getQuestions(){
    return _getQuestions();
}

export function saveAnswer(data){
    return _saveQuestionAnswer(data);
}