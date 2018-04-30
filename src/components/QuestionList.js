import React, {Fragment} from 'react';
import {connect} from 'react-redux';

class QuestionList extends React.Component {

  render() {
    const questions = this.props.questions;
    return (
      <Fragment>
        <h3>{this.props.listTitle}</h3>
        <ul>
          {questions.map(q=>(
            <li key={q.id}>Question : {q.id}</li>
          ))}


        </ul>
      </Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  if (!state.authedUser) {
    return { questions: [], listTitle: ownProps.listTitle };
  }
  else {
    const authedUserId = state.authedUser.id;
    const listTitle = ownProps.listTitle;
    console.log(state.questions);
    const questions = Object.keys(state.questions)
                           .filter((k) => (!state.questions[k].optionOne.votes.includes(authedUserId) && !state.questions[k].optionTwo.votes.includes(authedUserId)))
                           .map(k => state.questions[k]);

    return {
      questions,
      listTitle
    };
  }

}

export default connect(mapStateToProps)(QuestionList);