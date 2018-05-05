import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import QuestionListItem from './QuestionListItem';
import * as auth from '../util/auth'

export const listFilters = {ANSWERED:'answered', UNANSWERED:'unanswered'};

class QuestionList extends React.Component {

  render() {
    const questions = this.props.questions;
    return (
      <Fragment>

        <ul>
          {questions.map(q => (
            <li key={q.id}>
              <QuestionListItem question={q}/>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

function mapStateToProps({questions}, ownProps) {
  //TODO think of better filtering system
  if (!auth.isAuthed()) {
    return { questions: []};
  }
  else {
    const authedUserId = auth.getUserId();

    //pass only the unanswered questions
    if (ownProps.filter === listFilters.UNANSWERED) {
      questions = Object.keys(questions)
                        .filter((k) => (
                          !questions[k].optionOne.votes.includes(authedUserId)
                          &&
                          !questions[k].optionTwo.votes.includes(authedUserId)))
                        .map(k => questions[k]);
    }
    //pass only the answered questions
    else if (ownProps.filter === listFilters.ANSWERED) {
      questions = Object.keys(questions)
                        .filter((k) => (
                          questions[k].optionOne.votes.includes(authedUserId)
                          ||
                          questions[k].optionTwo.votes.includes(authedUserId)))
                        .map(k => questions[k]);
    }
    return {
      questions,
    };
  }

}

export default connect(mapStateToProps)(QuestionList);