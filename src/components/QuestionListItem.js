import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'

const TEXT_PREVIEW_LEN = 20;

class QuestionListItem extends React.Component {

    handleDetails = (e)=>{

    };
    render() {
        const avatar = this.props.author.avatarURL;
        const question = this.props.question;
        const optionOne = question.optionOne.text.slice(0, TEXT_PREVIEW_LEN) + '...';
        const optionTwo = question.optionTwo.text.slice(0, TEXT_PREVIEW_LEN) + '...';
        const author = this.props.author;

        return (
            <NavLink exact to ={`/questions/${question.id}`}>
                <img src={avatar} alt="avatar" width='50' height='50' style={{float: 'left'}}/>
                <div onClick={this.handleDetails}>
                    <div>{author.name}</div>
                    <div>1.{optionOne}</div>
                    <div>2.{optionTwo}</div>
                </div>
            </NavLink>

        );
    }
}

function mapStateToProps({users}, {question}) {
    const author = users[question.author];
    return {
        author,
        question
    };
}

export default connect(mapStateToProps)(QuestionListItem);