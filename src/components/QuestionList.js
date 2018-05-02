import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import QuestionListItem from './QuestionListItem';

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

function mapStateToProps(state, ownProps) {
  //TODO think of better filtering system
  if (!state.authedUser) {
    return { questions: []};
  }
  else {
    const authedUserId = state.authedUser.id;

    let questions = {};
    console.log(state.questions);

    //pass only the unanswered questions
    if (ownProps.filter === listFilters.UNANSWERED) {
      questions = Object.keys(state.questions)
                        .filter((k) => (
                          !state.questions[k].optionOne.votes.includes(authedUserId)
                          &&
                          !state.questions[k].optionTwo.votes.includes(authedUserId)))
                        .map(k => state.questions[k]);
    }
    //pass only the answered questions
    else if (ownProps.filter === listFilters.ANSWERED) {
      questions = Object.keys(state.questions)
                        .filter((k) => (
                          state.questions[k].optionOne.votes.includes(authedUserId)
                          ||
                          state.questions[k].optionTwo.votes.includes(authedUserId)))
                        .map(k => state.questions[k]);
    }
    return {
      questions,

    };
  }

}

export default connect(mapStateToProps)(QuestionList);