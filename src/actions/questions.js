//export const ANSWER_QUESTION = 'ANSWER_QUESTION';
//export const CREATE_QUESTION = 'CREATE_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export function receiveQuestions(questions){
  return {type:RECEIVE_QUESTIONS,questions}
}


