import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import QuestionListItem from './QuestionListItem';

class QuestionList extends React.Component {

  render() {
    const questions = this.props.questions;
    return (
      <Fragment>
        <h3>{this.props.listTitle}</h3>
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
    return { questions: [], listTitle: ownProps.listTitle };
  }
  else {
    const authedUserId = state.authedUser.id;
    const listTitle = ownProps.listTitle;
    let questions = {};
    console.log(state.questions);
    if (ownProps.filter === 'unanswered') {
      questions = Object.keys(state.questions)
                        .filter((k) => (!state.questions[k].optionOne.votes.includes(authedUserId) && !state.questions[k].optionTwo.votes.includes(authedUserId)))
                        .map(k => state.questions[k]);
    }
    else if (ownProps.filter === 'answered') {
      questions = Object.keys(state.questions)
                        .filter((k) => (state.questions[k].optionOne.votes.includes(authedUserId) || state.questions[k].optionTwo.votes.includes(authedUserId)))
                        .map(k => state.questions[k]);
    }
    return {
      questions,
      listTitle
    };
  }

}

export default connect(mapStateToProps)(QuestionList);