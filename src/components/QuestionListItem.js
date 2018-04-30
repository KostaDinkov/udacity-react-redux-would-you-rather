import React from 'react';
import {connect} from 'react-redux';

class QuestionListItem extends React.Component {
  render() {
    const avatar = this.props.author.avatarURL;
    const question = this.props.question;
    const optionOne = question.optionOne.text.slice(0, 10) + '...';
    const optionTwo = question.optionTwo.text.slice(0, 10) + '...';
    const author = this.props.author;

    return (
      <div>
        <img src={avatar} alt="avatar" width='50' height='50' style={{ float: 'left' }}/>
        <div>
          <div>{author.name}</div>
          <div>1.{optionOne}</div>
          <div>2.{optionTwo}</div>
        </div>
      </div>

    );
  }
}

function mapStateToProps({ users }, { question }) {
  const author = users[question.author];
  return {
    author,
    question
  };
}

export default connect(mapStateToProps)(QuestionListItem);