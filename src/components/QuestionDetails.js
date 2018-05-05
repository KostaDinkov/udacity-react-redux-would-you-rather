import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import UnansweredDetails from './UnansweredDetails';
import AnsweredQuestion from './AnsweredDetails'
import * as auth from '../util/auth';


class QuestionDetails extends Component {


    isQuestionAnswered() {
        const question = this.props.question;
        const authedUserId = auth.getUserId();
        if (
            question.optionOne.votes.includes(authedUserId)
            ||
            question.optionTwo.votes.includes(authedUserId)
        ) {
            return true;
        }
    };


    render() {
        if (this.props.loading) {
            //TODO use dummy skeleton
            return (
                <div>Loading...</div>
            );
        }
        else {
            const question = this.props.question;
            const author = this.props.author;

            const authedUser = this.props.users[this.props.authedUserId];
            return (
                this.isQuestionAnswered()
                    ? <AnsweredQuestion question={question} authedUser={authedUser} author={author}/>
                    : <UnansweredDetails question={question} authedUser={authedUser} author={author}/>

            );
        }

    }
}

function mapStateToProps({questions, users}, ownProps) {

    if (Object.keys(questions).length === 0) {
        return {loading: true};
    }
    const question = questions[ownProps.match.params.id];
    const author = users[question.author];


    return {
        loading: false,
        question,
        author,
        users
    };
}

export default connect(mapStateToProps)(QuestionDetails);